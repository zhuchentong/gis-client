<template>
  <section class="component project-panel">
    <div class="search row between-span">
      <div>
        <label>项目类型:</label>
        <el-select v-model="flowModel.type" class="search-worktype">
          <el-option label="全部" value=""></el-option>
          <el-option
            v-for="{ code, name } of $dict.getDictData('FlowType')"
            :key="code"
            :label="name"
            :value="code"
          ></el-option>
        </el-select>
      </div>
      <div v-show="false">
        <label>时间排序</label>
        <a>
          <svg-icon iconName="sort" iconSize="12"></svg-icon>
        </a>
      </div>
    </div>
    <div class="no-data" v-if="!dataList.length"></div>
    <div v-else class="middle-content">
      <div
        v-for="item of dataList"
        :key="item.id"
        class="info-item pointer"
        @click="itemClick(item)"
        :class="{ 'info-item-activated': item.flowId === flowId }"
      >
        <label-item
          label="项目名称"
          noWarp
          showTitle
          :value="item.name"
        ></label-item>
        <label-item
          label="项目类型"
          :value="item.type | dictConvert('FlowType')"
        ></label-item>
        <label-item
          label="创建时间"
          :value="item.createTime | dateTimeFormat('yyyy年MM月dd日 hh:mm:ss')"
        ></label-item>
        <div class="text-right item-operate">
          <el-button type="text" @click="viewBusinessDetail(item)"
            >查看详情</el-button
          >
          <el-button
            type="text"
            :disabled="!item.layerId"
            @click="addLayer(item)"
            >显示图层</el-button
          >
        </div>
      </div>
      <div class="text-center">
        <el-pagination
          @current-change="refreshData"
          small
          :pager-count="5"
          :current-page.sync="pageService.pageIndex"
          :page-size.sync="pageService.pageSize"
          layout="total, prev, pager, next"
          :total="pageService.total"
        >
        </el-pagination>
      </div>
    </div>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { BusinessFlowModel } from "~/models/business-flow.model"
import { PageService } from "~/extension/services/page.service.ts"
import { WindowSize } from '~/config/enum.config'
import MapViewer from "~/components/layer-viewer/map-viewer.vue"
import { LayerSpace } from "~/config/business-config.ts"
import { RequestParams, Request } from "~/core/http"

@Component({
  components: {}
})
export default class ProjectPanel extends Vue {

  @Prop()
  private viewer!: MapViewer

  private dataList: any[] = []
  private flowId = ""
  private flowModel: BusinessFlowModel = new BusinessFlowModel()
  private pageService = new PageService({ pageSize: 6 })

  private layerInfo: any = null



  /**
   * 监听查询model变化
   */
  @Watch('flowModel', { deep: true })
  private onFlowModelChange() {
    this.refreshData()
  }

  /**
   * 查询数据
   */
  private refreshData() {
    this.flowId = ""
    this.flowModel.queryFollowDataByPage(this.pageService).subscribe(
      data => {
        this.dataList = data.content
        if (this.dataList.length) this.flowId = this.dataList[0].flowId
      }
    )
  }


  private mounted() {
    // 只查询已办理的
    this.flowModel.status = 'FINSH'
  }

  private viewBusinessDetail(item) {
    this.itemClick(item)
    if (!this.flowId) return
    this.$window.open('business-system',
      {
        size: WindowSize.large,
        maximizable: false
      },
      {
        replace: false,
        parent: null,
        params: { flowId: this.flowId }
      }, this)
  }

  private itemClick(item) {
    if (this.flowId === item.flowId) return
    // 删除之前的layer信息
    if (this.layerInfo && this.viewer) {
      this.viewer.removeLayer(this.layerInfo)
    }
    this.flowId = item.flowId
    this.layerInfo = null
  }

  private addLayer(item) {
    this.itemClick(item)
    const requestParams = new RequestParams({ flowId: this.flowId })
    this.flowModel.flowInfoService.getLayerInfoByFlowId(requestParams)
      .subscribe(data => {
        this.layerInfo = data
        delete this.layerInfo.uploadFile
        if (this.viewer) this.viewer.addLayer(this.layerInfo)
      })
  }


}
</script>

<style lang="less" scoped>
.component.project-panel {
  .search {
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    border-bottom: solid 2px #f3f3f3;
    &-worktype {
      padding-left: 3px;
      width: 100px;
    }
  }
  .middle-content {
    height: calc(100% - 40px);
    overflow-y: auto;
  }
  .info-item {
    padding-top: 5px;
    border-bottom: solid 2px #f3f3f3;
    &-activated {
      background-color: #ffffea;
    }
    .item-operate {
      padding-right: 15px;
      .el-button {
        padding: 5px 0;
      }
    }
  }
}
</style>


<style lang="less">
.component.project-panel {
  @line-height: 20px;
  .search {
    .el-input {
      /*
        设置局部按钮行内高度
      */
      line-height: @line-height!important;
      .el-input__inner {
        line-height: @line-height!important;
        height: @line-height!important;
      }
      .el-input__icon {
        height: @line-height!important;
        line-height: @line-height!important;
      }
    }
    .el-button.el-button--default {
      line-height: @line-height!important;
    }
  }
}
</style>