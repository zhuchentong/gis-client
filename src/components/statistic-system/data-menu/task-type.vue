<template>
  <section class="component task-type">
    <el-card>
      <common-title slot="header" :showIcon="false" title="外业任务类型统计">
        <div slot="append">
          <el-radio-group size="mini" v-model="queryModel.type" @change="onTypeChange">
            <el-radio-button :label="1">年</el-radio-button>
            <el-radio-button :label="2">季度</el-radio-button>
          </el-radio-group>
          <el-select v-model="queryModel.year" placeholder="请输入要查询的年份" @change="onYearChange">
            <el-option v-for="year of years" :key="year" :label="year" :value="year"></el-option>
          </el-select>
          <el-select v-if="queryModel.type === 2" v-model="queryModel.quarterly" placeholder="请输入要查询的季度" @change="onQuarterlyChange">
            <el-option v-for="{code,name} of quarterDataSet" :key="code" :label="name" :value="code"></el-option>
          </el-select>
        </div>
      </common-title>
      <div v-if="!dataSet.length" class="no-data"></div>
      <ve-pie v-else :data="chartData"></ve-pie>
    </el-card>
    <data-box :data="dataSet" :maxHeight="310">
      <template slot="columns">
        <el-table-column prop="type" label="任务类型" :formatter="row => $filter.dictConvert(row.type,'PatrolType')"></el-table-column>
        <el-table-column prop="number" label="次数"></el-table-column>
        <el-table-column prop="prefecture" label="所占百分比" :formatter="row => $filter.toPercent(row.prefecture)"></el-table-column>
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
    year: "",
    type: 1,
    quarterly: ""
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

  private quarterDataSet = [
    {
      code: "1",
      name: "一季度"
    },
    {
      code: "2",
      name: "二季度"
    },
    {
      code: "3",
      name: "三季度"
    },
    {
      code: "4",
      name: "四季度"
    }
  ]

  private chartData: any = {
    columns: Object.values(this.setting),
    rows: []
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

