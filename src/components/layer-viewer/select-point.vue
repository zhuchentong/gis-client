<template>
  <section class="component select-point">
    <map-viewer @map-ready="onMapReady"></map-viewer>
    <div class="map-bottom">
      <el-button :disabled="!position" @click="startSelecte">重选</el-button>
      <el-button :disabled="!position" @click="onSubmit">提交</el-button>
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
    if (!value) this.startSelecte()
  }

  @Emit('submit')
  private onSubmit() {
    return
  }

  private onMapReady(value) {
    this.mapViewer = value
    this.drawInteractPoint = new DrawInteractPoint(this.mapViewer)

    this.drawInteractPoint.start().subscribe((data: any) => {
      this.onPointSelected(data.cartographic)
    })

    if (this.position) {
      const cartesian = this.mapViewer
        .getViewer()
        .scene.globe.ellipsoid.cartographicToCartesian(this.position)
      const drawService = new CesiumDrawService(this.mapViewer)
      drawService.drawPoint(cartesian)
    }
  }

  private startSelecte() {
    if (this.mapViewer) {
      this.mapViewer.getViewer().entities.removeAll()
      this.onPointSelected(null)
      this.drawInteractPoint.start().subscribe((data: any) => {
        this.onPointSelected(data.cartographic)
      })
    }
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
    right: 0;
    background-color: #a9a9a954;
    text-align: right;
    padding: 10px 20px;
    border-radius: 10px;
  }
}
</style>

