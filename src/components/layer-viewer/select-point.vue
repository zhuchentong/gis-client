<template>
  <section class="component select-point">
    <map-viewer @map-ready="onMapReady"></map-viewer>
    <div class="map-bottom">
      <el-button :disabled="!position" @click="startDraw">重选</el-button>
    </div>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch, Emit, Model } from 'vue-property-decorator'
import MapViewer from '~/components/layer-viewer/map-viewer.vue'
import { DrawInteractPoint } from '~/utils/cesium/interact'
import { CesiumDrawService } from '~/utils/cesium/draw.service.ts'
import Cesium from 'cesium/Cesium'

@Component({
  components: {
    MapViewer
  }
})
export default class SelectPoint extends Vue {
  private mapViewer!: MapViewer

  private drawInteractPoint!: DrawInteractPoint

  @Model('point-selected')
  private position!: Cesium.Cartographic

  @Emit('point-selected')
  private onPointSelected(position) {
    return
  }

  @Watch('position')
  private onPositionChange(value) {
    if (!value) this.startDraw()
  }

  private onMapReady(value) {
    this.$nextTick(() => {
      this.mapViewer = value
      this.drawInteractPoint = new DrawInteractPoint(this.mapViewer)
      this.startDraw()
    })
  }

  private async startDraw() {
    const { cartographic } = await this.drawInteractPoint.start().toPromise()
    this.onPointSelected(cartographic)
  }
}
</script>


<style lang="less">
.component.select-point {
  height: 500px;
  position: relative;
  .map-bottom {
    position: absolute;
    bottom: 0;
    left: 20;
    background-color: #a9a9a954;
    text-align: right;
    padding: 10px 20px;
  }
}
</style>

