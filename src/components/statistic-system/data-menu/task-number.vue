<template>
  <section class="component report-land">
    <el-card header="外业任务数统计">
      <ve-pie :data="chartData"></ve-pie>
    </el-card>
    <data-box :data="dataSet"  :maxHeight="320">
      <template slot="columns">
        <el-table-column prop="userName" label="人员"></el-table-column>
        <el-table-column prop="number" label="次数"></el-table-column>
        <el-table-column prop="ratio" label="所占百分比"></el-table-column>
      </template>
    </data-box>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { StatisticalService } from '~/services/statistical.service'
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'
import { Pie } from 'v-charts'
import DataBox from '~/components/common/data-box.vue'
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
    type: '管制区类型',
    area: '占地面积(亩)'
  }
  private chartData = {
    columns: Object.values(this.setting),
    rows: []
  }

  private refreshData() {
    const params = new RequestParams({
      type: '1',
      year: '2019'
    })
    this.sevice.getStatisticalPatrolByUser(params).subscribe(data => {
      this.dataSet = data
      this.chartData.rows = data.map(item => {
        const row = {}
        row[this.setting.type] = item.userName
        row[this.setting.area] = item.ratio
        return row
      })
    })
  }
  private mounted() {
    this.refreshData()
  }
}
</script>

