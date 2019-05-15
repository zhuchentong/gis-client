<template>
  <section class="component land-now">
    <el-card header="管制区类型统计">
      <ve-pie :data="chartData"></ve-pie>
    </el-card>
    <data-box :data="dataSet">
      <template slot="columns">
        <el-table-column prop="type" label="管制区类型"></el-table-column>
        <el-table-column prop="area" label="占地面积（亩）"></el-table-column>
      </template>
    </data-box>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import { Pie } from "v-charts"




@Component({
  components: {
    DataBox,
    Pie
  }
})
export default class LandNow extends Vue {


  private readonly setting = {
    type: "管制区类型",
    area: "占地面积(亩)"
  }

  private dataSet: any = []
  private chartData = {
    columns: Object.values(this.setting),
    rows: []
  }


  private mounted() {
    this.dataSet = [
      {
        type: "允许建设区",
        area: "1233.32"
      },
      {
        type: "有条件建设区",
        area: "2314.32"
      },
      {
        type: "禁止建设区",
        area: "1323.32"
      },
      {
        type: "其他用地区",
        area: "2134.32"
      }
    ]

    this.chartData.rows = this.dataSet.map(item => {
      const row = {}
      row[this.setting.type] = item.type
      row[this.setting.area] = item.area
      return row
    })

  }
}
</script>

