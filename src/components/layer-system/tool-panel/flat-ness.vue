<template>
  <section class="component flat-ness" v-loading="loading">
    <el-card>
      <div slot="header" class="clearfix">
        <span>基准信息</span>
      </div>
      <el-form :model="model" label-width="110px" ref="form">
        <el-form-item label="基准面高程：" prop="height">
          <el-input v-model="model.height" type="number" readonly>
            <span slot="append">米</span>
          </el-input>
        </el-form-item>
        <el-form-item label="平整偏移量:" prop="offset">
          <el-input
            v-model="model.offset"
            type="number"
            :min="-9999"
            :max="9999"
            @input.native="onHeightChange"
          >
            <span slot="append">米</span>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="operate-buttons">
        <el-button @click="FlatNessButton">开始测算</el-button>
      </div>
    </el-card>
    <el-card class="approve-steps-item" v-if="result">
      <div slot="header" class="clearfix">
        <span>测量结果</span>
      </div>
      <label-container :column="1" :labelWidth="120">
        <label-item label="最高点" v-if="result.highest"
          >{{ result.highest.toFixed(4) }} 米</label-item
        >
        <label-item label="最低点" v-if="result.lowest"
          >{{ result.lowest.toFixed(4) }} 米</label-item
        >
        <label-item label="填方量"
          >{{ Math.abs(result.fillCount).toFixed(4) }} 立方米</label-item
        >
        <label-item label="挖方量"
          >{{ Math.abs(result.cutCount).toFixed(4) }} 立方米</label-item
        >
        <label-item label="填挖区域面积"
          >{{ result.fillArea.toFixed(4) }} 平方米</label-item
        >
        <label-item label="挖方区域面积"
          >{{ result.cutArea.toFixed(4) }} 平方米</label-item
        >
        <label-item label="填挖区域总面积"
          >{{ (result.fillArea + result.cutArea).toFixed(4) }}平方米</label-item
        >
        <label-item label="区域总面积"
          >{{ result.allArea.toFixed(4) }} 平方米</label-item
        >
      </label-container>
    </el-card>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import * as turf from '@turf/turf'
import MapViewer from '../../layer-viewer/map-viewer.vue'
import Cesium from 'cesium/Cesium'
import { CesiumDrawService } from '../../../utils/cesium/draw.service'
import { CesiumCommonService } from '@/utils/cesium/common.service'
import { Observable, of, from } from 'rxjs'
import { bufferCount } from 'rxjs/operators'
@Component({
  components: {}
})
export default class FlatNess extends Vue {
  @Prop()
  public viewer!: MapViewer
  @Prop()
  public points!: any
  private loading = false
  // 插值区域边长,影响精度
  private readonly cellSide = 2
  private readonly computeGroupNumber = 20
  // 在最小高度差内认为无需进行填挖方
  private readonly minHeightDiff = 0.2
  private boxHeight = 0
  private result: any = null
  private model: any = {
    height: 0,
    offset: 0
  }

  @Watch('points', { immediate: true })
  private onPointsChange() {
    this.boxHeight = parseFloat(this.getBoxHeight(this.points).toFixed(4))
    this.model.height = this.boxHeight
    this.result = null
  }

  private onHeightChange({ target }) {
    if (target.value === '') return
    this.model.height = parseFloat(
      (this.boxHeight + parseFloat(target.value)).toFixed(4)
    )
  }

  /**
   * 获取单点高度
   */
  private getPointHeight(point) {
    const cartographic = Cesium.Cartographic.fromDegrees(point[0], point[1])
    return this.viewer.getViewer().scene.globe.getHeight(cartographic)
  }

  /**
   * 获取区域平均高度
   */
  private getBoxHeight(points) {
    const heights = points.map(point => {
      return this.getPointHeight(point)
    })

    // 获取平均高度
    return heights.reduce((acc, val) => acc + val, 0) / heights.length
  }

  private async getResult() {
    // 获取测量区域集合图形
    const polygon = turf.polygon([[...this.points, this.points[0]]])
    // 获取总测量区域
    this.result.allArea = turf.area(polygon)
    // 获取对应的bbox
    const bbox = turf.bbox(polygon)
    // 生成插值区域
    const grid = turf.squareGrid(bbox, this.cellSide, { units: 'meters' })
    // 解决卡顿问题
    // 通过设置并行分组数
    const groups: any[] = []

    const compute = () => {
      const features = groups.shift()
      if (!features) {
        this.loading = false
        return
      }

      // 开始计算个体
      setTimeout(() => {
        features.forEach(item => {
          // 排除无效区域
          if (!turf.booleanContains(polygon, item)) {
            return
          }
          const center = turf.centerOfMass(item) as any
          const height = this.getPointHeight(center.geometry.coordinates)
          const heightdiff = this.model.height - height
          // 更新最小高度
          if (!this.result.lowest || this.result.lowest > height) {
            this.result.lowest = height
          }
          // 更新最大高度
          if (!this.result.highest || this.result.highest < height) {
            this.result.highest = height
          }
          // 在最小高度差内无需进行填挖方
          if (Math.abs(heightdiff) < this.minHeightDiff) {
            return
          }

          // 获取当前面积
          const area = turf.area(item)
          const size = area * heightdiff

          if (size > 0) {
            this.result.fillCount += size
            this.result.fillArea += area
          } else {
            this.result.cutCount += size
            this.result.cutArea += area
          }

          this.drawSizeBox(center.geometry.coordinates, height, heightdiff)
        })
        // 开始下一次计算
        compute()
      })
    }

    // tslint:disable-next-line
    of(...grid.features)
      .pipe(bufferCount(this.computeGroupNumber))
      .subscribe({
        next: group => groups.push(group),
        complete: () => {
          compute()
        }
      })
  }

  /**
   * 绘制立方体
   */
  private drawSizeBox(coordinates, height, heightdiff) {
    const [longitude, latitude] = coordinates
    const option = {
      width: 5,
      material: new Cesium.PolylineOutlineMaterialProperty({
        color: heightdiff > 0 ? Cesium.Color.YELLOW : Cesium.Color.GRAY
      })
    } as any

    this.viewer.drawEntities.add({
      name:
        'Orange line with black outline at height and following the surface',
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          longitude,
          latitude,
          height,
          longitude,
          latitude,
          height + heightdiff
        ]),
        ...option
      }
    })
  }

  private FlatNessButton() {
    // reset
    this.result = {
      fillCount: 0,
      cutCount: 0,
      fillArea: 0,
      cutArea: 0,
      allArea: 0
    }
    this.loading = true
    this.getResult()
  }
}
</script>
