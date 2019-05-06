<template>
  <base-col-three class="page business-system">
    <div slot="left" class="col between-span text-center" style="height:100%">
      <div>
        <div v-for="item of menus" :key="item.label" class="business-system-menu-item pointer" @click="flowModel.status = item.status" :class="{'business-system-menu-activated': item.status === flowModel.status}">
          <svg-icon :iconName="item.icon" iconSize="32"></svg-icon>
          <div class="menu-item-label">{{item.label}}</div>
        </div>
      </div>
      <div class="add-item business-system-menu-item pointer" @click="dialog.craeteNew=true">
        <svg-icon iconName="add-new" iconSize="32"></svg-icon>
        <div class="menu-item-label">新增业务</div>
      </div>
    </div>
    <div slot="middle">
      <div class="search row between-span">
        <div>
          <label>项目类型:</label>
          <el-select v-model="flowModel.type" class="search-worktype">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="{code,name} of $dict.getDictData('FlowType')" :key="code" :label="name" :value="code"></el-option>
          </el-select>
        </div>
        <div>
          <label>时间排序</label>
          <a @click="sortList">
            <svg-icon iconName="sort" iconSize="12"></svg-icon>
          </a>
        </div>
      </div>
      <div class="no-data" v-if="!dataList.length"></div>
      <div v-else>
        <div v-for="item of dataList" :key="item.id" class="info-item pointer" @click="flowId = item.flowId" :class="{'info-item-activated': item.flowId === flowId}">
          <label-item label="项目名称" :value="item.name"></label-item>
          <label-item label="项目类型" :value="item.type | dictConvert('FlowType')"></label-item>
          <label-item label="创建时间" :value="item.createTime | dateTimeFormat('yyyy年MM月dd日 hh:mm:ss')"></label-item>
        </div>
      </div>
      <div class="text-center">
        <el-pagination @current-change="refreshData" :current-page.sync="pageService.pageIndex" :pager-count="5" :page-size="pageService.pageSize" layout="total, prev, pager, next" :total="pageService.total">
        </el-pagination>
      </div>
      <el-dialog title="新增业务" :center="true" :visible.sync="dialog.craeteNew" width="800px" :show-close="false" :close-on-click-modal="false">
        <create-new-business :show="dialog.craeteNew" @close="dialog.craeteNew = false" @success="refreshData"></create-new-business>
      </el-dialog>
    </div>
    <el-tabs slot="content" v-model="currentPanel" class="content-tabs">
      <el-tab-pane v-for="item of tabs" :key="item.name" :name="item.name" :label="item.label" class="content-tabs-panes">
        <component :is="item.component" @success="refreshData" :status="flowModel.status" :flowId="flowId" class="content-tabs-panes-base"></component>
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


  private sortList() {
    // 
  }

  private mounted() {
    this.flowModel.status = MenuItems[0].status
    this.flowModel.type = ""
    this.refreshData()
  }

}
</script>

<style lang="less" scoped>
.page.business-system {
  .business-system-menu {
    &-item {
      padding: 10px;
      background-color: #f2f2f2;
      .menu-item-label {
        font-size: 14px;
      }
    }
    &-activated {
      background-color: aquamarine;
    }
  }

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
  .info-item {
    padding: 5px 0 5px 10px;
    border-bottom: solid 2px #f3f3f3;
    &-activated {
      background-color: #ffffea;
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
  .add-item {
    background-color: #409eff;
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


