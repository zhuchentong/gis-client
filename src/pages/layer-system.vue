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
      <layer-attr-table class="layer-table"></layer-attr-table>
    </div>
    <div class="bottom-panel"></div>
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
@Layout('workspace')
@Component({
  components: {
    LayerMenuList,
    LayerMenuPanel,
    MapViewer,
    LayerAttrTable
  }
})
export default class extends Vue {
  public mapViewer: MapViewer | null = null

  private onMapReady(viewer) {
    this.mapViewer = viewer
  }
}
</script>


 <style lang="less" scoped>
.layer-system-page {
  display: grid;
  grid-template-rows: auto 20px;
  grid-template-columns: 60px 250px auto;

  .menu-list {
    grid-area: ~'1/1/span 1/span 1';
    background: red;
  }

  .menu-panel {
    grid-area: ~'1/2/span 1/span 1';
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
