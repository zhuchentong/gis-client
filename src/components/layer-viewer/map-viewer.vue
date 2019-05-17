<template>
  <section class="map-viewer fill">
    <div id="cesium-viewer" class="col-span no-padding fill">
      <div id="slider"></div>
    </div>
    <div v-if="isDrawing||drawEntitiesLength" class="draw-tool-bar icon-button-group">
      <div class="icon-button" @click="onDrawEvent('close')">
        <svg-icon iconColor="white" iconName="close"></svg-icon>
      </div>
      <div class="icon-button" @click="isDrawing&&onDrawEvent('reset')">
        <svg-icon :iconColor="isDrawing?'white':'gray'" iconName="reset"></svg-icon>
      </div>
      <div class="icon-button" @click="isDrawing&&onDrawEvent('submit')">
        <svg-icon :iconColor="isDrawing?'white':'gray'" iconName="right"></svg-icon>
      </div>
    </div>
    <div v-if="isDrawing&&drawTipInfo" class="draw-tip-panel">{{drawTipInfo}}</div>
    <div id="credit" style="display:none"></div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import Cesium, { CesiumTerrainProvider } from 'cesium/Cesium'
import WMSCapabilities from 'wms-capabilities'
import appConfig from '../../config/app.config'
import { FilterService } from '../../utils/filter.service'
import { namespace } from 'vuex-class'
const LayerTableModule = namespace('layerTableModule')
@Component({
  components: {}
})
export default class MapViewer extends Vue {
  // 绘制状态
  public isDrawing = false
  // 绘制数据源
  public drawDataSource = new Cesium.CustomDataSource('draw')
  // 绘制事件监听
  public drawEventListener: Array<(event: string) => void> = []
  // 绘制提示信息
  private drawTipInfo = ''
  // Cesium视图
  private viewer!: Cesium.Viewer
  // Camera视图
  private cameraView
  // Map视图
  private mapViewer!: MapViewer
  // geoserver服务地址
  private geoServer = appConfig.geoServer
  // 默认工作区
  private workspace = 'base-space'
  // 矢量图层列表
  private layerList: any[] = []
  // 三维图层列表
  private tilesetList: any[] = []
  // 影像图层
  private imageProvider
  // 地形数据
  private terrainProvider
  // 地图ID
  private mapId = 'cesium-viewer'

  private drawEntitiesLength = 0

  @LayerTableModule.Action
  private getLayerAttrData
  @LayerTableModule.Mutation
  private removeLayerAttrTable

  public get drawEntities() {
    return this.drawDataSource.entities
  }

  public getLayerList() {
    return this.layerList
  }

  /**
   * 获取当前3d层列表
   */
  public getTilesetList() {
    return this.tilesetList
  }

  /**
   * 获取视图
   */
  public getViewer() {
    return this.viewer
  }

  /**
   * 加载图层
   */
  public addLayer(layer, cqlFilter?: string) {
    const layers = this.viewer.scene.imageryLayers
    const providerLayers = `${layer.layerSpace}:${layer.layerCode}`
    const provider = layers.addImageryProvider(
      this.createLayer(layer.layerSpace, providerLayers, cqlFilter)
    )
    this.layerList.unshift({
      layer,
      providerLayers,
      option: {
        alpha: provider.alpha
      }
    })

    this.setCamera(layer.layerSpace, layer.layerCode)
    this.emitLayerListChange(this.layerList)
    this.getLayerAttrData(layer)
    return provider
  }

  /**
   * 删除图层
   */
  public removeLayer(target) {
    const layer = this.getWMSLayerByLayerId(target.id)
    if (!layer) return
    this.viewer.scene.imageryLayers.remove(layer)
    this.layerList.splice(
      this.layerList.findIndex(x => x.layer.id === target.id),
      1
    )
    this.removeLayerAttrTable(target.id)
    this.emitLayerListChange(this.layerList)
  }

