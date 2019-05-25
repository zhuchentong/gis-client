<template>
  <section class="component layer-control-tileset">
    <div
      v-for="(item, index) of tilesetList"
      :key="index"
      class="col layer-item text-left"
    >
      <div class="layer-title">{{ item.name }}</div>
      <div>
        <span class="setting-text">透明度</span>
        <el-input-number
          size="mini"
          v-model="item.alpha"
          :step="0.1"
          :max="1"
          :min="0"
          @change="onAlphaChange(item, $event)"
        ></el-input-number>
      </div>
    </div>
    <div
      v-if="!tilesetList.length"
      class="empty-tip row middle-span center-span"
    >
      暂无图层
    </div>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MapViewer from '@/components/layer-viewer/map-viewer.vue'
import Cesium from "cesium/Cesium"
@Component({
  components: {}
})
export default class LayerControlTileset extends Vue {
  private tilesetList: any[] = []

  @Prop()
  private viewer!: MapViewer

  private activated() {
    if (this.viewer) {
      this.tilesetList = this.viewer.getTilesetList()
    }
  }

  /**
   * 调整图层透明度
   */
  private onAlphaChange(target, value) {
    const tileset = this.viewer.findTileset(target.id)
    if (!tileset) return
    if (value === 1) {
      tileset.style = new Cesium.Cesium3DTileStyle()
      return
    } else {
      const style = new Cesium.Cesium3DTileStyle({
        color: `hsla(1,1,1,${value})`
      })
      tileset.style = style
    }
  }
}
</script>

<style lang="less" scoped>
.component.layer-control-tileset {
  height: 100%;
  .layer-item {
    padding: 5px;
    border-bottom: 1px solid gray;
    padding-bottom: 10px;
    .layer-title {
      margin: 15px 5px;
      font-weight: bold;
    }
    .setting-text {
      display: inline-block;
      width: 80px;
      text-align: center;
    }
  }
  .empty-tip {
    height: 200px;
  }
}
</style>

