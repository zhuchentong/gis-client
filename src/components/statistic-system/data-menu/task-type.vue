<template>
  <section class="component task-type">
    <el-card>
      <common-title slot="header" :showIcon="false" title="外业任务类型统计">
        <div slot="append" style="display: inline-flex;">
          <el-radio-group
            size="mini"
            v-model="queryModel.type"
            @change="onTypeChange"
          >
            <el-radio-button :label="1">年</el-radio-button>
            <el-radio-button :label="2">季度</el-radio-button>
          </el-radio-group>
          <el-select
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
          <el-select
            v-if="queryModel.type === 2"
            v-model="queryModel.quarterly"
            placeholder="请输入要查询的季度"
            @change="onQuarterlyChange"
          >
            <el-option
              v-for="{ code, name } of quarterDataSet"
              :key="code"
              :label="name"
              :value="code"
            ></el-option>
          </el-select>
        </div>
      </common-title>
      <div v-if="!dataSet.length" class="no-data"></div>
      <ve-pie v-else :data="chartData" :extend="extendSetting" :settings="chartSettings"></ve-pie>
    </el-card>
    <data-box :data="dataSet" :maxHeight="310">
      <template slot="columns">
        <el-table-column
          prop="type"
          label="任务类型"
          :formatter="row => $filter.dictConvert(row.type, 'PatrolType')"
        ></el-table-column>
        <el-table-column prop="number" label="次数"></el-table-column>
        <el-table-column
          prop="ratio"
          label="所占百分比"
          :formatter="row => $filter.toPercent(row.ratio)"
        ></el-table-column>
      </template>
    </data-box>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { StatisticalService } from "~/services/statistical.service"
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'
import { VePie } from "v-charts"
import DataBox from "~/components/common/data-box.vue"
import { FilterService } from "~/utils/filter.service"
import { getQuarter } from "date-fns"
import { QuarterSetting } from "~/components/statistic-system/statistic-system.config"

@Component({
  components: {
    DataBox,
    VePie
  }
})
export default class TaskType extends Vue {
  @Inject
  private sevice!: StatisticalService

  private queryModel: any = {
    year: 2019,
    type: 1,
    quarterly: 0
  }

  private years: number[] = []

  private selectedYear = ""
  private queryType = 1

  private dataSet: any = []
  private readonly setting = {
    type: "任务类型",
    number: "次数",
    prefecture: "所占百分比"
  }

  private quarterDataSet = QuarterSetting

  private chartData: any = {
    columns: Object.values(this.setting),
    rows: []
  }

  private chartSettings={
    labelLine: {
      show: false
    },
    label: {
      show: false
    },
    itemStyle:{
      borderWidth:1,
      borderType:'solid',
      borderColor:'#f3eeee'
    }
  }

    private extendSetting={
    tooltip:{
    confine:true
    }
  }

  private refreshData() {
    if (this.queryModel.type === 2) {
      if (!this.queryModel.year || !this.queryModel.quarterly) return
    } else {
      if (!this.queryModel.year) return
    }
    const params = new RequestParams(this.queryModel)
    this.sevice.getStatisticalPatrolByType(params).subscribe(data => {
      this.queryType = this.queryModel.type
      this.dataSet = data
      this.chartData.rows = data.map(v => {
        const row = {}
        Object.entries(this.setting).forEach(([key, value]) => {
          if (key === "type") {
            const str = FilterService.dictConvert(v[key], 'PatrolType')
            row[value] = str
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
      this.queryModel.quarterly = getQuarter(new Date())
      this.refreshData()
    }
  }


  private onYearChange(year) {
    if (!year) return
    this.refreshData()
  }

  private onQuarterlyChange(value) {
    if (!value) return
    this.refreshData()
  }


  private mounted() {
    const currentYear = new Date().getFullYear()
    let loop = 5
    while (loop-- > 0) {
      this.years.unshift(currentYear - loop)
    }
    this.queryModel.year = currentYear
    this.onTypeChange(1)
    this.refreshData()
  }

}
</script>

