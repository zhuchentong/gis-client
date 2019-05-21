<template>
  <section class="component data-analyze">
    <el-card v-for="node in result" :key="node.key">
      <div slot="header" class="row middle-span between-span">
        {{ node.name }}
      </div>
      <div
        v-if="!node.data"
        v-loading="!node.load"
        style="margin-top:10px"
        class="no-data"
      ></div>
      <label-container
        v-else-if="node.data.legnth"
        :column="1"
        :labelWidth="200"
      >
        <label-item
          :label="item.name"
          v-for="item in node.data"
          :key="item.name"
        >
          <label-container :column="2" :labelWidth="120">
            <label-item
              label="压盖面积"
              :value="`${item.area} 平方米`"
            ></label-item>
            <label-item
              label="所占比例"
              :value="item.radio | toPercent"
            ></label-item>
          </label-container>
        </label-item>
      </label-container>
      <div v-else class="text-center">
        未发现占用数据
      </div>
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
@Component({
  components: {
    DataBox
  }
})
export default class DataAnalyze extends Vue {
  @Prop({
    default: []
  })
  public content!: any[]

  @Prop()
  public range

  // 数据分析结果
  private result: any = []
  @Inject
  private service!: DetectionService

  @Watch('content', { immediate: true })
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
    // 更新所选图层card
    this.result = this.content.map(v => ({ ...v, load: false })).sort((a, b) => a.sort - b.sort)
    // 开始检测，载入结果
    this.result.forEach(item => this.startRequestCheck(item))
  }

  private async startRequestCheck(node) {
    // 获取检测范围
    const { wkt, layer } = this.range
    // 检测结果
    let result
    // 获取检测数据
    if (wkt) {
      result = await this.getRangeCheck(node, wkt)
    } else {
      result = await this.getLayerCheck(node, layer)
    }

    // card data 载入数据
    node.load = true
    this.$set(node, "data", this.getResultData(result || []))
  }

  private getResultData(result) {
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
   * 进行区域检测 wkt模式
   */
  private getRangeCheck(node, wktStr, cql?) {
    // 获取对比数据
    return this.service
      .getDateAnalysisWkt(
        new RequestParams({
          wkt: wktStr,
          layerCode: node.code,
          cql,
          rapporttype: node.key
        })
      )
      .toPromise()
  }

  /**
   * 区域对比 图层模式
   */
  private getLayerCheck(node: any, layer: string, cql?: string) {
    return this.service
      .getDateAnalysisLayerCode(
        new RequestParams({
          deputyLayer: layer,
          mainLayer: node.code,
          cql,
          rapporttype: node.key
        })
      )
      .toPromise()
  }
}
</script>
