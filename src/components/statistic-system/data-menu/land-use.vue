<template>
  <section class="component land-use">
    <el-card>
      <common-title slot="header" :showIcon="false" title="土地用途区统计"></common-title>
      <ve-pie :data="chartData" :settings="chartSettings" :extend="extendSetting"></ve-pie>
    </el-card>
    <data-box :data="dataSet" :maxHeight="320">
      <template slot="columns">
        <el-table-column prop="name" label="土地用途区类型"></el-table-column>
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
import { LayerStatisticalService } from "~/services/layer-statistical.service"
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'
import { Pie, VeHistogram } from "v-charts"
import DataBox from "~/components/common/data-box.vue"
import { CommonService } from '~/utils/common.service'
import { ChartColorByLandUse}  from "~/components/statistic-system/statistic-system.config"
@Component({
  components: {
    DataBox,
    Pie,
    VeHistogram
  }
})
export default class LandUse extends Vue {
  @Inject
  private sevice!: LayerStatisticalService

  private dataSet: any = []
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
          console.log(name,'name')
          return ChartColorByLandUse[name]
      },
      borderWidth:1,
      borderType:'solid',
      borderColor:'#f3eeee',
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

  private refreshData() {
    const params = new RequestParams({
      reportType: 'LAND_USE_AREA'
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

