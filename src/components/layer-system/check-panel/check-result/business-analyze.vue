<template>
  <section class="component business-analyze-base row">
    <el-tabs tab-position="left" class="business-analyze-tabs">
      <el-tab-pane :label="item.name" v-for="item of result" :key="item.name">
        <data-box v-if="item.data" :data="item.data" class="col-span">
          <template slot="columns">
            <el-table-column
              label="项目名称"
              prop="name"
              :min-width="$helper.getColumnWidth(2)"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="批复文号"
              prop="code"
              :min-width="$helper.getColumnWidth(2)"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="项目面积"
              prop="acreage"
              :min-width="$helper.getColumnWidth(2)"
              show-overflow-tooltip
            ></el-table-column>
            <!-- <el-table-column label="操作">
              <template>
                <el-button type="text">查看详情</el-button>
                <el-button type="text">加载图层</el-button>
              </template>
            </el-table-column> -->
          </template>
        </data-box>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import DataBox from '~/components/common/data-box.vue'
import { FlowInfoService } from '~/services/flow-info.service'
import { RequestParams } from '~/core/http/'
import { Inject } from 'typescript-ioc'
import { PageService } from '~/extension/services/page.service'
import { DetectionService } from '@/services/detection.service'
import { CesiumCommonService } from '@/utils/cesium/common.service'
import clone from 'clone'

@Component({
  components: {
    DataBox
  }
})
export default class BusinessAnalyzeBase extends Vue {
  @Prop({
    default: []
  })
  public content

  @Prop()
  public range

  @Inject
  private service!:DetectionService

  private bcData = []
  private pdData = []
  private zdData = []
  private gdData = []
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
    clone(this.content).forEach(async x => {
      x.data = await this.startRequestCheck(x)
      this.result.push(x)
    })

    console.log(this.result)
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

    return result
  }

  /**
   * 进行区域检测
   */
  private getRangeCheck({ key }, wktStr) {
    // 获取对比数据
    return this.service
      .getBusinessWkt(
        new RequestParams({
          wkt: wktStr,
          flowType: key
        })
      )
      .toPromise()
  }

  private getLayerCheck({key}, layer) {
     // 获取对比数据
    return this.service
      .getBusinessLayerCode(
        new RequestParams({
          layerCode: layer,
          flowType: key
        })
      )
      .toPromise()
  }
}
</script>

<style lang="less" scoped>
.component.business-analyze-base {
  height: 100%;
  .business-analyze-tabs {
    min-width: 100%;
  }
}
</style>
