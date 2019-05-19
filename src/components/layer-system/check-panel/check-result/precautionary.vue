<template>
  <section class="component precautionary">
    <el-card v-loading="!fieldResult">
      <div slot="header" class="row middle-span between-span">
        <label>基本农田占用检测</label>
        <i v-if="fieldResult&&fieldResult.alarm" class="el-icon-warning alarm">压占基本农田，疑似违法用地，请核实！</i>
      </div>
      <label-container :column="1" :labelWidth="120">
        <label-item label="基本农田保护区">
          <label-container :column="2" :labelWidth="120">
            <label-item label="压盖面积"></label-item>
            <label-item label="所占比例">213</label-item>
          </label-container>
        </label-item>
        <label-item label="一般农用地"></label-item>
      </label-container>
    </el-card>
    <el-card>
      <div slot="header" class="row middle-span between-span">
        <label>非允许建设区检测</label>
        <i class="el-icon-warning alarm">压占非允许建设区，疑似违法用地，请核实！</i>
      </div>
      <label-container :column="1" :labelWidth="120">
        <label-item label="允许建设区"></label-item>
        <label-item label="有条件建设区"></label-item>
        <label-item label="限制建设区"></label-item>
        <label-item label="禁止建设区"></label-item>
      </label-container>
    </el-card>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { CesiumCommonService } from '@/utils/cesium/common.service'
import { Inject } from 'typescript-ioc'
import { DetectionService } from '~/services/detection.service'
import { RequestParams } from '../../../../core/http'
import { CqlBuilder } from '~/utils/cql-build.service'
import { List } from 'linqts'
@Component({
  components: {}
})
export default class Precautionary extends Vue {
  @Prop({
    default: []
  })
  public content

  @Prop()
  public range

  private detectionService = new DetectionService()

  // 基本农田检测结果
  private fieldResult: any = null
  // 建设区检测结果
  private buildResult: any = null

  private mounted() {
    this.startCheck()
  }

  @Watch('content')
  private onChecnChange() {
    this.startCheck()
  }

  private startCheck() {
    this.content.forEach(x => {
      switch (x.type) {
        case 'jbnt':
          this.startFieldCheck(x)
          break
        case 'yxjsq':
          this.startBuildCheck(x)
          break
      }
    })
  }

  private async startFieldCheck({ code }) {
    const { positions, layer } = this.range
    const cql = `"TDYTQLXDM" = '010' or "TDYTQLXDM" = '020'`
    let data
    if (positions) {
      data = await this.getRangeCheck(code, positions, cql)
    } else {
      this.getLayerCheck(code, layer)
    }

    const jbnt = data
      .filter(x => x.attr['TDYTQLXDM'] === '010')
      .map(x => ({
        area: x['结果形状面积'],
        radio: x['对比图层总面积']
      }))

    const ybnt = data
      .filter(x => x.attr['TDYTQLXDM'] === '020')
      .map(x => ({
        area: x['结果形状面积'],
        radio: x['对比图层总面积']
      }))

    if (data) {
      this.fieldResult = {
        alarm: jbnt.length,
        jbnt: {
          area: new List(jbnt).Sum((x: any) => x.area),
          radio: new List(jbnt).Sum((x: any) => x.radio)
        },
        ybnt: {}
      }

      console.log(this.fieldResult)
    }
  }

  private startBuildCheck({ code }) {
    return
  }

  private getRangeCheck(code, positions, cql?) {
    // 获取wkt区域数据
    const polygon = [...positions, positions[0]]
      .map(x => {
        const point = CesiumCommonService.cartesian3ToDegrees(x)
        return `${point.longitude} ${point.latitude}`
      })
      .join(',')

    // 获取对比数据
    return this.detectionService
      .getDetectionWkt(
        new RequestParams({
          wkt: `POLYGON ((${polygon}))`,
          layerCode: code,
          cql
        })
      )
      .toPromise()
  }

  private getLayerCheck(code, layer) {
    return
  }
}
</script>

<style lang="less" scoped>
.alarm {
  color: red;
}
</style>

