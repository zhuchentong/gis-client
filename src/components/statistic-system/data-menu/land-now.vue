<template>
  <section class="component land-now">
    <div class="row">
      <el-card class="col-span-6">
        <common-title slot="header" :showIcon="false" title="土地现状数据统计">
          <el-select
            slot="append"
            v-model="queryModel.year"
            placeholder="请输入要查询的年份"
            @change="onYearChange"
          >
            <el-option
              v-for="year of years"
              :key="year"
              :label="`${year}年`"
              :value="year"
            ></el-option>
          </el-select>
        </common-title>
        <ve-pie
          :data="chartData"
          :settings="chartSetting"
          :events="chartEvents"
        ></ve-pie>
      </el-card>
      <el-card class="col-span-6">
        <div v-if="!typeName" class="no-data"></div>
        <template v-else>
          <common-title
            slot="header"
            class="common-title"
            :showIcon="false"
            :title="typeName"
          ></common-title>
          <ve-pie :data="chartDataByType" :settings="chartSetting"></ve-pie>
        </template>
      </el-card>
    </div>
    <data-box :data="dataSet" :maxHeight="320">
      <template slot="columns">
        <el-table-column prop="name" label="土地现状类型"></el-table-column>
        <el-table-column prop="acreage" label="占地面积(亩)" ></el-table-column>
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
import DataBox from '~/components/common/data-box.vue'
import { LayerStatisticalService } from '~/services/layer-statistical.service'
import { Pie } from 'v-charts'
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'
import { ChartColorByLandNow } from '~/components/statistic-system/statistic-system.config'

@Component({
  components: {
    DataBox,
    Pie
  }
})
export default class LandNow extends Vue {
  @Inject
  private sevice!: LayerStatisticalService

  private queryModel = {
    year: 2017
  }

  private years = [2016, 2017]

  private chartSetting = {
    selectedMode: 'single',
    labelLine: {
      show: false
    },
    label: {
      show: false
    },
    itemStyle: {
      color: ({ name }) => {
        return ChartColorByLandNow[name.trim()]
      },
      borderWidth:1,
      borderType:'solid',
      borderColor:'#f3eeee'
    }
  }

  private readonly setting = {
    name: '类型',
    acreage: '占地面积(亩)'
  }

  private chartEvents = {
    click: this.onChartClick
  }

  private dataSet: any = []
  private typeName = ''

  private chartData = {
    columns: Object.values(this.setting),
    rows: []
  }

  private chartDataByType = {
    columns: Object.values(this.setting),
    rows: []
  }

  private onYearChange(value) {
    if (!value) return
    this.refreshData()
  }

  private refreshData() {
    this.sevice
      .getClassificationOne(new RequestParams(this.queryModel))
      .subscribe(data => {
        this.dataSet = data
        this.chartData.rows = data.map(v => {
          const row: any = {}
          Object.entries(this.setting).forEach(([key, value]) => {
            row[value] = v[key]
          })
          return row
        })
      })
  }

  private onChartClick(e) {
    const name = e.name
    const findRow = this.dataSet.find(x => x.name === name)
    if (!findRow) return
    const queryParams = new RequestParams({
      publishId: findRow.publishId,
      code: findRow.code
    })
    this.sevice.getSecondClassification(queryParams).subscribe(data => {
      this.typeName = name
      this.chartDataByType.rows = data.map(v => {
        const row: any = {}
        Object.entries(this.setting).forEach(([key, value]) => {
          row[value] = v[key]
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

<style lang="less" scoped>
.component.land-now {
  .common-title {
    line-height: 26px;
  }
}
</style>

