<template>
  <section class="component data-analyze">
    <el-card v-for="node in result" :key="node.key">
      <div slot="header" class="row middle-span between-span">{{node.name}}</div>
      <label-container :column="1" :labelWidth="200">
        <label-item :label="item.name" v-for="item in node.data" :key="item.name">
          <label-container :column="2" :labelWidth="120">
            <label-item label="压盖面积">{{item.area}}平方米</label-item>
            <label-item label="所占比例">{{(item.radio * 100).toFixed(2)}}%</label-item>
          </label-container>
        </label-item>
      </label-container>
    </el-card>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import DataBox from '~/components/common/data-box.vue'
import { FlowInfoService } from '~/services/flow-info.service'
import { RequestParams } from '~/core/http/'
import { Inject } from 'typescript-ioc'
import { PageService } from '~/extension/services/page.service'
import { List } from 'linqts'
import { DetectionService } from '@/services/detection.service'
import { CesiumCommonService } from '@/utils/cesium/common.service'
import clone from 'clone'
@Component({
  components: {
    DataBox
  }
})
export default class DataAnalyze extends Vue {
  @Prop({
    default: []
  })
  public content

  @Prop()
  public range

  // 数据分析结果
  private result: any = []

  private mounted() {
    this.startCheck()
  }

  @Watch('content')
  private onChecnChange() {
    this.startCheck()
  }

  private getCheckType(type) {
    return this.content && this.content.some(x => x.type === type)
  }

  /**
   * 开始检测
   */
  private startCheck() {
    this.result = []
    clone(this.content).forEach(x => {
      x.data = []
      this.startRequestCheck(x)
    })
  }

  private async startRequestCheck(node) {
    // 获取检测范围
    const { positions, layer } = this.range
    // 检测结果
    let result
    // 获取检测数据
    if (positions) {
      result = await this.getRangeCheck(node, positions)
    } else {
      // result = await this.getLayerCheck(code, layer)
    }

    if (result && result.length) {
      node.data = this.getResultData(result, node)
      this.result.push(node)
    }

    console.log(this.result)
  }

  private getResultData(result, node) {
    const data = result
      .map(x => ({
        name: x.attr.name,
        area: x.attr['结果形状面积'],
        total: x.attr['对比图层总面积']
      }))
      .map(x => ({
        name: x.name,
        area: x.area.toFixed(2),
        radio: x.area / x.total
      }))

    return Object.entries(
      new List(data).GroupBy((x: any) => x.name, x => x)
    ).map(([key, list]: [string, any]) => ({
      name: key,
      area: new List(list).Sum((x: any) => x.area).toFixed(2),
      radio: new List(list).Sum((x: any) => x.radio)
    }))
  }
  /**
   * 进行区域检测
   */
  private getRangeCheck({ code, key }, positions, cql?) {
    const detectionService = new DetectionService()
    // 获取wkt区域数据
    const polygon = [...positions, positions[0]]
      .map(x => {
        const point = CesiumCommonService.cartesian3ToDegrees(x)
        return `${point.longitude} ${point.latitude}`
      })
      .join(',')

    // 获取对比数据
    return detectionService
      .getDateAnalysisWkt(
        new RequestParams({
          wkt: `POLYGON ((${polygon}))`,
          layerCode: code,
          rapporttype: key,
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
