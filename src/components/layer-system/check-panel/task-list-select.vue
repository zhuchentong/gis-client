<template>
  <section class="component task-list-select">
    <data-box :data="dataSet" :maxHeight="380" :selectionRow.sync="taskSelectedRow">
      <template slot="columns">
        <el-table-column label="任务类型" prop="name" :min-width="$helper.getColumnWidth(1)" show-overflow-tooltip></el-table-column>
        <el-table-column label="任务名称" prop="name" :min-width="$helper.getColumnWidth(2)"></el-table-column>
        <el-table-column label="巡查时间" prop="createTime" :min-width="$helper.getColumnWidth(2)" :formatter="row => $filter.dateTimeFormat(row.createTime)"></el-table-column>
        <el-table-column label="巡查人员" prop="partolUserName" :min-width="$helper.getColumnWidth(1)"></el-table-column>
      </template>
    </data-box>
    <div class="operate-buttons">
      <el-button @click="submit">确定</el-button>
    </div>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import { PatrolInfoService } from "~/services/patrol-info.service.ts"
import { RequestParams } from "~/core/http/"
import { Inject } from "typescript-ioc"
// import { zip } from 'rxjs'
import { PageService } from "~/extension/services/page.service.ts"

@Component({
  components: {
    DataBox
  }
})
export default class TaskListSelect extends Vue {

  private taskSelectedRow: any = {}
  private dataSet: any[] = []
  @Inject
  private service!: PatrolInfoService

  private async refreshData() {
    // const [data1, data2] = await zip([
    //   this.service.queryPatrolInfoAll(new RequestParams({ isArchive: 1 })),
    //   this.service.queryPatrolInfoAll(new RequestParams({ isArchive: 0, status: "COMPLETE_PATROL" }))
    // ]).toPromise()
    // // 查展示有巡查结果区域的
    // this.dataSet = [...data1, data2].filter(x => x.show === 'YES')
    const page = new PageService({ pageSize: 1000 })
    this.service.queryPatrolInfoAll(new RequestParams({ isArchive: 1 }, { page })).subscribe(
      data => this.dataSet = data.content
    )
  }

  private mounted() {
    this.refreshData()
  }

  @Emit('affirm')
  private onAffirm(data) {
    return data
  }

  private submit() {
    if (!this.taskSelectedRow.id) {
      this.$message('请选择要对比的巡查项目')
      return
    }
    const requestParams = new RequestParams({ id: this.taskSelectedRow.id })
    this.service.getPatrolTrack(requestParams).subscribe(this.onAffirm)
  }

}
</script>
