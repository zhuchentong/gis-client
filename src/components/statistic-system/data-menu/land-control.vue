<template>
  <section class="component land-control">
    <el-card>
      <common-title slot="header" :showIcon="false" title="管制区类型统计"></common-title>
      <ve-pie :data="chartData" :extend="extendSetting" :settings="chartSettings"></ve-pie>
    </el-card>
    <data-box :data="dataSet" :maxHeight="320">
      <template slot="columns">
        <el-table-column prop="name" label="管制区类型"></el-table-column>
        <el-table-column prop="acreage" label="占地面积(亩)" :formatter="row=>$common.convertArea(row.acreage,'SQUARE_METRE').mu"></el-table-column>
        <el-table-column prop="ratio" label="所占百分比" :formatter="row => $filter.toPercent(row.ratio)"></el-table-column>
      </template>
    </data-box>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import { LayerStatisticalService } from "~/services/layer-statistical.service"
import { Pie } from "v-charts"
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'
import { CommonService } from '~/utils/common.service'
import { ChartColorByControlType}  from "~/components/statistic-system/statistic-system.config"
@Component({
  components: {
    DataBox,
    Pie
  }
})
export default class LandControl extends Vue {
  @Inject
  private sevice!: LayerStatisticalService
  private readonly setting = {
    name: "管制区类型",
    acreage: "占地面积(亩)"
  }
  private chartData = {
    columns: Object.values(this.setting),
    rows: []
  }
    private chartSettings: any = {
    itemStyle: {
        color:({name}) => {
          return ChartColorByControlType[name]
      },
      borderWidth:1,
      borderType:'solid',
      borderColor:'#f3eeee'
    },
    labelLine: {
      show: false
    },
    label: {
      show: false
    }
  }

     private extendSetting={
    tooltip:{
    confine:true
    }
  }
  private dataSet: any = []

  private refreshData() {
    const params = new RequestParams({
      reportType: 'LAND_CONSTRUCTION'
    })
    this.sevice.getLayerStatisticalReport(params).subscribe(data => {
      this.dataSet = data
      this.chartData.rows = data.map(v => {
        const row = {}
        Object.entries(this.setting).forEach(([key, value]) => {
          row[value] = v[key]
          row['占地面积(亩)']=CommonService.convertArea(row['占地面积(亩)'],'SQUARE_METRE').mu
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

