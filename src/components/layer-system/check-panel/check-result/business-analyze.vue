<template>
  <section class="component business-analyze-base row">
    <el-tabs tab-position="left" class="business-analyze-tabs">
      <el-tab-pane
        :label="item.name"
        v-for="(item, index) of result"
        :key="index"
      >
        <data-box
          v-if="item.data"
          :data="item.data"
          class="col-span"
          :maxHeight="420"
        >
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
            >
            </el-table-column>
            <el-table-column label="操作" width="70px">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  :disabled="!scope.row.flowId"
                  @click="viewBusinessDetail(scope.row)"
                  >查看详情</el-button
                >
                <!-- <el-button type="text">加载图层</el-button> -->
              </template>
            </el-table-column>
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
import { WindowSize } from '@/config/enum.config'

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
  private service!: DetectionService

  // 数据分析结果
  private result: any[] = []

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
      this.result = this.result.sort((x1, x2) => x1.sort - x2.sort)
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

  private getLayerCheck({ key }, layer) {
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

  private viewBusinessDetail({ flowId }) {
    if (!flowId) return
    this.$window.open('business-system',
      {
        width: WindowSize.large.width,
        height: Math.min(WindowSize.large.height, window.screen.height - 40)
      },
      {
        replace: false,
        parent: null,
        params: { flowId }
      }, this)
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
