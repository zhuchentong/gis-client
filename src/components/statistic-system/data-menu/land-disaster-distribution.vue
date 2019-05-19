<template>
  <section class="component report-land">
    <div class="row">
      <el-card class="col-span-6">
        <common-title
          slot="header"
          :showIcon="false"
          title="地灾分布统计"
        ></common-title>
        <ve-pie :data="chartDataByName" :events="chartEvents"></ve-pie>
      </el-card>
      <el-card class="col-span-6">
        <div v-if="!chartDataName" class="no-data"></div>
        <template v-else>
          <common-title
            slot="header"
            :showIcon="false"
            :title="`${chartDataName}-隐患等级`"
          ></common-title>
          <ve-pie :data="chartDataByGrade"></ve-pie>
        </template>
      </el-card>
    </div>
    <data-box :data="dataSet" :maxHeight="320">
      <template slot="columns">
        <el-table-column prop="prefecture" label="行政村"></el-table-column>
        <el-table-column prop="number" label="地灾点个数"></el-table-column>
        <el-table-column
          prop="ratio"
          label="所占百分比"
          :formatter="row => $filter.toPercent(row.ratio)"
        ></el-table-column>
      </template>
    </data-box>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { StatisticalService } from "~/services/statistical.service"
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'
import { Pie } from "v-charts"
import DataBox from "~/components/common/data-box.vue"
import { FilterService } from "~/utils/filter.service"

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

  private chartDataName = ""
  private readonly settingByName = {
    prefecture: "行政村",
    number: "数量"
  }
  private readonly settingByGrade = {
    grade: "等级",
    number: "数量"
  }
  private chartDataByName = {
    columns: Object.values(this.settingByName),
    rows: []
  }

  private chartDataByGrade = {
    columns: Object.values(this.settingByGrade),
    rows: []
  }

  private chartEvents = {
    click: this.onChartClick
  }

  private refreshData() {
    this.sevice.getStatisticalDisasterByName(new RequestParams(null)).subscribe(data => {
      this.dataSet = data
      this.chartDataByName.rows = data.map(v => {
        const row = {}
        Object.entries(this.settingByName).forEach(([key, value]) => {
          row[value] = v[key]
        })
        return row
      })
    })

  }

  private onChartClick(e) {
    this.chartDataName = e.name
    const params = new RequestParams({ prefecture: e.name })
    this.sevice.getStatisticalDisasterByGrade(params).subscribe(data => {
      this.chartDataByGrade.rows = data.map(v => {
        const row = {}
        Object.entries(this.settingByGrade).forEach(([key, value]) => {
          if (key === "grade") {
            row[value] = FilterService.dictConvert(v.grade, 'DisasterGrade')
          } else {
            row[value] = v[key]
          }
        })
        return row
      })
    })
  }

  private mounted() {
    this.refreshData()
  }

}
</script>

