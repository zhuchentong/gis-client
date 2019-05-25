<template>
  <section class="layer-system-page fill">
    <div class="menu-list">
      <layer-menu-list></layer-menu-list>
    </div>
    <div class="menu-panel">
      <layer-menu-panel :viewer="mapViewer"></layer-menu-panel>
    </div>
    <div class="layer-view">
      <map-viewer @map-ready="onMapReady"></map-viewer>
      <layer-attr-table
        :viewer="mapViewer"
        @feature-change="val => (featureId = val)"
        :featureId="featureId"
        class="layer-table"
      ></layer-attr-table>
    </div>
    <div class="bottom-panel">
      <!-- <div class="proccess" v-if="proccess.value && proccess.value < 100"> -->
      <div class="row end-span" v-if="proccess.value && proccess.value < 100">
        <span>{{ proccess.name }}</span>
        <el-progress
          style="width:300px;padding-right:50px"
          :percentage="proccess.value"
        ></el-progress>
      </div>
    </div>
  </section>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Layout } from '@/core/decorator'
import Cesium from 'cesium/Cesium'
import { namespace } from 'vuex-class'
import LayerMenuList from '~/components/layer-system/layer-menu-list.vue'
import LayerMenuPanel from '~/components/layer-system/layer-menu-panel.vue'
import LayerAttrTable from '~/components/layer-system/layer-attr-table.vue'
import MapViewer from '~/components/layer-viewer/map-viewer.vue'
import { TempLayers } from '~/models/temp-layers.model.ts'
@Layout('workspace')
@Component({
  components: {
    LayerMenuList,
    LayerMenuPanel,
    MapViewer,
    LayerAttrTable
  }
})
export default class LayerSystem extends Vue {
  public mapViewer: MapViewer | null = null
  private featureId = ""

  private onMapReady(viewer) {
    this.mapViewer = viewer
  }

  private get proccess() {
    if (!this.mapViewer) return {}
    return this.mapViewer.proccess
  }

  private mounted() {
    // 系统打开时，删除本机查看过的所有的临时
    const tempLayers = new TempLayers()
    tempLayers.deleteAll()
  }
}
</script>


 <style lang="less" scoped>
.layer-system-page {
  display: grid;
  grid-template-rows: auto 20px;
  grid-template-columns: 60px 240px auto;

  .menu-list {
    grid-area: ~'1/1/span 1/span 1';
    background: red;
  }

  .menu-panel {
    grid-area: ~'1/2/span 1/span 1';
    position: absolute;
    left: 60px;
    top: 0;
    bottom: 20px;
    width: 240px;
    overflow: auto;
  }

  .layer-view {
    grid-area: ~'1/3/span 1/span 1';
    position: relative;
    background: black;
    .layer-table {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }

  .bottom-panel {
    grid-area: ~'2/1/span 1/span 3';
    background: gray;
  }
}
</style>
