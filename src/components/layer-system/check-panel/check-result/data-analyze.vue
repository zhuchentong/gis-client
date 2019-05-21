<template>
  <section class="component data-analyze">
    <div v-if="!result.length" v-loading="!result.length" class="no-data"></div>
    <div v-else>
      <el-card v-for="node in result" :key="node.key">
        <div slot="header" class="row middle-span between-span">
          {{ node.name }}
        </div>
        <label-container :column="1" :labelWidth="200">
          <label-item
            :label="item.name"
            v-for="item in node.data"
            :key="item.name"
          >
            <label-container :column="2" :labelWidth="120">
              <label-item label="压盖面积">{{ item.area }}平方米</label-item>
              <label-item label="所占比例"
                >{{ (item.radio * 100).toFixed(2) }}%</label-item
              >
            </label-container>
          </label-item>
        </label-container>
      </el-card>
    </div>
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
  @Inject
  private service!: DetectionService

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
      return this.startRequestCheck(x)
    })
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

    this.result.push(node)
    if (result && result.length) {
      node.data = this.getResultData(result, node)
    }
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
