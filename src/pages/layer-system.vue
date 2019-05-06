<template>
  <section class="layer-system-page fill">
    <div class="menu-list">
      <layer-menu-list></layer-menu-list>
    </div>
    <div class="menu-panel">
      <layer-menu-panel></layer-menu-panel>
    </div>
    <div class="layer-view">
      <map-view></map-view>
    </div>
    <div class="bottom-panel"></div>
  </section>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Layout } from '@/core/decorator'
import { Cesium } from 'cesium'
import LayerMenuList from '~/components/layer-system/layer-menu-list.vue'
import LayerMenuPanel from '~/components/layer-system/layer-menu-panel.vue'
import MapView from '~/components/layer-view/map-view.vue'
@Layout('workspace')
@Component({
  components: {
    LayerMenuList,
    LayerMenuPanel,
    MapView
  }
})
export default class extends Vue {}
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
    background: yellow;
  }


  .layer-view {
    grid-area: ~'1/3/span 1/span 1';
    background: green;
  }

  .bottom-panel {
    grid-area: ~'2/1/span 1/span 3';
    background: gray;
  }
}
</style>
