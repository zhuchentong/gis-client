<template>
  <data-grid :totalSpan="2" :labelWidth="90" contentAlign="left" class="component approve-detail">
    <data-grid-item :span="1" label="项目名称">{{data.name}}</data-grid-item>
    <data-grid-item :span="1" label="项目类型">{{data.type | dictConvert('FlowType')}}</data-grid-item>
    <data-grid-item :span="1" label="项目面积">
       <area-detail :area="data.acreage" :unit="data.unit"></area-detail>
    </data-grid-item>
    <data-grid-item :span="1" label="行政区">{{data.region | districtName}}</data-grid-item>
    <data-grid-item :span="2" label="备注">{{data.remark}}</data-grid-item>
    <data-grid-item :span="1" label="批文编号">{{data.code}}</data-grid-item>
    <data-grid-item :span="1" label="报地项目">
      {{reportName}}
      <el-popover v-if="data.reportInfo" title="报地详情" placement="right" trigger="click">
        <report-detail :data="data.reportInfo"></report-detail>
        <a slot="reference" title="点击查看报地详情">
          <i class="el-icon-info"></i>
        </a>
      </el-popover>
    </data-grid-item>
    <data-grid-item :span="1" label="批复日期">{{data.grantTime | dateTimeFormat('yyyy年MM月dd日')}}</data-grid-item>
    <data-grid-item :span="1" label="批复结果">{{data.result | dictConvert('GrantResult')}}</data-grid-item>
    <data-grid-item :span="2" label="批复备注">{{data.grantRemark}}</data-grid-item>
  </data-grid>
</template>


<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { DataGrid, DataGridItem } from "@zct1989/vue-component"
import ReportDetail from "./report-detail.vue"
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'
import AreaDetail from "./area-detail.vue"
@Component({
  components: {
    DataGrid,
    DataGridItem,
    ReportDetail,
    AreaDetail
  }
})
export default class extends Vue {


  @Prop()
  private data!: any

  private get reportName(){
    if(!this.data) return ""
    if(!this.data.reportInfo) return ""
    return this.data.reportInfo.name
  }

}
</script>

<style lang="less" scoped>
.component.approve-detail {
  width: 600px;
}
</style>
