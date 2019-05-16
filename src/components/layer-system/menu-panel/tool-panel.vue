  <template>
  <section class="tool-panel">
    <el-card shadow="never">
      <div slot="header">
        <span>测量</span>
      </div>
      <div class="icon-item text-center" v-for="item of measureList" :key="item.key">
        <svg-icon :iconName="item.icon" iconSize="40"></svg-icon>
        <div>{{item.label}}</div>
      </div>
    </el-card>
    <el-card shadow="never">
      <div slot="header">
        <span>视角</span>
      </div>
      <div class="icon-item text-center" v-for="item of cameraList" :key="item.key" @click="item.handle()">
        <svg-icon :iconName="item.icon" iconSize="40"></svg-icon>
        <div>{{item.label}}</div>
      </div>
    </el-card>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MapViewer from '~/components/layer-viewer/map-viewer.vue'
import { DrawInteractPolyline } from '~/utils/cesium/interact'
import Cesium from 'cesium/Cesium'
import { CesiumCommonService } from '../../../utils/cesium/common.service'
@Component({
  components: {}
})
export default class ToolPanel extends Vue {
  @Prop()
  private viewer!: MapViewer
  private readonly measureList = [
    {
      label: '距离测距',
      key: 'distance',
      icon: 'check-area'
    },
    {
      label: '面积测距',
      key: 'area',
      icon: 'check-area'
    }
  ]

  private readonly cameraList = [
    {
      label: '视角巡航',
      key: 'cruise',
      icon: 'check-area',
      handle: this.onStartCruise.bind(this)
    }
  ]

  private async onStartCruise() {
    const drawInteractPolyline = new DrawInteractPolyline(this.viewer)
    const { positions } = await drawInteractPolyline
      .start()
      .toPromise()
      .catch()

    if (positions.length >= 2) {
      const degreesList = positions.map(x =>
        CesiumCommonService.cartesian3ToDegrees(x)
      )
      const [start] = degreesList
      let cartographicDegrees: any[] = []
      degreesList.forEach((x, i) => {
        cartographicDegrees = [...cartographicDegrees, ...[i * 10, x.longitude, x.latitude, x.height]]
      })
      const viewer = this.viewer.getViewer()
      const czml = [
        {
          id: 'document',
          name: 'CZML Point - Time Dynamic',
          version: '1.0'
        },
        {
          id: 'point',
          // availability: '2012-08-04T16:00:00Z/2012-08-04T16:05:00Z',
          position: {
            epoch: new Date().toISOString(),
            cartographicDegrees
          },
          point: {
            color: {
              rgba: [255, 255, 255, 128]
            },
            outlineColor: {
              rgba: [255, 0, 0, 128]
            },
            outlineWidth: 1,
            pixelSize: 5
          }
        }
      ]

      const cameraView = {
        destination: Cesium.Cartesian3.fromDegrees(
          start.longitude,
          start.latitude,
          start.height + 5000.0
        ),
        orientation: {
          heading: 0.0,
          pitch: -Cesium.Math.PI_OVER_TWO,
          roll: 0.0
        }
      }

      viewer.scene.camera.setView(cameraView)

      const source = await Cesium.CzmlDataSource.load(czml)
      const entity = source.entities.getById('point')
      viewer.trackedEntity = entity
      viewer.dataSources.add(source)
    }
  }
}
</script>

<style lang="less" scoped>
.tool-panel {
  .icon-item {
    cursor: pointer;
    display: inline-block;
    width: 50%;
  }
}
</style>


