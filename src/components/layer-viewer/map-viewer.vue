<template>
  <section class="map-viewer fill">
    <div id="cesium-viewer" class="col-span no-padding fill">
      <div id="slider"></div>
    </div>
    <div
      v-if="isDrawing || drawEntitiesLength"
      class="draw-tool-bar icon-button-group"
    >
      <div class="icon-button" @click="onDrawEvent('close')" title="关闭绘制">
        <svg-icon iconColor="white" iconName="close"></svg-icon>
      </div>
      <div
        class="icon-button"
        @click="drawEntitiesLength && !isDrawComplate && onDrawEvent('reset')"
        title="重新开始"
      >
        <svg-icon
          :iconColor="drawEntitiesLength && !isDrawComplate ? 'white' : 'gray'"
          iconName="draw-chongzhi"
        ></svg-icon>
      </div>
      <div
        class="icon-button"
        @click="drawEntitiesLength && !isDrawComplate && onDrawEvent('submit')"
        title="提交绘制结果"
      >
        <svg-icon
          :iconColor="drawEntitiesLength && !isDrawComplate ? 'white' : 'gray'"
          iconName="draw-tijiao"
        ></svg-icon>
      </div>
    </div>
    <div v-if="isDrawing && drawTipInfo" class="draw-tip-panel">
      <el-card header="操作提示">{{ drawTipInfo }}</el-card>
    </div>
    <div id="credit" style="display:none"></div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import Cesium from 'cesium/Cesium'
import WMSCapabilities from 'wms-capabilities'
import appConfig from '~/config/app.config'
import { FilterService } from '~/utils/filter.service'
import { namespace } from 'vuex-class'
import cesiumNavigation from '@znemz/cesium-navigation'
import '@znemz/cesium-navigation/dist/index.css'
import Canvas2Image from 'canvas2image-es6'
import * as turf from '@turf/turf'
import { CesiumCommonService } from '~/utils/cesium/common.service'
import { LayerSpace } from '~/config/business-config'

const LayerTableModule = namespace('layerTableModule')
@Component({
  components: {}
})
export default class MapViewer extends Vue {
  // 绘制状态
  public isDrawing = false
  // 绘制数据源
  public $drawDataSource!: Cesium.CustomDataSource
  // 选择数据源
  public $pickDataSource!: Cesium.CustomDataSource
  // public $geometryDataSource!: Cesium.CustomDataSource
  // 绘制事件监听
  public drawEventListener: Array<(event: string) => void> = []

  // 主线程通知信息
  public proccessInfo = {
    position: {}
  }

  // 绘制提示信息
  private drawTipInfo = ''
  // Cesium视图
  private $viewer!: Cesium.Viewer
  // Camera视图
  private $cameraView
  // Map视图
  private $mapViewer!: MapViewer
  // geoserver服务地址
  private geoServer = appConfig.geoServer
  // 默认工作区
  private workspace = 'base-space'
  // 矢量图层列表
  private layerList: any[] = []
  // 三维图层列表
  private tilesetList: any[] = []
  // 影像图层
  private $imageProvider
  // 地形数据
  private $terrainProvider
  // 地图ID
  private mapId = 'cesium-viewer'

  private drawEntitiesLength = 0
  private isDrawComplate = false

  @LayerTableModule.Action
  private getLayerAttrData!: (query: { layer: any; cql?: string }) => void
  @LayerTableModule.Mutation
  private removeLayerAttrTable

  public get drawEntities() {
    return this.$drawDataSource.entities
  }

  public get pickEntities() {
    return this.$pickDataSource.entities
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
    return this.$viewer
  }

  /**
   * 加载图层
   */
  public addLayer(layer, cqlFilter?: string) {
    const providerLayers = `${layer.layerSpace}:${layer.layerCode}`
    if (this.layerList.findIndex(x => x.providerLayers === providerLayers) > -1) return
    const layers = this.$viewer.scene.imageryLayers
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
    this.getLayerAttrData({ layer, cql: cqlFilter })
    return provider
  }

  /**
   * 删除图层
   */
  public removeLayer(target) {
    const layer = this.getWMSLayerByLayerId(target.id)
    if (!layer) return
    const result = this.$viewer.scene.imageryLayers.remove(layer)
    this.layerList.splice(
      this.layerList.findIndex(x => x.layer.id === target.id),
      1
    )
    this.removeLayerAttrTable(target.id)
    this.emitLayerListChange(this.layerList)
    this.clearPickEntitys()
  }

