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
import DataBox from '~/components/common/data-box.vue'
import MapViewer from '~/components/layer-viewer/map-viewer.vue'
import { PatrolInfoService } from '~/services/patrol-info.service'
import { RequestParams } from '~/core/http'
import { Inject } from 'typescript-ioc'
import { CesiumDrawService } from '~/utils/cesium/draw.service'
import Cesium from 'cesium/Cesium'
import { CesiumCommonService } from '~/utils/cesium/common.service'

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
  private mapViewer!: MapViewer
  private lastEntityId = ''

  @Inject
  private service!: PatrolInfoService

  private onMapReady(value) {
    this.mapViewer = value
    this.drawService = new CesiumDrawService(this.mapViewer)
    this.dataList.length && this.drawEntity()
  }

  @Watch('id', { immediate: true })
  private onIdChange(value) {
    this.dataList = []
    if (!value) return
    const requestParams = new RequestParams({ id: this.id })
    this.service.getPatrolTrack(requestParams).subscribe(data => {
      if (!data.length) return
      this.dataList = data
      this.mapViewer && this.drawEntity()
    })
  }

  private drawEntity() {
    if (this.lastEntityId) {
      this.mapViewer.drawEntities.removeById(this.lastEntityId)
    }
    const positions = this.dataList.map(v => ({ longitude: v.positionX, latitude: v.positionY }))
    const entity = this.drawService.drawPolygon(CesiumCommonService.degreesToCartesian3Array(positions))
    this.mapViewer.getViewer().zoomTo(entity)
    this.lastEntityId = entity.id
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


