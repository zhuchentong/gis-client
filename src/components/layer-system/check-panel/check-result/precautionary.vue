<template>
  <section class="component precautionary">
    <el-card>
      <div slot="header" class="row middle-span between-span">
        <label>基本农田占用检测</label>
        <i class="el-icon-warning">压占基本农田，疑似违法用地，请核实！</i>
      </div>
      <label-container :column="1" :labelWidth="120">
        <label-item label="基本农田保护区"></label-item>
        <label-item label="一般农用地"></label-item>
      </label-container>
    </el-card>
    <el-card>
      <div slot="header" class="row middle-span between-span">
        <label>非允许建设区检测</label>
        <i class="el-icon-warning">压占非允许建设区，疑似违法用地，请核实！</i>
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
  private fieldResult = null
  // 建设区检测结果
  private buildResult = null

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

  private startFieldCheck({ code }) {
    const { positions, layer } = this.range
    if (positions) {
      this.getRangeCheck(code, positions)
    } else {
      this.getLayerCheck(code, layer)
    }
  }

  private startBuildCheck({ code }) {
    return
  }

  private getRangeCheck(code, positions) {
    // 获取wkt区域数据
    const polygon = [...positions, positions[0]]
      .map(x => {
        const point = CesiumCommonService.cartesian3ToDegrees(x)
        return `${point.longitude} ${point.latitude}`
      })
      .join(',')

    // 获取对比数据
    this.detectionService
      .getDetectionWkt(
        new RequestParams({
          wkt: `POLYGON ((${polygon}))`,
          layerCode: code
        })
      )
      .subscribe(data => {
        console.log(data)
      })
  }

  private getLayerCheck(code, layer) {
    return
  }
}
</script>
