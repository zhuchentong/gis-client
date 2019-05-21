<template>
  <section class="component land-control-detail">
    <el-card>
      <common-title
        slot="header"
        :showIcon="false"
        title="控制性详细规划统计"
      ></common-title>
      <ve-pie
        :data="chartData"
        :extend="extendSetting"
        :settings="chartSettings"
      ></ve-pie>
    </el-card>
    <data-box :data="dataSet" :maxHeight="320">
      <template slot="columns">
        <el-table-column prop="name" label="土地现状类型"></el-table-column>
        <el-table-column prop="acreage" label="占地面积(亩)"></el-table-column>
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
import { VePie, VeHistogram } from 'v-charts'
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'
import { ChartColorByControl}  from "~/components/statistic-system/statistic-system.config"

@Component({
  components: {
    DataBox,
    VePie,
    VeHistogram
  }
})
export default class LandControlDetail extends Vue {
  @Inject
  private sevice!: LayerStatisticalService

  private readonly setting = {
    name: '管制区类型',
    acreage: '占地面积(亩)'
  }

  private extendSetting: any = {
    title: {
      text: '控制性详细规划统计',
      x: 'center'
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      bottom:40
    },
    series: s => {
      s.forEach(i => {
        if (i.type === 'pie') {
          i.center = ['30%', '50%']
        }
      })
      return s
    }
  }

  private chartSettings: any = {
    labelLine: {
      show: false
    },
    label: {
      show: false
    },
    itemStyle: {
        color:({name}) => {
     console.log(name,'name')

          return ChartColorByControl[name]
      }
    }
  }

  private chartData = {
    columns: Object.values(this.setting),
    rows: []
  }
  private dataSet: any = []

  private refreshData() {
    const params = new RequestParams({
      reportType: 'REGULATORY_PLAN'
    })
    this.sevice.getLayerStatisticalReport(params).subscribe(data => {
      this.dataSet = data
      this.chartData.rows = data.map(v => {
        const row = {}
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

