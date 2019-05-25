<template>
  <section class="component control-panel">
    <el-tabs v-model="currentPanel">
      <el-tab-pane label="二维图层" name="layer">
        <layer-control-panel :viewer="viewer"></layer-control-panel>
      </el-tab-pane>
      <el-tab-pane label="三维图层" name="tileset">
        <layer-control-tileset :viewer="viewer"></layer-control-tileset>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MapViewer from '@/components/layer-viewer/map-viewer.vue'
import LayerControlPanel from "~/components/layer-system/control-panel/layer-control-panel.vue"
import LayerControlTileset from "~/components/layer-system/control-panel/layer-control-tileset.vue"
@Component({
  components: {
    LayerControlPanel,
    LayerControlTileset
  }
})
export default class ControlPanel extends Vue {
  @Prop({ required: true })
  private viewer

  private currentPanel = "layer"
}
</script>

<style lang="less">
.component.control-panel {
  .el-tabs {
    .el-tabs__nav-wrap {
      padding-left: 20px;
    }
  }
}
</style>

