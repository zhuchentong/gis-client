  <template>
  <section class="tool-panel">
    <el-card shadow="never">
      <div slot="header">
        <span>测量</span>
      </div>
      <div
        class="icon-item text-center"
        v-for="item of measureList"
        :key="item.key"
        @click="item.handle()"
      >
        <svg-icon iconColor="black" :iconName="item.icon" iconSize="40"></svg-icon>
        <div>{{item.label}}</div>
      </div>
    </el-card>
    <el-card shadow="never">
      <div slot="header">
        <span>视角</span>
      </div>
      <div
        class="icon-item text-center"
        v-for="item of cameraList"
        :key="item.key"
        @click="item.handle()"
      >
        <svg-icon :iconName="item.icon" iconSize="40"></svg-icon>
        <div>{{item.label}}</div>
      </div>
    </el-card>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MapViewer from '~/components/layer-viewer/map-viewer.vue'
import { DrawInteractPolyline } from '~/utils/cesium/interact'
import Cesium from 'cesium/Cesium'
import { CesiumCommonService } from '../../../utils/cesium/common.service'
import { CesiumDrawService } from '@/utils/cesium/draw.service'
import * as turf from '@turf/turf'

@Component({
  components: {}
})
export default class ToolPanel extends Vue {
  @Prop()
  private viewer!: MapViewer
  private readonly measureList = [
    {
      label: '距离测量',
      key: 'distance',
      icon: 'distance',
      handle: this.computeDistance.bind(this)
    },
    {
      label: '面积测量',
      key: 'area',
      icon: 'area',
      handle: this.computeArea.bind(this)
    }
  ]

  private readonly cameraList = [
    {
      label: '视角巡航',
      key: 'cruise',
      icon: 'camera-fly',
      handle: this.onStartCruise.bind(this)
    }
  ]

  /**
   * 计算距离
   */
  private computeDistance() {
    const drawInteractPolyline = new DrawInteractPolyline(this.viewer)
    const drawService = new CesiumDrawService(this.viewer)
    let distanceTotal = 0
    drawInteractPolyline.start().subscribe({
      next: ({ point, positions }) => {
        if (positions.length === 1) {
          drawService.drawLabel(point, '起点')
          distanceTotal = 0
        } else {
          // 两点间距离
          const distance = Cesium.Cartesian3.distance(
            positions[positions.length - 2],
            positions[positions.length - 1]
          )
          // 中心点位置
          // const middle = Cesium.Cartesian3.midpoint(
          //   positions[positions.length - 2],
          //   positions[positions.length - 1],
          //   new Cesium.Cartesian3()
          // )
          // 总距离
          distanceTotal += distance
          // 绘制中心距离
          // drawService.drawLabel(
          //   middle,
          //   CesiumCommonService.getDistanceStr(distance)
          // )
          // 绘制总距离
          drawService.drawLabel(
            point,
            CesiumCommonService.getDistanceStr(distanceTotal)
          )
        }
      },
      complete: () => {
        distanceTotal = 0
      }
    })
  }

  /**
   * 计算面积
   */
  private async computeArea() {
    const drawInteractPolyline = new DrawInteractPolyline(this.viewer, {
      closed: true
    })
    const drawService = new CesiumDrawService(this.viewer)
    const { positions } = await drawInteractPolyline.start().toPromise()
    if (positions && positions.length >= 3) {
      // 生成点集合
      const points = positions.map(point => {
        const position = CesiumCommonService.cartesian3ToDegrees(point)
        return [position.longitude, position.latitude]
      })

      // 计算多边形
      const polygon = turf.polygon([[...points, points[0]]])
      // 获取多边形中心
      const {
        geometry: { coordinates }
      } = turf.centerOfMass(polygon) as any
      const center = Cesium.Cartesian3.fromDegrees(
        coordinates[0],
        coordinates[1]
      )
      // 绘制面积信息
      drawService.drawLabel(center, `${turf.area(polygon).toFixed(2)}平方米`)
    }
  }

  /**
   * 开启视角巡航
   */
  private async onStartCruise() {
    const drawInteractPolyline = new DrawInteractPolyline(this.viewer)
    const { positions } = await drawInteractPolyline
      .start()
      .toPromise()
      .catch()

    if (positions.length < 2) return

    const degrees = positions.map(x =>
      CesiumCommonService.cartesian3ToDegrees(x)
    )

    const [start] = degrees
    const czml = this.generateCzml(degrees)

    const _viewer = this.viewer.getViewer()

    const source = await Cesium.CzmlDataSource.load(czml)
    const entity = source.entities.getById('point')
    _viewer.trackedEntity = entity
    _viewer.dataSources.add(source)
  }

  /**
   * 生成czml
   */
  private generateCzml(degrees) {
    const [start] = degrees
    return [
      {
        id: 'document',
        name: 'CZML Point - Time Dynamic',
        version: '1.0'
      },
      {
        id: 'point',
        // TODO:设置viewFrom
        // viewFrom: {
        //   cartesian: [point.x, point.y, point.z]
        // },
        position: {
          epoch: new Date().toISOString(),
          // TODO:按距离计算时间
          cartographicDegrees: degrees
            .map((x, i) => [i * 10, x.longitude, x.latitude, x.height])
            .flat()
        },
        point: {
          color: {
            rgba: [255, 255, 255, 128]
          },
          outlineColor: {
            rgba: [255, 0, 0, 128]
          },
          outlineWidth: 1,
          pixelSize: 5
        }
      }
    ]
  }
}
</script>

<style lang="less" scoped>
.tool-panel {
  .icon-item {
    cursor: pointer;
    display: inline-block;
    width: 50%;
  }
}
</style>


