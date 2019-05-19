<template>
  <section class="component compute-panel">
    <div
      class="compute-item text-center"
      v-for="item of items"
      :key="item.key"
      @click="onItemClick(item)"
      :class="{ active: computeItem.key === item.key }"
    >
      <svg-icon :iconName="item.icon" iconSize="40"></svg-icon>
      <div>{{ item.label }}</div>
    </div>

    <el-dialog
      :title="computeItem.label"
      :center="true"
      :visible.sync="dialog.compute"
      width="700px"
      @close="computeItem = {}"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <component
        :is="computeItem.key"
        :area="drawEntity.area"
        :positions="drawEntity.positions"
      ></component>
    </el-dialog>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ComputItems, ComputeComponents } from "~/components/layer-system/compute-panel/compute.config.ts"
import { DrawInteractPolyline } from "~/utils/cesium/interact"
import MapViewer from "~/components/layer-viewer/map-viewer.vue"
import * as turf from "@turf/turf"
import { CesiumCommonService } from '@/utils/cesium/common.service'

@Component({
  components: {
    ...ComputeComponents
  }
})
export default class ComputePanel extends Vue {

  @Prop()
  private viewer!: MapViewer

  private items = ComputItems
  private computeItem: any = {}

  private drawPolyLineService!: DrawInteractPolyline
  private drawEntity = {
    positions: {},
    area: 0
  }

  private dialog = {
    compute: false
  }

  private mounted() {
    this.drawPolyLineService = new DrawInteractPolyline(this.viewer, {
      closed: true
    })
  }

  private async onItemClick(item) {
    this.computeItem = item

    const { positions } = await this.drawPolyLineService.start().toPromise()
    const points = positions.map(point => {
      const position = CesiumCommonService.cartesian3ToDegrees(point)
      return [position.longitude, position.latitude]
    })

    // 计算多边形
    const polygon = turf.polygon([[...points, points[0]]])
    this.drawEntity.area = Number.parseFloat(turf.area(polygon).toFixed(2))
    this.drawEntity.positions = [...points, points[0]]
    this.dialog.compute = true
  }

}
</script>

<style lang="less" scoped>
.component.compute-panel {
  .compute-item {
    padding-top: 20px;
    display: inline-block;
    height: 80px;
    width: 50%;
  }
  .active {
    color: #fc8144;
    background-color: #f3f3f3;
  }
}
</style>

<style lang="less">
.component.compute-panel {
  .el-dialog {
    .el-form .el-form-item .el-form-item__content .el-input {
      width: 280px !important;
    }
    .el-form .el-form-item .el-form-item__content .el-input.inline {
      width: 130px !important;
    }
    .multiply {
      display: inline-block;
      padding: 0 8px;
      font-weight: 900;
    }
    .common-title {
      padding: 20px 0;
    }
  }
}
</style>
