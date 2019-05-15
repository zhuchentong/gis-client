<template>
  <section class="component report-land">
       <el-card header="报地统计">
      <ve-pie :data="chartData"></ve-pie>
    </el-card>
    <data-box :data="dataSet">
      <template slot="columns">
        <el-table-column prop="year" label="年份"></el-table-column>
        <el-table-column prop="area" label="面积(亩)"></el-table-column>
        <el-table-column prop="ratio" label="所占百分比"></el-table-column>
      </template>
    </data-box>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { StatisticalService } from "~/services/statistical.service"
import {Inject} from 'typescript-ioc'
import { RequestParams } from '~/core/http'
import { Pie } from "v-charts"
import DataBox from "~/components/common/data-box.vue"
@Component({
  components: {
    DataBox,
    Pie
  }
})
export default class ReportLand extends Vue {
  @Inject
  private sevice!: StatisticalService

  private dataSet: any = []
    private readonly setting = {
    type: "管制区类型",
    area: "占地面积(亩)"
  }
   private chartData = {
    columns: Object.values(this.setting),
    rows:[]
  }

    private refreshData() {
    const params = new RequestParams({
      type: '1',
      year:''
    })
 this.sevice.getLandStatisticalReport(params).subscribe(data => this.dataSet = data)
  }
  private mounted(){
    this.refreshData()
  }

 }
</script>

