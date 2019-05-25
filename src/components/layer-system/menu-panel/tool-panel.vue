  <template>
  <section class="tool-panel">
    <el-card shadow="never">
      <div slot="header">
        <span>平面测量</span>
      </div>
      <div
        class="icon-item text-center"
        v-for="item of measureList"
        :key="item.key"
        @click="item.handle()"
      >
        <svg-icon
          iconColor="black"
          :iconName="item.icon"
          iconSize="40"
        ></svg-icon>
        <div>{{ item.label }}</div>
      </div>
    </el-card>
    <el-card shadow="never">
      <div slot="header">
        <span>视角</span>
      </div>
      <div
        class="icon-item text-center"
        v-for="item of cameraList"
        :key="item.key"
        @click="item.handle()"
      >
        <svg-icon :iconName="item.icon" iconSize="40"></svg-icon>
        <div>{{ item.label }}</div>
      </div>
    </el-card>
    <el-card shadow="never">
      <div slot="header">
        <span>三维测量</span>
      </div>
      <div
        class="icon-item text-center"
        v-for="item of measure3dList"
        :key="item.key"
        @click="item.handle()"
      >
        <svg-icon
          iconColor="black"
          :iconName="item.icon"
          iconSize="40"
        ></svg-icon>
        <div>{{ item.label }}</div>
      </div>
    </el-card>
    <el-dialog
      :close-on-click-modal="false"
      title="平整量测量"
      :visible.sync="dialog.flat"
    >
      <flat-ness ref="flat-ness"></flat-ness>
    </el-dialog>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MapViewer from '~/components/layer-viewer/map-viewer.vue'
import { DrawInteractPolyline, DrawInteractPoint, DrawInteractLine } from '~/utils/cesium/interact'
import Cesium from 'cesium/Cesium'
import { CesiumCommonService } from '~/utils/cesium/common.service'
import { CesiumDrawService } from '@/utils/cesium/draw.service'
import FlatNess from '~/components/layer-system/tool-panel/flat-ness.vue'
import * as turf from '@turf/turf'

@Component({
  components: {
    FlatNess
  }
})
export default class ToolPanel extends Vue {
  @Prop()
  private viewer!: MapViewer
  private readonly measureList = [
    {
      label: '距离测量',
      key: 'distance',
      icon: 'distance',
      handle: this.computeDistance.bind(this)
    },
    {
      label: '面积测量',
      key: 'area',
      icon: 'area',
      handle: this.computeArea.bind(this)
    }
  ]

  private readonly cameraList = [
    {
      label: '视角巡航',
      key: 'cruise',
      icon: 'camera-fly',
      handle: this.onStartCruise.bind(this)
    }
  ]

  private readonly measure3dList = [
    {
      label: '三角测量',
      key: 'height',
      icon: 'juli',
      handle: this.onHeightClick.bind(this)
    },
    {
      label: '平整量测量',
      key: 'flatness',
      icon: "flatness",
      handle: this.Flatness.bind(this)
    }
  ]
  private dialog = {
    flat: false
  }

  /**
   * 平整量测量
   */
  private Flatness() {
    this.dialog.flat = true
  }

  /**
   * 计算距离
   */
  private computeDistance() {
    const drawInteractPolyline = new DrawInteractPolyline(this.viewer)
    const drawService = new CesiumDrawService(this.viewer)
    let distanceTotal = 0
    drawInteractPolyline.start().subscribe({
      next: ({ point, positions }) => {
        if (positions.length === 1) {
          drawService.drawLabel(point, '起点')
          distanceTotal = 0
        } else {
          // 两点间距离
          const distance = Cesium.Cartesian3.distance(
            positions[positions.length - 2],
            positions[positions.length - 1]
          )
          // 中心点位置
          // const middle = Cesium.Cartesian3.midpoint(
          //   positions[positions.length - 2],
          //   positions[positions.length - 1],
          //   new Cesium.Cartesian3()
          // )
          // 总距离
          distanceTotal += distance
          // 绘制中心距离
          // drawService.drawLabel(
          //   middle,
          //   CesiumCommonService.getDistanceStr(distance)
          // )
          // 绘制总距离
          drawService.drawLabel(
            point,
            CesiumCommonService.getDistanceStr(distanceTotal)
          )
        }
      },
      complete: () => {
        distanceTotal = 0
      }
    })
  }

  /**
   * 计算面积
   */
  private async computeArea() {
    const drawInteractPolyline = new DrawInteractPolyline(this.viewer, {
      closed: true
    })
    const drawService = new CesiumDrawService(this.viewer)
    const { positions } = await drawInteractPolyline.start().toPromise()
    if (positions && positions.length >= 3) {
      // 生成点集合
      const points = positions.map(point => {
        const position = CesiumCommonService.cartesian3ToDegrees(point)
        return [position.longitude, position.latitude]
      })

      // 计算多边形
      const polygon = turf.polygon([[...points, points[0]]])
      // 获取多边形中心
      const {
        geometry: { coordinates }
      } = turf.centerOfMass(polygon) as any
      const center = Cesium.Cartesian3.fromDegrees(
        coordinates[0],
        coordinates[1]
      )
      // 绘制面积信息
      drawService.drawLabel(center, `${turf.area(polygon).toFixed(2)}平方米`)
    }
  }

