<template>
  <section class="component site-panel">
    <div class="search row between-span">
      <div>
        <label>外业类型:</label>
        <el-select v-model="queryModel.grade" class="search-worktype">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="{code,name} of $dict.getDictData('DisasterGrade')" :key="code" :label="name" :value="code"></el-option>
        </el-select>
      </div>
      <div>
        <a @click="addNew">
          <svg-icon iconName="sort" iconSize="12"></svg-icon>
        </a>
      </div>
    </div>
    <div class="no-data" v-if="!dataList.length"></div>
    <div v-else>
      <div>
        <el-checkbox v-model="selectAll" :indeterminate="getIndeterminate">全部显示</el-checkbox>
      </div>
      <div v-for="item of dataList" :key="item.id" class="info-item" :class="{'info-item-activated': item.id === id}">
        <el-checkbox v-model="item.selected"></el-checkbox>
        <div>
          <div class="row between-span">
            <label>{{item.name}}</label>
            <el-button type="text" @click="onItemClick(item)">编辑</el-button>
          </div>
          <label-container>
            <label-item label="所属行政区" :value="item.prefecture | districtName"></label-item>
            <label-item label="等级" :value="item.grade | dictConvert('DisasterGrade')"></label-item>
          </label-container>
        </div>
      </div>
      <div class="text-center">
        <el-pagination @current-change="refreshData" small :pager-count="5" :current-page.sync="pageService.pageIndex" :page-size="pageService.pageSize" layout="total, prev, pager, next" :total="pageService.total">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="维护地灾点" :center="true" :visible.sync="dialog.modify" width="500px" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <modify-danger-site :model="editModel" @close="dialog.modify = false" @success="refreshData"></modify-danger-site>
    </el-dialog>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { PageService } from "~/extension/services/page.service"
import { Inject } from 'typescript-ioc'
import { LandDisasterService } from '~/services/land-disaster.service'
import { RequestParams } from '~/core/http'
import ModifyDangerSite from "~/components/layer-system/modify/modify-danger-site.vue"
import { DangerSiteModel } from "~/models/danger-site.model"
import { CommonService } from '~/utils/common.service'

@Component({
  components: {
    ModifyDangerSite
  }
})
export default class extends Vue {

  private queryModel = {
    name: '',
    grade: ''
  }

  private pageService = new PageService()

  private editModel = new DangerSiteModel()

  private dialog = {
    modify: false
  }


  private dataList: any[] = []

  @Inject
  private service!: LandDisasterService


  private get selectAll() {
    return this.dataList.every(x => x.selected)
  }

  private set selectAll(val) {
    this.dataList.forEach(x => x.selected = val)
  }

  private get getIndeterminate() {
    return this.dataList.some(x => x.selected)
  }

  private onItemClick(item) {
    CommonService.revertData(this.editModel, item)
  }

  private addNew() {
    this.editModel = new DangerSiteModel()
    this.dialog.modify = true
  }

  /**
   * 监听查询model变化
   */
  @Watch('queryModel', { deep: true })
  private onqueryModelChange() {
    this.refreshData()
  }
  private mounted() {
    this.refreshData()
  }

  private refreshData() {
    // const requestParam = new RequestParams(this.queryModel, { page: this.pageService })
    // this.service.queryLandDisasterAll(requestParam).subscribe(data => this.dataList = data)
    this.dataList = [
      {
        id: "11111",
        name: "姚店村三组滑坡点",
        prefecture: '200',
        grade: 'ONE'
      },
      {
        id: "11122211",
        name: "姚店村三组滑坡点",
        prefecture: '200',
        grade: 'TWO'
      },
      {
        id: "333333",
        name: "姚店村三组滑坡点",
        prefecture: '200',
        grade: 'THREE'
      }
    ]
  }

}
</script>


<style lang="less" scoped>
.component.site-panel {
  height: 100%;
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
    padding-top: 5px;
    border-bottom: solid 2px #f3f3f3;
    &-activated {
      background-color: #ffffea;
    }
    .el-button {
      padding: 5px 0;
    }
  }
}
</style>

<style lang="less">
.component.site-panel {
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
}
</style>


