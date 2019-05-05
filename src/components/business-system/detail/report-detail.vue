<template>
  <data-grid :totalSpan="1" :labelWidth="90" contentAlign="left" class="component report-detail">
    <data-grid-item :span="1" label="项目名称">{{data.name}}</data-grid-item>
    <data-grid-item :span="1" label="项目类型">{{data.type | dictConvert('FlowType')}}</data-grid-item>
    <data-grid-item :span="1" label="项目面积">{{`${data.acreage} 亩`}}</data-grid-item>
    <data-grid-item :span="1" label="行政区">{{data.region | districtName}}</data-grid-item>
    <data-grid-item :span="1" label="申报日期">{{data.applyTime | dateTimeFormat('yyyy年MM月dd日')}}</data-grid-item>
    <data-grid-item :span="1" label="备注">{{data.remark}}</data-grid-item>
  </data-grid>
</template>


<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { DataGrid, DataGridItem } from "@zct1989/vue-component"

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class extends Vue {


  @Prop()
  private data!: any

}
</script>

<style lang="less" scoped>
.component.report-detail {
  width: 350px;
}
</style>


