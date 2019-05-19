<template>
  <section class="component select-danger-site">
    <data-box :data="dataSet" :maxHeight="420" :selectionRow.sync="currentRow">
      <template slot="columns">
        <el-table-column
          label="隐患点名称"
          prop="name"
          :min-width="$helper.getColumnWidth(3)"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="级别"
          :min-width="$helper.getColumnWidth(1)"
          :formatter="row => $filter.dictConvert(row.grade, 'DisasterGrade')"
        ></el-table-column>
        <el-table-column
          label="所属行政区"
          :min-width="$helper.getColumnWidth(2)"
          :formatter="row => $filter.districtName(row.prefecture)"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          :formatter="row => $filter.dateFormat(row.createTime)"
          :min-width="$helper.getColumnWidth(2)"
        ></el-table-column>
      </template>
    </data-box>
    <div class="operate-buttons">
      <el-button @click="submit">确定</el-button>
    </div>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch, Emit, Model } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import { LandDisasterService } from "~/services/land-disaster.service"
import { RequestParams } from '~/core/http'
import Cesium from "cesium/Cesium"

@Component({
  components: {
    DataBox
  }
})
export default class SelectDangerSite extends Vue {
  private dataSet: any[] = []
  private currentRow: any = {}

  @Emit("on-selected")
  private onSelected(cartographic) { return }

  private mounted() {
    const service = new LandDisasterService()
    service.getLandDisasters(new RequestParams(null)).subscribe(
      (data: any[]) => {
        this.dataSet = data.filter(x => x.status === 'ENABLED')
      }
    )
  }

  private submit() {
    if (!this.currentRow.id) {
      this.$message('请选择隐患点')
      return
    }
    const cartographic = Cesium.Cartographic.fromDegrees(this.currentRow.positionX, this.currentRow.positionY)
    this.onSelected(cartographic)
  }

}
</script>


<style lang="less">
.component.select-point {
  height: 500px;
}
</style>