  /**
   * 获取场景中制定的图层的imageryProvider
   * @param providerLayers layers value
   */
  public getWMSLayerByLayerId(id: string) {
    const layerData = this.layerList.find(x => x.layer.id === id)
    if (!layerData) return
    const providerLayers = layerData.providerLayers
    const length = this.viewer.scene.imageryLayers.length
    for (let index = 0; index < length; index++) {
      const layer = this.viewer.scene.imageryLayers.get(index)
      const wms = layer.imageryProvider as Cesium.WebMapServiceImageryProvider
      if (wms.layers === providerLayers) return layer
    }
    return null
  }

  /**
   * 加载3d地图
   */
  public async addTileset({ id, url, heightOffset }) {
    // 添加3d图层
    const tileset = this.viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url
        // maximumScreenSpaceError: 10, //最大的屏幕空间误差
        // maximumNumberOfLoadedTiles: 1000 //最大加载瓦片个数
      })
    )
    // 调整3d图层位置
    tileset.allTilesLoaded.addEventListener(() => {
      const boundingSphere = tileset.boundingSphere
      const cartographic = Cesium.Cartographic.fromCartesian(
        boundingSphere.center
      )
      const surface = Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        0.0
      )
      const offset = Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        parseFloat(heightOffset)
      )
      const translation = Cesium.Cartesian3.subtract(
        offset,
        surface,
        new Cesium.Cartesian3()
      )
      tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
    })

    // 调整视角
    await this.viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0, -0.5, 0))

    // 添加到图层列表
    this.tilesetList.push({
      id,
      url,
      heightOffset
    })
  }

  /**
   * 删除3d图层
   */
  public removeTileset(id) {
    // 查询tileset
    const item = this.tilesetList.find(x => x.id === id)
    if (!item) return

    for (let index = 0; index < this.viewer.scene.primitives.length; index++) {
      const primitive = this.viewer.scene.primitives.get(index)

      if (
        primitive instanceof Cesium.Cesium3DTileset &&
        primitive.url === item.url
      ) {
        this.viewer.scene.primitives.remove(primitive)
        break
      }
    }

    this.tilesetList = this.tilesetList.filter(x => x.id !== id)
  }

  /**
   * 添加遥感影像
   */
  public addImageProvider() {
    const rectangle = new Cesium.Rectangle(
      Cesium.Math.toRadians(109.55151),
      Cesium.Math.toRadians(36.611866),
      Cesium.Math.toRadians(109.76861),
      Cesium.Math.toRadians(36.73161)
    )

    const provider = new Cesium.UrlTemplateImageryProvider({
      url: `${appConfig.mapResouce}/raster/{z}/{x}/{y}.png`,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      minimumLevel: 0,
      rectangle,
      maximumLevel: 17
    })
    this.imageProvider = this.viewer.imageryLayers.addImageryProvider(provider)
    this.viewer.scene.imageryLayers.lowerToBottom(this.imageProvider)
  }

  /**
   * 删除遥感影像
   */
  public removeImageProvider() {
    this.viewer.scene.imageryLayers.remove(this.imageProvider, true)
    this.imageProvider = null
  }

  /**
   * 添加地形数据
   */
  public addTerrainProvider() {
    this.terrainProvider = new Cesium.CesiumTerrainProvider({
      url: `${appConfig.mapResouce}/terrain`
    })
    this.viewer.terrainProvider = this.terrainProvider
  }

  /**
   * 删除地形数据
   */
  public removeTerrainProvider() {
    this.viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider({})
    this.terrainProvider = null
  }

  /**
   * 开启绘制模式
   */
  private startDrawMode(handle: () => void, tipInfo) {
    this.isDrawing = true
    this.drawEntities.removeAll()
    this.drawEventListener.push(handle)
    this.drawTipInfo = tipInfo
    return this.drawEntities
  }

  /**
   * 地图准备完成
   */
  @Emit('map-ready')
  private emitMapReady() {
    return this.mapViewer
  }

  /**
   * 图层列表改变
   */
  @Emit('layer-list-change')
  private emitLayerListChange(layerList) {
    return
  }

  // 组件创建
  private created() {
    this.mapViewer = this
  }

  // 初始化cesium
  private mounted() {
    this.$nextTick(this.initMap)
  }

  private initMap() {
    this.viewer = new Cesium.Viewer(this.mapId, {
      sceneModePicker: false,
      sceneMode: Cesium.SceneMode.SCENE3D,
      baseLayerPicker: false,
      selectionIndicator: false,
      fullscreenButton: false,
      navigationHelpButton: false,
      geocoder: false,
      shouldAnimate: true,
      animation: false,
      timeline: false,
      // imageryProviderViewModels: this.getImageViewModels(),
      // terrainProviderViewModels: this.getTerrainViewModels(),
      creditContainer: 'credit'
    })
    // 清除默认图层
    this.viewer.imageryLayers.removeAll()
    // 清除背景星空
    this.viewer.scene.skyBox.destroy()
    this.viewer.scene.skyBox = undefined as any
    // 清除太阳
    this.viewer.scene.sun.destroy()
    this.viewer.scene.sun = undefined as any
    // 清除月亮
    this.viewer.scene.moon.destroy()
    this.viewer.scene.moon = undefined as any
    // 清除大气层
    this.viewer.scene.skyAtmosphere.destroy()
    this.viewer.scene.skyAtmosphere = undefined as any
    // 设置地球背景色
    this.viewer.scene.globe.baseColor = Cesium.Color.WHITE

    this.viewer.dataSources.add(this.drawDataSource)
    this.cameraView = this.viewer.camera
    // 监听实体数组变化
    this.drawEntities.collectionChanged.addEventListener(() => {
      this.drawEntitiesLength = this.drawEntities.values.length
    })
    this.initCamera()

    this.emitMapReady()

    // 添加遥感影像按钮
    this.addToolBar(
      'imagery',
      '遥感影像',
      'Widgets/Images/ImageryProviders/naturalEarthII.png',
      () => {
        this.updateToolbarIcon('imagery')
        this.imageProvider
          ? this.removeImageProvider()
          : this.addImageProvider()
      },
      true
    )

    // 添加地形数据按钮
    this.addToolBar(
      'terrain',
      '地形数据',
      'Widgets/Images/TerrainProviders/CesiumWorldTerrain.png',
      () => {
        this.updateToolbarIcon('terrain')
        this.terrainProvider
          ? this.removeTerrainProvider()
          : this.addTerrainProvider()
      },
      true
    )
  }

  private updateToolbarIcon(id) {
    const element = document.querySelector(`#${id} img`) as HTMLElement
    if (element) {
      element.classList.toggle('close')
    }
  }

  /**
   * 初始化镜头
   */
  private initCamera() {
    this.viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
      e => {
        e.cancel = true
        // 镜头位置为工作区bbox
        this.setCamera(this.workspace)
      }
    )

    this.setCamera(this.workspace)
  }

  /**
   * 设置镜头位置
   */
  private setCamera(layerSpace, layerName?) {
    this.GetGeographicBoundingBox(layerSpace, layerName)
      .then((view: any) => {
        this.viewer.camera.flyTo(view)
      })
      .catch(ex => {
        console.log(ex)
      })
  }

  private addToolBar(id, title, image, handle, open?) {
    const container = document.querySelector(
      '.cesium-viewer-toolbar'
    ) as HTMLElement
    const element = document.createElement('button')
    element.id = id
    element.classList.add('cesium-button')
    element.classList.add('cesium-toolbar-button')
    element.title = title
    element.onclick = () => handle(element)
    const img = new Image()
    img.src = image
    img.width = 28
    img.height = 28
    open || img.classList.add('close')
    open && handle(element)

    element.append(img)
    container.append(element)

    return element
  }

  /**
   * 获取wms服务信息
   */
  private async GetCapabilities(layerSpace) {
    return fetch(
      `${
      this.geoServer
      }/${layerSpace}/wms?service=wms&version=1.3.0&request=GetCapabilities`
    ).then(async data => {
      return new WMSCapabilities(await data.text()).toJSON()
    })
  }

  /**
   * 获取经纬度范围
   * 通过GetCapabilities
   */
  private async GetGeographicBoundingBox(layerSpace, layerName?) {
    return this.GetCapabilities(layerSpace)
      .then(({ Capability }) => {
        const layer = layerName
          ? Capability.Layer.Layer.find(x => x.Name === layerName)
          : Capability.Layer

        if (layer) {
          const EX_GeographicBoundingBox = layer.EX_GeographicBoundingBox
          const [west, south, east, north] = EX_GeographicBoundingBox
          return {
            destination: Cesium.Rectangle.fromDegrees(west, south, east, north),
            orientation: {
              heading: 0.0,
              pitch: -Cesium.Math.PI_OVER_TWO,
              roll: 0.0
            }
          }
        }
      })
      .catch(ex => {
        console.log(ex)
      })
  }

  /**
   * 创建图层
   */
  private createLayer(space, layer, cqlFilter?: string) {

    const parameters: any = {
      width: 512,
      height: 512,
      transparent: 'true',
      format: 'image/png',
      service: 'WMS'
    }
    if (cqlFilter) parameters.cql_filter = cqlFilter

    return new Cesium.WebMapServiceImageryProvider({
      url: `${this.geoServer}/${space}/wms`,
      layers: layer,
      parameters,
      getFeatureInfoFormats: [
        new Cesium.GetFeatureInfoFormat(
          'json',
          'application/json',
          this.geoJsonToFeatureInfo
        )
      ]
    })
  }

  /**
   * 格式化Featrue信息
   */
  private geoJsonToFeatureInfo(json) {
    const result: Cesium.ImageryLayerFeatureInfo[] = []

    const features = json.features

    for (const feature of features) {
      const featureInfo = new Cesium.ImageryLayerFeatureInfo()
      const properties = this.formatFeatureProperties(feature.properties)
      featureInfo.data = feature
      featureInfo.name = '属性信息'
      featureInfo.properties = feature.properties
      featureInfo.configureNameFromProperties(properties)
      featureInfo.configureDescriptionFromProperties(properties)

      if (
        Cesium.defined(feature.geometry) &&
        feature.geometry.type === 'Point'
      ) {
        const [longitude, latitude] = feature.geometry.coordinates
        featureInfo.position = Cesium.Cartographic.fromDegrees(
          longitude,
          latitude
        )
      }

      result.push(featureInfo)
    }

    return result
  }

  private formatFeatureProperties(properties) {
    const data = {}
    // 不需要转译的过滤字段
    const filterKey = ['fid', 'OBJECTID', 'Shape_Leng', 'Shape_Area']
    Object.entries(properties).forEach(([key, value]) => {
      key = FilterService.convertShpCode(key)
      if (!filterKey.includes(key)) {
        data[key] = value
      }
    })
    return data
  }

  /**
   * 关闭绘制模式
   */
  private closeDrawMode() {
    this.isDrawing = false
    this.drawEntities.removeAll()
    this.drawEventListener = []
    this.drawTipInfo = ''
  }

  /**
   * 绘制工具事件监听
   */
  private onDrawEvent(event) {
    switch (event) {
      case 'close': {
        this.closeDrawMode()
        break
      }
      case 'reset': {
        this.drawEntities.removeAll()
        break
      }
      case 'sumbit': {
        this.closeDrawMode()
        break
      }
    }
    if (this.viewer.trackedEntity) {
      this.viewer.trackedEntity = (undefined as any)
    }
    this.drawEventListener.forEach(handle => handle(event))
  }
}
</script>

<style lang="less" >
.map-viewer {
  .cesium-viewer-bottom {
    display: none;
  }
  .cesium-viewer-toolbar {
    img.close {
      -webkit-filter: grayscale(100%);
      -moz-filter: grayscale(100%);
      -ms-filter: grayscale(100%);
      -o-filter: grayscale(100%);
      filter: grayscale(100%);
      filter: gray;
    }
  }
}
</style>
<style lang="less" scoped>
.map-viewer {
  position: relative;
  .cesium-viewer {
    height: 100%;
    width: 100%;
  }

  .draw-tool-bar {
    position: absolute;
    bottom: 50px;
    right: 5px;
    .icon-button {
      cursor: pointer;
      width: 24px;
      height: 24px;
      border: solid 1px white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .draw-tip-panel {
    position: absolute;
    top: 100px;
    left: 5px;
    width: 100px;
    height: 80px;
  }
}
</style>
