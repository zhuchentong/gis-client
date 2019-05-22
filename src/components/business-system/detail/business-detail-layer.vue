<template>
  <section class="component business-detail-layer">
    <div v-if="!flowId || !layerInfo" class="no-data"></div>
    <div v-else class="map-container">
      <map-viewer @map-ready="onMapReady"></map-viewer>
    </div>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import MapViewer from "~/components/layer-viewer/map-viewer.vue"
import { FlowInfoService } from "~/services/flow-info.service.ts"
import { RequestParams } from "~/core/http"
import { Inject } from "typescript-ioc"
import Cesium from "cesium/Cesium"

@Component({
  components: {
    DataBox,
    MapViewer
  }
})
export default class extends Vue {
  @Prop()
  private flowId!: string
  private load = false

  private layerInfo: any = null
  private mapView!: MapViewer

  @Inject
  private service!: FlowInfoService

  @Watch('flowId', { immediate: true })
  private onIdChange(value) {
    if (this.layerInfo && this.mapView) {
      this.mapView.removeLayer(this.layerInfo)
    }
    this.layerInfo = null
    if (!value) return
    const requestParams = new RequestParams({ flowId: this.flowId })
    this.service.getLayerInfoByFlowId(requestParams).subscribe(data => {
      this.layerInfo = data
      this.mapView && this.layerInfo && this.mapView.addLayer(this.layerInfo)
    })
  }

  private onMapReady(value) {
    this.mapView = value
    if (this.layerInfo) this.mapView.addLayer(this.layerInfo)
  }
}
</script>

<style lang="less" scoped>
.component.business-detail-layer {
  .detail-item {
    padding: 20px;
    border-bottom: solid 2px #f3f3f3;
  }
  .map-container {
    height: 100%;
  }
}
</style>


