<template>
  <base-col-three class="page business-system">
    <div slot="left">
      <div v-for="item of menus" :key="item.label" class="business-system-menu-item" @click="flowModel.status = item.status" :class="{'business-system-menu-activated': item.status === flowModel.status}">
        <svg-icon :iconName="item.icon" iconSize="32"></svg-icon>
        <div class="menu-item-label">{{item.label}}</div>
      </div>
    </div>
    <div slot="middle">
      <div class="search">
        <label class="search-item-label">项目类型:</label>
        <el-select v-model="flowModel.type" class="search-worktype">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="{code,name} of $dict.getDictData('FlowType')" :key="code" :label="name" :value="code"></el-option>
        </el-select>
        <label class="search-item-label">时间排序</label>
        <a @click="sortList">
          <svg-icon iconName="sort" iconSize="12"></svg-icon>
        </a>
        <el-button class="search-item-label" @click="dialog.craeteNew = true" size="mini">新增</el-button>
      </div>
      <div class="no-data" v-if="!dataList.length"></div>
      <div v-else>
        <div v-for="item of dataList" :key="item.id" class="info-item" @click="flowId = item.flowId" :class="{'info-item-activated': item.flowId === flowId}">
          <label-item label="任务名称" :value="item.taskName"></label-item>
          <label-item label="外业类型" :value="item.taskType"></label-item>
          <label-item label="创建时间" :value="item.createTime "></label-item>
        </div>
      </div>
      <div class="text-center">
        <el-pagination @current-change="refreshData" :current-page.sync="pageService.pageIndex" :pager-count="5" :page-size="pageService.pageSize" layout="total, prev, pager, next" :total="pageService.total">
        </el-pagination>
      </div>
      <el-dialog title="新增业务" :center="true" :visible.sync="dialog.craeteNew" width="800px" :show-close="false" :close-on-click-modal="false">
        <create-new-business :show="dialog.craeteNew" @close="dialog.craeteNew = false"></create-new-business>
      </el-dialog>
    </div>
    <el-tabs slot="content" v-model="currentPanel" class="content-tabs">
      <el-tab-pane v-for="item of tabs" :key="item.name" :name="item.name" :label="item.label" class="content-tabs-panes">
        <component :is="item.component" :flowModel="flowModel" :flowId="flowId" class="content-tabs-panes-base"></component>
      </el-tab-pane>
    </el-tabs>
  </base-col-three>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Layout } from '@/core/decorator'
import BaseColThree from "~/components/common/base-col-three.vue"
import { MenuItems, ContentItems, DetailComponents } from "~/components/business-system/business-system.config.ts"
import CreateNewBusiness from "~/components/business-system/add-new/create-new-business.vue"
import { BusinessFlowModel } from "~/models/business-flow.model"
import { Inject, Container } from 'typescript-ioc'
import { PageService } from "~/extension/services/page.service"

@Layout('workspace')
@Component({
  components: {
    BaseColThree,
    ...DetailComponents,
    CreateNewBusiness
  }
})
export default class extends Vue {
  // @Inject
  private flowModel = new BusinessFlowModel()
  private pageService = new PageService()
  private menus = MenuItems
  private dataList: any[] = []
  private workType = ""
  private tabs = ContentItems
  private flowId = ""
  private currentPanel = ContentItems[0].name
  private dialog = {
    craeteNew: false
  }

  @Watch("flowModel.status", { immediate: true })
  private onTypeChange() {
    this.dataList = [
      {
        flowId: "1233442134132133212",
        taskName: "姚店村地灾巡查",
        taskType: "地灾巡查",
        createTime: '2018-04-30 14:00:02'
      },
      {
        flowId: "323234324324",
        taskName: "姚店村违法用地巡查",
        taskType: "违法用地巡查",
        createTime: '2018-04-30 14:00:02'
      },
      {
        flowId: "234534dfsg3",
        taskName: "姚店村其他巡查",
        taskType: "其他巡查",
        createTime: '2018-04-30 14:00:02'
      }
    ]
    if (this.dataList.length) {
      this.flowId = this.dataList[0].flowId
    }
  }

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
    this.flowModel.queryFollowDataByPage(this.pageService).subscribe(
      data => this.dataList = data.content
    )
  }


  private sortList() {
    // 
  }

  private mounted() {
    this.flowModel.status = MenuItems[0].status
    this.flowModel.type = "全部"
    this.refreshData()
  }

}
</script>

<style lang="less" scoped>
.page.business-system {
  .business-system-menu {
    &-item {
      text-align: center;
      padding: 5px 0;
      background-color: #f2f2f2;
      .menu-item-label {
        font-size: 16px;
      }
      &:hover {
        cursor: pointer;
      }
    }
    &-activated {
      background-color: aquamarine;
    }
  }

  .search {
    padding: 5px 0;
    border-bottom: solid 2px #f3f3f3;
    &-item-label {
      margin-left: 8px;
    }
    &-worktype {
      padding-left: 3px;
      width: 100px;
    }
  }
  .info-item {
    padding: 5px 0 5px 10px;
    border-bottom: solid 2px #f3f3f3;
    &-activated {
      background-color: #ffffea;
    }
    &:hover {
      cursor: pointer;
      background-color: #fdfdfd;
    }
  }
  .content-tabs {
    height: 100%;
    margin-left: 10px;
    &-panes {
      height: 100%;
      &-base {
        height: 100%;
      }
    }
  }
}
</style>

<style lang="less">
.page.business-system {
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
  .el-pagination {
    margin-top: 20px;
  }
  .content-tabs .el-tabs__content {
    height: calc(100% - 60px);
  }
}
</style>


