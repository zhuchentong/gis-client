<template>
  <section class="layer-system-page fill">
    <div class="menu-panel">
      <layer-menu></layer-menu>
    </div>
    <div class="layer-tree-panel"></div>
    <div class="layer-view-panel">
      <map-view></map-view>
    </div>
    <div class="bottom-panel"></div>
  </section>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Layout } from '@/core/decorator'
import { Cesium } from 'cesium'
import LayerMenu from '~/components/layer-system/layer-menu.vue'
import MapView from '~/components/layer-view/map-view.vue'
@Layout('workspace')
@Component({
  components: {
    LayerMenu,
    MapView
  }
})
export default class extends Vue {}
</script>


 <style lang="less" scoped>
.layer-system-page {
  display: grid;
  grid-template-rows: 80px auto 20px;
  grid-template-columns: 200px auto;

  .menu-panel {
    grid-area: ~'1/1/span 1/span 2';
    background: red;
  }

  .layer-tree-panel {
    grid-area: ~'2/1/span 1/span 1';
    background: yellow;
  }

  .layer-view-panel {
    grid-area: ~'2/2/span 1/span 1';
    background: green;
  }

  .bottom-panel {
    grid-area: ~'3/1/span 1/span 2';
    background: gray;
  }
}
</style>