  /**
   * 开启视角巡航
   */
  private async onStartCruise() {
    const drawInteractPolyline = new DrawInteractPolyline(this.viewer)
    const { positions } = await drawInteractPolyline
      .start()
      .toPromise()
      .catch()

    if (positions.length < 2) return

    const degrees = positions.map(x =>
      CesiumCommonService.cartesian3ToDegrees(x)
    )

    const [start] = degrees
    const czml = this.generateCzml(degrees)

    const _viewer = this.viewer.getViewer()

    const source = await Cesium.CzmlDataSource.load(czml)
    const entity = source.entities.getById('point')
    _viewer.trackedEntity = entity
    _viewer.dataSources.add(source)
  }

  /**
   * 生成czml
   */
  private generateCzml(degrees) {
    const [start] = degrees
    return [
      {
        id: 'document',
        name: 'CZML Point - Time Dynamic',
        version: '1.0'
      },
      {
        id: 'point',
        // TODO:设置viewFrom
        // viewFrom: {
        //   cartesian: [point.x, point.y, point.z]
        // },
        position: {
          epoch: new Date().toISOString(),
          // TODO:按距离计算时间
          cartographicDegrees: degrees
            .map((x, i) => [i * 10, x.longitude, x.latitude, x.height])
            .flat()
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
  }

  private onHeightClick() {
    // 清空之前绘制的点
    this.viewer.drawEntities.removeAll()
    this.viewer.getViewer().screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    // 接收两个坐标点的位置
    const positions: Cesium.Cartographic[] = []
    const drawService = new CesiumDrawService(this.viewer)
    const drawLine = new DrawInteractLine(this.viewer)
    drawLine.start().subscribe({
      next: (data) => {
        const graphicPoint = Cesium.Cartographic.fromCartesian(data.point)
        const heightStr = CesiumCommonService.getDistanceStr(graphicPoint.height)
        drawService.drawPoint(data.point, `海拔高度：${heightStr}`)
        positions.push(graphicPoint)
      },
      complete: () => this.analyzeHeight(positions)
    })
  }

  /**
   * 高度分析
   */
  private analyzeHeight(positions) {
    const drawService = new CesiumDrawService(this.viewer)

    // 用于鼠标移动到线条，显示距离
    const labelIdArray: string[] = []
    const [first, second] = positions
    const heightPosition = new Cesium.Cartographic(first.longitude, first.latitude, second.height)

    // 临时实体
    let entityId: string
    let text: string

    // 对应的cartesian3坐标点
    const [f, s, h] = [first, second, heightPosition].map(p => CesiumCommonService.RadiansToCartesian3(this.viewer.getViewer(), p))

    // 斜线
    const slash = this.viewer.drawEntities.values.find(x => !!x.polyline)
    if (slash) {
      // 绘制距离线条
      text = `直线距离：${CesiumCommonService.getDistanceStr(Cesium.Cartesian3.distance(f, s))}`
      slash.position = Cesium.Cartesian3.midpoint(f, s, new Cesium.Cartesian3())
      slash.label = drawService.createLabel(text, Cesium.Color.RED)
      labelIdArray.push(slash.id)
    }

    // 点的数据也隐藏
    const points = this.viewer.drawEntities.values.filter(x => !!x.point)
    labelIdArray.push(...points.map(v => v.id))


    // 绘制高度线条
    text = `高度：${CesiumCommonService.getDistanceStr(second.height - first.height)}`
    entityId = this.viewer.drawEntities.add({
      polyline: {
        positions: [f, h],
        width: 3,
        material: Cesium.Color.MEDIUMBLUE,
        depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
          color: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.MEDIUMBLUE,
          outlineWidth: 3
        })
      },
      position: Cesium.Cartesian3.midpoint(f, h, new Cesium.Cartesian3()),
      label: drawService.createLabel(text, Cesium.Color.MEDIUMBLUE)
    }).id
    labelIdArray.push(entityId)

    // 绘制水平线条
    // 水平文字
    text = `水平距离：${CesiumCommonService.getDistanceStr(Cesium.Cartesian3.distance(h, s))}`
    entityId = this.viewer.drawEntities.add({
      polyline: {
        positions: [h, s],
        width: 3,
        material: Cesium.Color.MEDIUMORCHID,
        depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
          color: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.MEDIUMORCHID,
          outlineWidth: 3
        })
      },
      position: Cesium.Cartesian3.midpoint(h, s, new Cesium.Cartesian3()),
      label: drawService.createLabel(text, Cesium.Color.MEDIUMORCHID)
    }).id
    labelIdArray.push(entityId)



    // 添加鼠标pick 线条，显示文字事件
    this.addMouseMoveEvent(labelIdArray)
  }

  private addMouseMoveEvent(labelIdArray) {
    const viewer = this.viewer.getViewer()
    viewer.screenSpaceEventHandler.setInputAction((e: any) => {
      if (!this.viewer.drawEntities.values.length) return
      labelIdArray.forEach(id => this.viewer.drawEntities.getById(id).label.show = false)
      const feature = viewer.scene.pick(e.endPosition)
      // 地图此处没有任何东西
      if (!Cesium.defined(feature)) return
      // pick的东西不是一个entity
      if (!(feature.id instanceof Cesium.Entity)) return
      if (labelIdArray.includes(feature.id.id)) {
        // 没有点的实体给他改变坐标，label跟随鼠标移动
        if (!feature.id.point) {
          feature.id.position = viewer.scene.pickPosition(e.endPosition)
        }
        feature.id.label.show = true
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
  }

}
</script>

<style lang="less" scoped>
.tool-panel {
  .icon-item {
    cursor: pointer;
    display: inline-block;
    width: 50%;
    padding-bottom: 20px;
  }
}
</style>


