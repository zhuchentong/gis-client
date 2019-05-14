<template>
  <section class="component business-detail-layer">
    <div v-if="!id || !dataList.length" class="no-data"></div>
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
import MapViewer from '~/components/layer-viewer/map-viewer.vue'
import { PatrolInfoService } from "~/services/patrol-info.service"
import { RequestParams } from "~/core/http"
import { Inject } from "typescript-ioc"
import { CesiumDrawService } from "~/utils/cesium/draw.service"
import Cesium from "cesium/Cesium"

@Component({
  components: {
    DataBox,
    MapViewer
  }
})
export default class extends Vue {
  @Prop()
  private id!: string


  private dataList: any[] = []

  private drawService!: CesiumDrawService
  private mapView!: MapViewer

  @Inject
  private service!: PatrolInfoService

  private onMapReady(value) {
    this.mapView = value
    this.drawService = new CesiumDrawService(this.mapView.getViewer())
    this.dataList.length && this.drawEntity()
  }


  @Watch('id', { immediate: true })
  private onIdChange(value) {
    this.dataList = []
    if (!value) return
    const requestParams = new RequestParams({ id: this.id })
    this.service.getPatrolTrack(requestParams).subscribe(
      data => {
        if (!data.length) return
        this.dataList = data.map(v => Cesium.Cartesian3.fromRadians(v.positionY, v.positionX))
        this.mapView && this.drawEntity()
      }
    )
  }

  private drawEntity() {
    const entity = this.drawService.drawPolygon(this.dataList)
    this.mapView.getViewer().zoomTo(entity)
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


