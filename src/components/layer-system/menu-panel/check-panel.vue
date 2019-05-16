<template>
  <section class="component check-panel">
    <div class="compute-item text-center" v-for="item of items" :key="item.key" @click="onItemClick(item)" :class="{'active': checkItem.key === item.key}">
      <svg-icon :iconName="item.icon" iconSize="40"></svg-icon>
      <div>{{item.label}}</div>
    </div>

    <div v-if="dialog.hasResult" class="view-result">
      <a @click="dialog.result = true" title="查看分析结果">
        <svg-icon iconName="saved" iconSize="40"></svg-icon>
      </a>
    </div>
    <el-dialog title="选择外业项目" :center="true" :visible.sync="dialog.task" width="750px" :close-on-click-modal="false" :close-on-press-escape="false">
      <task-list-select @affirm="taskSelected"></task-list-select>
    </el-dialog>
    <el-dialog title="选择业务项目" :center="true" :visible.sync="dialog.business" width="750px" :close-on-click-modal="false" :close-on-press-escape="false">
      <business-list-select @affirm="businessSelected"></business-list-select>
    </el-dialog>
    <el-dialog title="选择对比图层" :center="true" :visible.sync="dialog.layer" width="550px" :close-on-click-modal="false" :close-on-press-escape="false">
      <check-layer-select @affirm="layerSelected"></check-layer-select>
    </el-dialog>
    <el-dialog title="检测项结果" :center="true" :visible.sync="dialog.result" width="750px" :close-on-click-modal="false" :close-on-press-escape="false">
      <check-result></check-result>
    </el-dialog>

  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { MenuList } from "~/components/layer-system/check-panel/check-panel.config"
import MapViewer from '~/components/layer-viewer/map-viewer.vue'
import TaskListSelect from "~/components/layer-system/check-panel/task-list-select.vue"
import BusinessListSelect from "~/components/layer-system/check-panel/business-list-select.vue"
import CheckLayerSelect from "~/components/layer-system/check-panel/check-layer-selecte.vue"
import CheckResult from "~/components/layer-system/check-panel/check-result.vue"
import { DrawInteractPolyline } from "~/utils/cesium/interact"
import Cesium from "cesium/Cesium"

@Component({
  components: {
    TaskListSelect,
    BusinessListSelect,
    CheckLayerSelect,
    CheckResult
  }
})
export default class CheckPanel extends Vue {

  @Prop()
  private viewer!: MapViewer
  private drawLineService!: DrawInteractPolyline
  private items = MenuList

  private positions: any[] = []

  private checkItem: any = {}

  private dialog = {
    task: false,
    business: false,
    layer: false,
    result: false,
    hasResult: false
  }

  private onItemClick(item) {
    this.checkItem = item
    this.dialog.hasResult = false
    if (item.key === 'area') {
      this.drawPolygon()
    } else {
      this.dialog[item.key] = true
    }
  }

  private mounted() {
    this.drawLineService = new DrawInteractPolyline(this.viewer)
  }

  /**
   * 区域对比 绘制区域
   */
  private drawPolygon() {
    let positions: Cesium.Cartesian3[]
    this.drawLineService.start().subscribe({
      next: (data) => { positions = data.positions },
      complete: () => {
        if (!positions) {
          this.$message("请绘制区域")
          return
        }
        this.positions = positions
        this.dialog.layer = true
      }
    })
  }

  private taskSelected(data) {
    this.dialog.task = false
    this.positions = data
    this.dialog.layer = true
  }

  private businessSelected(data) {
    this.dialog.business = false
    this.dialog.layer = true
  }

  private layerSelected(layerIds: string[]) {
    this.dialog.layer = false
    // query
    this.dialog.result = true
    this.dialog.hasResult = true
  }
}
</script>

<style lang="less" scoped>
.component.check-panel {
  position: relative;
  height: 100%;
  .compute-item {
    padding-top: 20px;
    display: inline-block;
    height: 80px;
    width: 125px;
  }
  .active {
    color: #fc8144;
    background-color: #f3f3f3;
  }
  .view-result {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>