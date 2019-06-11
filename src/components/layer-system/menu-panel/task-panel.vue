<template>
  <section class="component task-panel">
    <div class="search row between-span">
      <div>
        <label>外业类型:</label>
        <el-select v-model="queryModel.type" class="search-worktype">
          <el-option label="全部" value=""></el-option>
          <el-option
            v-for="{ code, name } of $dict.getDictData('PatrolType')"
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
    <div v-else>
      <div
        v-for="item of dataList"
        :key="item.id"
        class="info-item pointer"
        @click="itemClick(item)"
        :class="{ 'info-item-activated': item.id === id }"
      >
        <label-item
          label="任务名称"
          noWarp
          showTitle
          :value="item.name"
        ></label-item>
        <label-item
          label="外业类型"
          :value="item.type | dictConvert('PatrolType')"
        ></label-item>
        <label-item
          noWarp
          showTitle
          label="创建时间"
          :value="item.createTime | dateTimeFormat('yyyy年MM月dd日 hh:mm:ss')"
        ></label-item>
        <div class="text-right item-operate">
          <el-button type="text" @click="viewTaskDetail(item)"
            >查看详情</el-button
          >
          <el-button
            type="text"
            :disabled="item.show === 'NO'"
            @click="taskDataShow(item)"
            >显示区域</el-button
          >
        </div>
      </div>
      <div class="text-center">
        <el-pagination
          @current-change="refreshData"
          small
          :pager-count="5"
          :current-page.sync="pageService.pageIndex"
          :page-size="pageService.pageSize"
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
import { PageService } from "~/extension/services/page.service"
import { Inject } from 'typescript-ioc'
import { PatrolInfoService } from '~/services/patrol-info.service'
import { RequestParams } from '~/core/http'
import { WindowSize } from '~/config/enum.config'
import { CesiumDrawService } from "~/utils/cesium/draw.service"
import MapViewer from "~/components/layer-viewer/map-viewer.vue"
import { CesiumCommonService } from "~/utils/cesium/common.service.ts"

@Component({
  components: {}
})
export default class TaskPanel extends Vue {

  @Prop()
  private viewer!: MapViewer

  private queryModel = {
    status: "", // 已归档
    type: "" // 全部
  }
  // 查询到的数据列表
  private dataList: any[] = []
  private id = ""
  private pageService = new PageService({ pageSize: 10 })
  @Inject
  private patrolService!: PatrolInfoService

  private drawService!: CesiumDrawService
  // 最后一个画的区域
  private lastEntityId = ""

  /**
   * 监听查询model变化
   */
  @Watch('queryModel', { deep: true })
  private onqueryModelChange() {
    this.refreshData()
  }

  private refreshData() {
    this.id = ""
    // 是否归档
    const params = new RequestParams(
      { ...this.queryModel, isArchive: 1 },
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

  private viewTaskDetail(item) {
    console.log(item)
    this.$window.open('task-system',
      {
        size: WindowSize.large,
        maximizable: false
      },
      {
        replace: false,
        parent: null,
        params: { id: item.id }
      }, this)
  }

  private mounted() {
    this.refreshData()
    if (this.viewer) {
      this.drawService = new CesiumDrawService(this.viewer)
    }
  }

  /**
   * 拉取巡查数据，展示区域
   */
  private taskDataShow(item) {
    const requestParams = new RequestParams({ id: item.id })
    this.patrolService.getPatrolTrack(requestParams).subscribe(data => {
      if (!data.length) return
      let positions = data.map(v => ({ longitude: v.positionX, latitude: v.positionY }))
      positions = CesiumCommonService.degreesToCartesian3Array(positions)
      this.viewer && this.drawEntity(positions)
    })
  }

  /**
   * 绘制实体
   */
  private drawEntity(positions) {
    const entity = this.drawService.drawPolygon(positions)
    this.viewer.getViewer().zoomTo(entity)
    this.lastEntityId = entity.id
  }

  /**
   * 列表项变更。
   */
  private itemClick(item) {
    // 判断如果ID变化，就要将已经绘制的区域删除
    if (item.id !== this.id) {
      if (this.viewer && this.lastEntityId) {
        this.viewer.getViewer().entities.removeById(this.lastEntityId)
      }
    }
    this.id = item.id
  }
}
</script>


<style lang="less" scoped>
.component.task-panel {
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
.component.task-panel {
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



