<template>
  <section class="component business-list-select">
    <data-box
      :data="dataSet"
      :selectionRow.sync="businessSelectedRow"
      :maxHeight="380"
      :page="page"
      @onPageChange="refreshData"
    >
      <template slot="columns">
        <el-table-column
          label="业务类型"
          prop="type"
          :min-width="$helper.getColumnWidth(1)"
          :formatter="row => $filter.dictConvert(row.type, 'FlowType')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="项目名称"
          prop="name"
          :min-width="$helper.getColumnWidth(2)"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          :min-width="$helper.getColumnWidth(1)"
          :formatter="row => $filter.dateFormat(row.createTime)"
        ></el-table-column>
        <el-table-column
          label="创建人"
          prop="userName"
          :min-width="$helper.getColumnWidth(1)"
        ></el-table-column>
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
import { FlowInfoService } from "~/services/flow-info.service"
import { RequestParams } from "~/core/http/"
import { Inject } from "typescript-ioc"
import { PageService } from "~/extension/services/page.service"

@Component({
  components: {
    DataBox
  }
})
export default class BusinessListSelect extends Vue {

  private businessSelectedRow: any = {}
  private dataSet: any[] = []
  @Inject
  private service!: FlowInfoService

  private page = new PageService()

  private async refreshData() {
    this.service.queryFlowInfoFinish(new RequestParams({ status: "FINSH", whether: 1 }, { page: this.page })).subscribe(
      data => this.dataSet = data.content.filter(x => x.whether === 'YES')
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
    if (!this.businessSelectedRow.flowId) {
      this.$message('请选择要对比的业务项目')
      return
    }
    const requestParams = new RequestParams({ flowId: this.businessSelectedRow.flowId })
    this.service.getLayerInfoByFlowId(requestParams).subscribe(data => {
      delete data.uploadFile
      this.onAffirm(data)
    })
  }

}
</script>
