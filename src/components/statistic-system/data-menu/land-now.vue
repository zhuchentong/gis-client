<template>
  <section class="component land-now">
    <el-card header="土地现状数据统计">
      <ve-pie :data="chartData"></ve-pie>
    </el-card>
    <data-box :data="dataSet">
      <template slot="columns">
        <el-table-column prop="name" label="土地现状类型"></el-table-column>
        <el-table-column prop="acreage" label="占地面积(亩)"></el-table-column>
        <el-table-column prop="ratio" label="所占百分比"></el-table-column>
      </template>
    </data-box>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import {Component, Vue } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import { LayerStatisticalService } from "~/services/layer-statistical.service"
import { Pie } from "v-charts"
import {Inject} from 'typescript-ioc'
import { RequestParams } from '~/core/http'




@Component({
  components: {
    DataBox,
    Pie
  }
})
export default class LandNow extends Vue {

  @Inject
  private sevice!: LayerStatisticalService


  private readonly setting = {
    type: "管制区类型",
    area: "占地面积(亩)"
  }

  private dataSet: any = []
  private chartData = {
    columns: Object.values(this.setting),
    rows:[]
  }


   private refreshData() {
    const params = new RequestParams({
      year: '2019'
    })
 this.sevice.getClassificationOne(params).subscribe(data => {
 this.dataSet = data,
   this.chartData.rows=data.map(item=>{
  const row = {}
      row[this.setting.type] = item.name
      row[this.setting.area] = item.acreage
      return row
 })

 })
  }


  private mounted() {
    this.refreshData()
    // this.chartData.rows = this.dataSet.map(item => {
    //   console.log(item,'item')
    //   const row = {}
    //   row[this.setting.type] = item.name
    //   row[this.setting.area] = item.acreage
    //   return row
    // })

  }
}
</script>

