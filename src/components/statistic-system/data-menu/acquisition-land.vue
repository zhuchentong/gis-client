<template>
  <section class="component acquisition-land">
    <el-card>
      <common-title slot="header" :showIcon="false" title="征地统计">
        <div slot="append" style="display: inline-flex;">
          <el-select
            v-if="queryModel.type === 2"
            v-model="queryModel.year"
            placeholder="请输入要查询的年份"
            @change="onYearChange"
          >
            <el-option
              v-for="year of years"
              :key="year"
              :label="year"
              :value="year"
            ></el-option>
          </el-select>
          <el-radio-group
            size="mini"
            v-model="queryModel.type"
            @change="onTypeChange"
          >
            <el-radio-button :label="1">年</el-radio-button>
            <el-radio-button :label="2">季度</el-radio-button>
          </el-radio-group>
        </div>
      </common-title>
      <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
    </el-card>
    <data-box :data="dataSet" :maxHeight="310">
      <template slot="columns">
        <el-table-column
          prop="year"
          v-if="queryType === 1"
          label="年份"
        ></el-table-column>
        <el-table-column
          prop="quarterly"
          label="季度"
          v-if="queryType === 2"
          :formatter="row => queryQuarterName(row.quarterly)"
        ></el-table-column>
        <el-table-column prop="area" label="面积(亩)" :formatter="row=>$common.convertArea(row.area,'SQUARE_METRE').mu"></el-table-column>
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
import { VeHistogram } from "v-charts"
import { CommonService } from '~/utils/common.service'
import DataBox from "~/components/common/data-box.vue"
import { QuarterSetting, queryQuarterName } from '~/components/statistic-system/statistic-system.config'
@Component({
  components: {
    DataBox,
    VeHistogram
  }
})
export default class AcquisitionLand extends Vue {
  @Inject
  private sevice!: StatisticalService

  private queryModel = {
    year: 0,
    type: 1
  }

  private years: number[] = []

  private queryQuarterName = queryQuarterName

  private selectedYear = ""
  private queryType = 1

  private dataSet: any = []
  private readonly setting = {
    year: "年份",
    quarterly: "季度",
    area: "面积(亩)"
  }

  private chartSettings = {
    yAxisType: ["KMB"],
    yAxisName: ['面积(亩)']
  }

  private chartData: any = {
    columns: [],
    rows: []
  }

  private refreshData() {
    const params = new RequestParams(this.queryModel)
    this.sevice.getLandStatisticalExpropriation(params).subscribe(data => {
      this.queryType = this.queryModel.type
      this.changeChartColums()
      this.dataSet = data
      this.chartData.rows = data.map(v => {
        const row = {}
        Object.entries(this.setting).forEach(([key, value]) => {
          if (key === 'quarterly') {
            row[value] = this.queryQuarterName(v.quarterly)
          } else {
            row[value] = v[key]
          }
        })
        return row
      })
    })
  }

  private onTypeChange(val) {
    if (val === 1) {
      this.refreshData()
    } else {
      this.queryModel.year = new Date().getFullYear()
      this.refreshData()
    }
  }

  private changeChartColums() {
    if (this.queryType === 1) {
      this.chartData.columns = Object.values(this.setting).filter(x => x !== '季度')
    } else {
      this.chartData.columns = Object.values(this.setting).filter(x => x !== '年份')
    }
  }

  private onYearChange(year) {
    if (!year) return
    this.refreshData()
  }



  private mounted() {
    const currentYear = new Date().getFullYear()
    let loop = 5
    while (loop-- > 0) {
      this.years.unshift(currentYear - loop)
    }
    this.onTypeChange(1)
    this.refreshData()
  }

}
</script>