  /**
   * 获取场景中制定的图层的imageryProvider
   * @param providerLayers layers value
   */
  public getWMSLayerByLayerId(id: string) {
    const layerData = this.layerList.find(x => x.layer.id === id)
    if (!layerData) return
    const providerLayers = layerData.providerLayers
    const length = this.$viewer.scene.imageryLayers.length
    for (let index = 0; index < length; index++) {
      const layer = this.$viewer.scene.imageryLayers.get(index)
      const wms = layer.imageryProvider as Cesium.WebMapServiceImageryProvider
      if (wms.layers === providerLayers) return layer
    }
    return null
  }

  /**
   * 加载3d地图
   */
  public async addTileset({ name, id, url, heightOffset }) {
    // 添加3d图层
    const tileset = this.$viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({ url })
    ) as Cesium.Cesium3DTileset

    // 调整3d图层位置
    tileset.readyPromise.then((data: any) => {
      const boundingSphere = data.boundingSphere as Cesium.BoundingSphere
      const { longitude, latitude } = Cesium.Cartographic.fromCartesian(
        boundingSphere.center
      )
      const position = Cesium.Cartesian3.fromDegrees(
        longitude,
        latitude,
        heightOffset
      )
      const mat = Cesium.Transforms.eastNorthUpToFixedFrame(position)
      const rotationX = Cesium.Matrix4.fromRotationTranslation(
        Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(0))
      )
      Cesium.Matrix4.multiply(mat, rotationX, mat)
      tileset['_root'].transform = mat
      this.$viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          longitude,
          latitude,
          heightOffset + 1000
        )
      })
    })

    // 添加到图层列表
    this.tilesetList.push({
      name,
      id,
      url,
      heightOffset,
      alpha: 1
    })
  }

  /**
   * 删除3d图层
   */
  public removeTileset(id) {
    // 查询tileset
    const tileset = this.findTileset(id)

    if (tileset) {
      this.$viewer.scene.primitives.remove(tileset)
      // !tileset.isDestroyed() && tileset.destroy()
    }

    const findIndex = this.tilesetList.findIndex(x => x.id === id)
    this.tilesetList.splice(findIndex, 1)
  }

  /**
   * 查找已经加载的tileset
   */
  public findTileset(id) {
    let tileset: Cesium.Cesium3DTileset | null = null

    const item = this.tilesetList.find(x => x.id === id)
    if (!item) return null

    for (let index = 0; index < this.$viewer.scene.primitives.length; index++) {
      const primitive = this.$viewer.scene.primitives.get(index)
      if (
        primitive instanceof Cesium.Cesium3DTileset &&
        primitive.url === item.url
      ) {
        tileset = primitive
        break
      }
    }
    return tileset
  }

  /**
   * 添加遥感影像
   */
  public addImageProvider() {
    const rectangle = new Cesium.Rectangle(
      Cesium.Math.toRadians(109.55151),
      Cesium.Math.toRadians(36.61187),
      Cesium.Math.toRadians(109.76861),
      Cesium.Math.toRadians(36.731606)
    )

    const provider = new Cesium.UrlTemplateImageryProvider({
      url: `${appConfig.mapResouce}/raster/{z}/{x}/{y}.png`,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      minimumLevel: 0,
      rectangle,
      maximumLevel: 17
    })
    this.$imageProvider = this.$viewer.imageryLayers.addImageryProvider(
      provider
    )
    this.$viewer.scene.imageryLayers.lowerToBottom(this.$imageProvider)
  }



  /**
   * 删除遥感影像
   */
  public removeImageProvider() {
    this.$viewer.scene.imageryLayers.remove(this.$imageProvider, true)
    this.$imageProvider = null
  }

  /**
   * 添加地形数据
   */
  public addTerrainProvider() {
    this.$terrainProvider = new Cesium.CesiumTerrainProvider({
      url: `${appConfig.mapResouce}/terrain`,
      requestWaterMask: true
    })
    this.$viewer.terrainProvider = this.$terrainProvider
  }

  /**
   * 删除地形数据
   */
  public removeTerrainProvider() {
    this.$viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider({})
    this.$terrainProvider = null
  }

  public addGeoJson(data) {
    const featureCollection = typeof data === 'string' ? JSON.parse(data) : data
    for (const feature of featureCollection.features) {
      feature.properties = this.formatFeatureProperties(feature.properties)
      feature.id = '属性信息'
    }

    this.$viewer.dataSources.add(
      Cesium.GeoJsonDataSource.load(featureCollection, {
        stroke: Cesium.Color.RED,
        fill: Cesium.Color.fromAlpha(Cesium.Color.LIGHTGREEN, 0.5)
      })
    )
  }

  public drawFeature(feautre: any, zoomTo = false) {
    // 清空选择区域
    this.pickEntities.removeAll()
    const dataSource = new Cesium.GeoJsonDataSource()
    dataSource.load(feautre, {
      stroke: Cesium.Color.CYAN,
      strokeWidth: 5,
      fill: Cesium.Color.DARKORANGE.withAlpha(0.1),
      clampToGround: true
    })
    while (dataSource.entities.values.length > 0) {
      const entity = dataSource.entities.values.pop()
      if (!entity) continue
      this.pickEntities.add(entity)

      if (entity.polygon) {
        // 额外添加发光边的线作为边框
        this.pickEntities.add({
          polyline: {
            positions: entity.polygon.hierarchy._value.positions,
            width: 5,
            material: new Cesium.PolylineGlowMaterialProperty({
              color: Cesium.Color.CORNFLOWERBLUE
            }),
            clampToGround: true
          }
        })
      }
    }
    zoomTo &&
      this.$viewer.zoomTo(
        this.pickEntities,
        // 航向 城市发展线向东
        // 角度 近似垂直向北
        new Cesium.HeadingPitchRange(
          Cesium.Math.toRadians(-25),
          Cesium.Math.toRadians(-80)
        )
      )
  }

  private clearPickEntitys() {
    if (this.pickEntities.values.length) {
      this.pickEntities.removeAll()
      this.$viewer.infoBox.viewModel.closeClicked.raiseEvent()
    }
  }

  /**
   * 开启绘制模式
   */
  private startDrawMode(handle: () => void, tipInfo) {
    this.isDrawing = true
    this.isDrawComplate = false
    this.clearPickEntitys()
    this.drawEventListener.push(handle)
    tipInfo && (this.drawTipInfo = tipInfo)
    return this.drawEntities
  }

  /**
   * 地图准备完成
   */
  @Emit('map-ready')
  private emitMapReady() {
    return this.$mapViewer
  }

  /**
   * 图层列表改变
   */
  @Emit('layer-list-change')
  private emitLayerListChange(layerList) {
    return
  }

  /**
   * 地图选中的物体变化
   */
  @Emit('feature-change')
  private emitFeatureChange(featureDataId: string) {
    return
  }

  // 组件创建
  private created() {
    this.$mapViewer = this
  }

  // 初始化cesium
  private mounted() {
    this.$nextTick(this.initMap)
  }

  private initMap() {
    this.$viewer = new Cesium.Viewer(this.mapId, {
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
    this.$viewer.imageryLayers.removeAll()
    // 清除背景星空
    this.$viewer.scene.skyBox.destroy()
    this.$viewer.scene.skyBox = undefined as any
    // 清除太阳
    this.$viewer.scene.sun.destroy()
    this.$viewer.scene.sun = undefined as any
    // 清除月亮
    this.$viewer.scene.moon.destroy()
    this.$viewer.scene.moon = undefined as any
    // 清除大气层
    this.$viewer.scene.skyAtmosphere.destroy()
    this.$viewer.scene.skyAtmosphere = undefined as any
    // 设置地球背景色
    this.$viewer.scene.globe.baseColor = Cesium.Color.WHITE
    this.$viewer.scene.canvas.id = 'map-viewer-cesium-canvas'

    this.$drawDataSource = new Cesium.CustomDataSource('draw')
    this.$viewer.dataSources.add(this.$drawDataSource)

    this.$pickDataSource = new Cesium.CustomDataSource('pick')
    this.$viewer.dataSources.add(this.$pickDataSource)
    // 设置摄像机视图
    this.$cameraView = this.$viewer.camera

    // 监听实体数组变化
    this.drawEntities.collectionChanged.addEventListener(() => {
      this.drawEntitiesLength = this.drawEntities.values.length
    })
    this.initCamera()

    this.emitMapReady()

    // 添加遥感影像按钮
    // const imagerys = this.addToolBar(
    //   'imagery',
    //   '遥感影像',
    //   'Widgets/Images/ImageryProviders/naturalEarthII.png',
    //   () => {
    //     // this.updateToolbarIcon('imagery')
    //     // this.$imageProvider
    //     //   ? this.removeImageProvider()
    //     //   : this.addImageProvider()
    //     // const element = document.querySelector('#imagery') as HTMLElement
    //     // if(!element) return
    //     // element.add
    //   },
    //   true
    // )
    // imagerys.appendChild()
    this.addBaseLayerPick()

    // 添加地形数据按钮
    this.addToolBar(
      'terrain',
      '地形数据',
      'Widgets/Images/TerrainProviders/CesiumWorldTerrain.png',
      () => {
        this.updateToolbarIcon('terrain')
        this.$terrainProvider
          ? this.removeTerrainProvider()
          : this.addTerrainProvider()
      },
      true
    )

    /**
     * 添加导出图像
     */
    this.addToolBar(
      'download',
      '导出图像',
      require('~/assets/images/export-layer.png'),
      () => {
        this.$viewer.render()
        const { width, height } = this.$viewer.canvas
        Canvas2Image.saveAsJPEG(
          this.$viewer.canvas,
          width,
          height,
          `image-${Date.now()}.jpg`
        )
      },
      false
    )
    this.updateToolbarIcon('download')

    this.GetGeographicBoundingBox(this.workspace).then((x: any) => {
      cesiumNavigation(this.$viewer, {
        defaultResetView: x.destination,
        enableCompass: true,
        enableZoomControls: true,
        enableDistanceLegend: true
      })
    })

    const handler = new Cesium.ScreenSpaceEventHandler(
      this.$viewer.scene.canvas
    )

    // 获取原始pick方法 并清除
    const oldAction = this.$viewer.screenSpaceEventHandler.getInputAction(
      Cesium.ScreenSpaceEventType.LEFT_CLICK
    )
    this.$viewer.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_CLICK
    )
    handler.setInputAction((e: any) => {
      if (this.isDrawing) return
      // 重新注册该方法
      oldAction(e)
      this.setPickFeature(e)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    // 当前屏幕坐标对应地理位置
    handler.setInputAction((e: any) => {
      const cartesian = CesiumCommonService.getPosition(this.$viewer, e.endPosition)
      if (!cartesian) return
      const position = CesiumCommonService.cartesian3ToDegrees(cartesian)
      this.proccessInfo.position = position
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
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
    this.$viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
      e => {
        e.cancel = true
        // 镜头位置为工作区bbox
        this.setCamera(this.workspace)
      }
    )

    this.setCamera(this.workspace, null, 'setView')
  }

  /**
   * 设置镜头位置
   */
  private setCamera(
    layerSpace,
    layerName?,
    setView: 'setView' | 'flyTo' = 'flyTo'
  ) {
    this.GetGeographicBoundingBox(layerSpace, layerName)
      .then((view: any) => {
        view && this.$viewer.camera[setView](view)
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

  private addBaseLayerPick() {
    // id="baseLayerPickerContainer"
    let container = document.querySelector(
      '.cesium-viewer-toolbar'
    ) as HTMLElement
    const element = document.createElement('div')
    element.id = "baseLayerPickerContainer"
    element.classList.add('cesium-toolbar-button')
    element.style.display = 'inline-table'
    element.title = '遥感影像'
    container.append(element)

    const imageryViewModels: Cesium.ProviderViewModel[] = []
    // 2017 遥感影像
    imageryViewModels.push(
      new Cesium.ProviderViewModel({
        name: "2017年",
        tooltip: "2017年遥感影像",
        iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/naturalEarthII.png'),
        creationFunction: () => this.createRasterImageryLayer(2017)
      })
    )
    // 2016 遥感影像
    imageryViewModels.push(
      new Cesium.ProviderViewModel({
        name: "2016年",
        tooltip: "2016年遥感影像",
        iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/naturalEarthII.png'),
        creationFunction: () => this.createRasterImageryLayer(2016)
      })
    )
    // 不加载
    imageryViewModels.push(
      new Cesium.ProviderViewModel({
        name: "关闭",
        tooltip: "关闭遥感影像",
        iconUrl: Cesium.buildModuleUrl('Widgets/Images/TerrainProviders/Ellipsoid.png'),
        creationFunction: () => this.createRasterImageryLayer('none', 0, 0)
      })
    )
    const baseLayers = new Cesium.BaseLayerPicker('baseLayerPickerContainer',
      {
        globe: this.$viewer.scene.globe,
        imageryProviderViewModels: imageryViewModels
      }
    )
    // 修改图层分组名称
    container = document.querySelector(
      ".cesium-baseLayerPicker-sectionTitle"
    ) as HTMLElement
    if (!container) return
    container.innerHTML = "遥感影像"

  }

  private createRasterImageryLayer(year, minLevel?, maxLevel?) {
    const rectangle = new Cesium.Rectangle(
      Cesium.Math.toRadians(109.55151),
      Cesium.Math.toRadians(36.61187),
      Cesium.Math.toRadians(109.76861),
      Cesium.Math.toRadians(36.731606)
    )

    const provider = new Cesium.UrlTemplateImageryProvider({
      url: `${appConfig.mapResouce}/raster/${year}/{z}/{x}/{y}.png`,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      minimumLevel: minLevel !== undefined ? minLevel : 5,
      rectangle,
      maximumLevel: maxLevel !== undefined ? maxLevel : 17
    })

    this.$imageProvider = provider
    return provider
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
          // 计算bbox中心
          const bboxPolygon = turf.bboxPolygon(layer.EX_GeographicBoundingBox)
          const {
            geometry: { coordinates }
          } = turf.centerOfMass(bboxPolygon) as any
          const [lng, lat] = coordinates
          return {
            destination: Cesium.Cartesian3.fromDegrees(lng, lat, 5000.0),
            orientation: {
              heading: 0.0,
              pitch: -Cesium.Math.PI_OVER_TWO,
              roll: 0
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
    const filterKey = ['对比图层总面积'] // '结果形状面积'
    // 字段转译
    Object.entries(properties)
      .map(([key, value]) => ({
        key,
        value,
        label: FilterService.convertShpCode(key)
      }))
      .filter(x => !filterKey.includes(x.key))
      .filter(x => /[\u4e00-\u9fa5]/.test(x.key) || x.key !== x.label)
      .forEach(x => {
        // 辅助选址，结果字段过滤
        if (x.label === '结果形状面积') {
          const value = (x.value as string) || '0'
          data[x.label] = Number.parseFloat(value).toFixed(2) + ' 平方米'
        } else {
          data[x.label] = FilterService.fieldCodeConvert(x.key, x.value)
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
    // this.geometryEntities.removeAll()
    this.drawEventListener = []
    this.drawTipInfo = ''
  }

  /**
   * 绘制工具事件监听
   */
  private onDrawEvent(event) {
    // 实现绘制事件通知
    this.drawEventListener.forEach(handle => handle(event))

    switch (event) {
      case 'close': {
        this.closeDrawMode()
        this.isDrawComplate = false
        break
      }
      case 'reset': {
        this.drawEntities.removeAll()
        break
      }
      case 'submit': {
        this.isDrawComplate = true
        break
      }
    }

    if (this.$viewer.trackedEntity) {
      this.$viewer.trackedEntity = undefined as any
    }
  }

  /**
   * 设置单击鼠标，高亮地图
   */
  private setPickFeature(e: any) {
    const windowPosition = e.position
    const pickRay = this.$viewer.camera.getPickRay(windowPosition)
    const featuresPromise = this.$viewer.imageryLayers.pickImageryLayerFeatures(
      pickRay,
      this.$viewer.scene
    )
    if (!Cesium.defined(featuresPromise)) return
    featuresPromise.then(
      (features: Cesium.ImageryLayerFeatureInfo[]) => {
        const [feature] = features
        if (feature) {
          this.drawFeature(feature.data)
          this.emitFeatureChange(feature.data.id)
        } else {
          if (this.pickEntities.values.length) {
            this.clearPickEntitys()
            this.emitFeatureChange('')
          }
        }
      },
      () => console.error('获取iamgeLayerFeatures失败')
    )
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
  .navigation-control-icon-reset {
    display: none;
  }
  .draw-tip-panel {
    .el-card__header {
      padding: 5px;
    }
    .el-card__body {
      padding: 12px;
    }
  }
}
</style>
<style lang="less" scoped>
.map-viewer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

  .cesium-viewer {
    height: 100%;
    width: 100%;
  }

  .draw-tool-bar {
    position: absolute;
    bottom: 100px;
    right: 5px;
    .icon-button {
      cursor: pointer;
      width: 24px;
      height: 24px;
      border: solid 1px dimgrey;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1px;
      border-radius: 5px;
      background-color: #4c4c4cbf;
    }
  }

  .draw-tip-panel {
    position: absolute;
    top: 10px;
    left: 10px;
    height: 200px;
    width: 200px;
  }
}
</style>
