<template>
  <section class="component site-panel">
    <div class="search row between-span">
      <div>
        <el-checkbox v-model="selectAll" class="search-select-all-checkbox" :indeterminate="getIndeterminate"></el-checkbox>
        <label>隐患级别:</label>
        <el-select v-model="queryModel.grade" class="search-worktype">
          <el-option label="全部" value></el-option>
          <el-option v-for="{code,name} of $dict.getDictData('DisasterGrade')" :key="code" :label="name" :value="code"></el-option>
        </el-select>
      </div>
      <div>
        <a @click="addNew">
          <svg-icon iconName="add-new" iconSize="12"></svg-icon>添加
        </a>
      </div>
    </div>
    <div class="no-data" v-if="!dataList.length"></div>
    <div v-else>
      <div v-for="item of dataList" :key="item.id" class="info-item row no-warp" :class="{'info-item-disabled': item.status === 'DISABLED' }">
        <el-checkbox v-model="item.selected" @change="sitStatusChange" class="info-item-check-box"></el-checkbox>
        <div>
          <div class="row between-span info-item-title">
            <label>{{item.name}}</label>
            <el-button type="text" v-if="item.selected" @click="onItemClick(item)">编辑</el-button>
          </div>
          <label-item label="隐患级别" :value="item.grade | dictConvert('DisasterGrade')"></label-item>
          <label-item label="所属行政区" :value="item.prefecture | districtName"></label-item>
        </div>
      </div>
      <div class="text-center">
        <el-pagination @current-change="refreshData" small :pager-count="5" :current-page.sync="pageService.pageIndex" :page-size="pageService.pageSize" layout="total, prev, pager, next" :total="pageService.total"></el-pagination>
      </div>
    </div>

    <el-dialog title="维护地灾点" :center="true" :visible.sync="dialog.modify" width="500px" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <modify-danger-site :model="editModel" @close="dialog.modify = false" @success="onAppendSuccess"></modify-danger-site>
    </el-dialog>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { PageService } from '~/extension/services/page.service'
import { Inject } from 'typescript-ioc'
import { LandDisasterService } from '~/services/land-disaster.service'
import { RequestParams } from '~/core/http'
import ModifyDangerSite from '~/components/layer-system/site-panel/modify-danger-site.vue'
import { DangerSiteModel } from '~/models/danger-site.model'
import { CommonService } from '~/utils/common.service'
import MapViewer from '~/components/layer-viewer/map-viewer.vue'
import { CesiumCommonService } from '@/utils/cesium/common.service'
import { DrawInteractPoint } from '@/utils/cesium/interact'
import { CesiumDrawService } from "~/utils/cesium/draw.service"

@Component({
  components: {
    ModifyDangerSite
  }
})
export default class SitePanel extends Vue {
  @Prop()
  private viewer!: MapViewer

  private queryModel = {
    name: '',
    grade: ''
  }

  private pageService = new PageService({ pageSize: 8 })
  private drawService: CesiumDrawService | null = null
  private pointEntitys: any[] = []

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
    if (!this.viewer || !this.drawService) {
      this.$message.error('绘制服务未加载')
      return
    }
    this.dataList.forEach(item => {
      this.showSite(val, item)
      item.selected = val
    })
  }

  private get getIndeterminate() {
    return this.dataList.some(x => x.selected) && !this.selectAll
  }

  private onItemClick(item) {
    CommonService.revertData(this.editModel, item)
    this.dialog.modify = true
  }

  private addNew() {
    this.editModel = new DangerSiteModel()
    const draw = new DrawInteractPoint(this.viewer)
    draw.start().subscribe({
      next: data => {
        const location = CesiumCommonService.cartesian3ToLocation(data.position)
        this.editModel.positionX = location.latitude
        this.editModel.positionY = location.longitude
      },
      complete: () => {
        this.dialog.modify = true
      }
    })
  }


  private showSite(value, data) {
    if (!this.drawService) return
    if (value) {
      const position = CesiumCommonService.degreesToCartesian3Array([
        {
          x: data.positionX,
          y: data.positionY
        }
      ])[0]
      const entity = this.drawService.drawPoint(position, data.name)
      this.viewer.getViewer().flyTo(entity)
      // 坐标点添加到记录里面
      this.pointEntitys.push({
        id: data.id,
        entityId: entity.id
      })
    } else {
      const item = this.pointEntitys.find(x => x.id === data.id)
      if (!item) return
      this.viewer.drawDataSource.entities.removeById(item.entityId)
      this.pointEntitys.splice(this.pointEntitys.findIndex(x => x.id === item.id), 1)
    }
  }

  private sitStatusChange(value) {
    this.showSite(value, this.editModel)
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
    if (this.viewer) this.drawService = new CesiumDrawService(this.viewer)
  }

  private refreshData() {
    // 删除已经加载的点
    if (this.viewer) {
      this.viewer.getViewer().entities.removeAll()
      this.pointEntitys = []
    }
    // 查询数据
    const requestParam = new RequestParams(this.queryModel, {
      page: this.pageService
    })
    this.service.queryLandDisasterAll(requestParam).subscribe(data => {
      this.dataList = data.content.map(v => {
        return {
          ...v,
          selected: false
        }
      })
    })
  }

  private onAppendSuccess() {
    this.viewer.drawDataSource.entities.removeAll()
    this.refreshData()
  }
}
</script>


<style lang="less" scoped>
.component.site-panel {
  height: 100%;
  .search {
    padding: 0 5px;
    line-height: 40px;
    background-color: #f3f3f3;
    border-bottom: solid 2px #f3f3f3;
    &-worktype {
      padding-left: 3px;
      width: 100px;
    }
    &-select-all-checkbox {
      margin-right: 10px;
    }
  }
  .info-item {
    padding: 5px 5px 0 5px;
    border-bottom: solid 2px #f3f3f3;
    &:hover {
      &:not(.info-item-disabled) {
        background-color: #ffffea;
      }
    }
    &-disabled {
      background-color: #f3f3f3;
    }
    .el-button {
      padding: 0;
    }
    &-check-box {
      margin-right: 8px;
      padding-top: 4px;
    }
    &-title {
      line-height: 24px;
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


