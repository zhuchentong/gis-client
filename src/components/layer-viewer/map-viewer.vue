<template>
  <section class="map-viewer fill">
    <div
      id="cesium-viewer"
      class="col-span no-padding fill"
    >
      <div id="slider"></div>
    </div>
    <div
      id="credit"
      style="display:none"
    ></div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import Cesium from 'cesium/Cesium'
import WMSCapabilities from 'wms-capabilities'
import appConfig from '../../config/app.config'
@Component({
  components: {}
})
export default class MapViewer extends Vue {
  // 默认样式
  public defaultStyle = 'test001'
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

  // 地图ID
  private mapId = 'cesium-viewer'

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
  public addLayer(layer) {
    const layers = this.viewer.scene.imageryLayers
    const providerLayers = `${layer.layerSpace}:${layer.layerCode}`
    const provider = layers.addImageryProvider(
      this.createLayer(layer.layerSpace, providerLayers)
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
      baseLayerPicker: true,
      selectionIndicator: false,
      fullscreenButton: false,
      navigationHelpButton: false,
      geocoder: false,
      animation: false,
      timeline: false,
      imageryProviderViewModels: this.getImageViewModels(),
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

    this.initCamera()

    this.emitMapReady()
  }

  /**
   * 初始化镜头
   */
  private initCamera() {
    this.viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
      e => {
        e.cancel = true
        // 镜头位置为工作区bbox
        this.GetGeographicBoundingBox(this.workspace, '')
          .then((view: any) => {
            this.viewer.camera.flyTo(view)
          })
          .catch(ex => {
            console.log(ex)
          })
      }
    )
  }

  /**
   * 设置镜头位置
   */
  private setCamera(layerSpace, layerName) {
    this.GetGeographicBoundingBox(layerSpace, layerName)
      .then((view: any) => {
        this.viewer.camera.setView(view)
      })
      .catch(ex => {
        console.log(ex)
      })
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

  private getImageViewModels() {
    return [
      new Cesium.ProviderViewModel({
        name: '遥感影像',
        iconUrl: Cesium.buildModuleUrl(
          'Widgets/Images/ImageryProviders/naturalEarthII.png'
        ),
        tooltip:
          'Natural Earth II, darkened for contrast.\nhttp://www.naturalearthdata.com/',
        creationFunction() {
          return Cesium.createTileMapServiceImageryProvider({
            url: Cesium.buildModuleUrl(`${appConfig.mapResouce}/raster`)
          })
        }
      })
    ]
  }

  private getTerrainViewModels() {
    return [
      new Cesium.ProviderViewModel({
        name: '地形数据',
        iconUrl: 'Widgets/Images/ImageryProviders/naturalEarthII.png',
        tooltip: '加载地形数据',
        creationFunction() {
          return new Cesium.CesiumTerrainProvider({
            url: `${appConfig.mapResouce}/raster/{z}/{x}/{y}.png`,
            requestWaterMask: true
          })
        }
      })
    ]
  }

  /**
   * 创建图层
   */
  private createLayer(space, layer, style = this.defaultStyle) {
    return new Cesium.WebMapServiceImageryProvider({
      url: `${this.geoServer}/${space}/wms`,
      layers: layer,
      parameters: {
        // styles: style,   // TODO: 暂时先把样式注释掉
        width: 512,
        height: 512,
        transparent: 'true',
        format: 'image/png',
        service: 'WMS'
      }
    })
  }

  private addToolBar() {
    const targetElement = document.querySelector(
      '.cesium-viewer .cesium-button.cesium-toolbar-button'
    ) as Element
    targetElement.append()
  }
}
</script>

<style lang="less" >
.map-viewer {
  .cesium-viewer-bottom {
    display: none;
  }
  .cesium-baseLayerPicker-sectionTitle {
    display: none;
  }
}
</style>
<style lang="less" scoped>
.map-viewer {
  .cesium-viewer {
    height: 100%;
    width: 100%;
  }
}
</style>
