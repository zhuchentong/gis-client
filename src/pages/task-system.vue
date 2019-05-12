<template>
  <base-col-three class="page task-system" :class="{'only-detail':onlyShowDetail}">
    <div slot="left" class="col between-span system-menu text-center" style="height:100%">
      <div>
        <div v-for="item of menus" :key="item.label" class="system-menu-item pointer" @click="menuClick(item)" :class="{'system-menu-activated': item.status === currentMenu.status}">
          <svg-icon :iconName="item.icon" iconSize="24"></svg-icon>
          <div class="menu-item-label">{{item.label}}</div>
        </div>
      </div>
      <div class="add-item system-menu-item pointer" @click="dialog.craeteNew=true">
        <svg-icon iconName="add-new" iconSize="24"></svg-icon>
        <div class="menu-item-label">新增业务</div>
      </div>
    </div>
    <div slot="middle">
      <div class="search row between-span">
        <div>
          <label>外业类型:</label>
          <el-select v-model="queryModel.type" class="search-worktype">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="{code,name} of $dict.getDictData('PatrolType')" :key="code" :label="name" :value="code"></el-option>
          </el-select>
        </div>
        <div v-show="false">
          <label>时间排序</label>
          <a @click="sortList">
            <svg-icon iconName="sort" iconSize="12"></svg-icon>
          </a>
        </div>
      </div>
      <div class="no-data" v-if="!dataList.length"></div>
      <div v-else>
        <div v-for="item of dataList" :key="item.id" class="info-item pointer" @click="id = item.id" :class="{'info-item-activated': item.id === id}">
          <label-item label="任务名称" :value="item.name"></label-item>
          <label-item label="外业类型" :value="item.type | dictConvert('PatrolType')"></label-item>
          <label-item label="创建时间" :value="item.createTime | dateTimeFormat('yyyy年MM月dd日 hh:mm:ss')"></label-item>
        </div>
      </div>
      <div class="text-center">
        <el-pagination @current-change="refreshData" small :pager-count="5" :current-page.sync="pageService.pageIndex" :page-size="pageService.pageSize" layout="total, prev, pager, next" :total="pageService.total">
        </el-pagination>
      </div>
      <el-dialog title="新增业务" :center="true" :visible.sync="dialog.craeteNew" width="750px" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
        <create-new-task @close="dialog.craeteNew = false" @success="refreshData"></create-new-task>
      </el-dialog>
    </div>
    <el-tabs slot="content" v-model="currentPanel" class="content-tabs">
      <el-tab-pane v-for="item of tabs.filter( x => !currentMenu.hiddenPage.includes(x.name))" :key="item.name" :name="item.name" :label="item.label" class="content-tabs-panes">
        <component :is="item.component" :queryModel="queryModel" :id="id" class="content-tabs-panes-base"></component>
      </el-tab-pane>
    </el-tabs>
  </base-col-three>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Layout } from '@/core/decorator'
import BaseColThree from "~/components/common/base-col-three.vue"
import { MenuItems, DetailComponents, ContentItems } from "~/components/task-system/task-system.config"
import { Inject } from 'typescript-ioc'
import { PageService } from "~/extension/services/page.service"
import { PatrolInfoService } from '~/services/patrol-info.service'
import { RequestParams } from '~/core/http'
import CreateNewTask from "~/components/task-system/add-new/create-new-task.vue"

@Layout('workspace')
@Component({
  components: {
    BaseColThree,
    ...DetailComponents,
    CreateNewTask
  }
})
export default class extends Vue {
  private queryModel = {
    status: "PENDING_PATROL", // 待巡查
    type: "" // 全部
  }
  private pageService = new PageService({ pageSize: 8 })
  private menus = MenuItems
  private tabs = ContentItems

  // 查询到的数据列表
  private dataList: any[] = []
  private id = ""
  // 仅显示详情，从一张图跳转过来
  private onlyShowDetail = false
  // 当前tab页
  private currentPanel = ContentItems[0].name

  private currentMenu: any = MenuItems[0]

  private dialog = {
    craeteNew: false
  }


  @Inject
  private patrolService!: PatrolInfoService

  /**
   * 监听查询model变化
   */
  @Watch('queryModel', { deep: true })
  private onqueryModelChange() {
    this.refreshData()
  }


  private menuClick(item) {
    this.currentPanel = ContentItems[0].name
    this.currentMenu = item
    this.queryModel.status = item.status
    this.pageService.reset()
  }

  private refreshData() {
    this.id = ""
    // 是否归档
    const isArchive = this.queryModel.status ? 0 : 1
    const params = new RequestParams(
      { ...this.queryModel, isArchive },
      { page: this.pageService }
    )
    this.patrolService.queryPatrolInfoAll(params)
      .subscribe(
        data => {
          this.dataList = data.content
          if (this.dataList.length) this.id = this.dataList[0].id
        }
      )
  }


  private sortList() {
    // 
  }

  private mounted() {
    // 从其他系统调用此系统
    const id = this.$route.query.id as string
    if (id) {
      this.currentMenu = MenuItems.find(x => !x.status)
      this.queryModel.status = ""
      this.id = id
      this.onlyShowDetail = true
    } else {
      this.refreshData()
    }
  }

}
</script>

<style lang="less" scoped>
.page.task-system {
  height: 100%;

  .system-menu {
    &-item {
      padding: 15px 10px;
    }
    .menu-item-label {
      font-size: 14px;
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
    background-color: #64a1eb;
  }
}
</style>

<style lang="less">
.page.task-system {
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
    margin-top: 10px;
  }
  .content-tabs .el-tabs__content {
    height: calc(100% - 60px);
  }
}
// 隐藏左侧。中间列表
.page.task-system.only-detail {
  .layout-left,
  .layout-middle {
    display: none;
  }
}
</style>


