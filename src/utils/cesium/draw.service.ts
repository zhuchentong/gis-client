import Cesium, { Entity, HeightReference } from 'cesium/Cesium'
import { CesiumCommonService } from './common.service'
import MapViewer from '~/components/layer-viewer/map-viewer.vue'
/**
 * 公共函数
 */
export class CesiumDrawService {
  // Cesium视图
  private $viewer: Cesium.Viewer
  private mapViewer: any
  // 颜色配置
  private readonly color = {
    label: Cesium.Color.BLACK,
    point: Cesium.Color.RED,
    outline: Cesium.Color.YELLOW,
    polygon: Cesium.Color.PINK.withAlpha(0.3),
    polyline: Cesium.Color.RED,
    border: Cesium.Color.YELLOW,
    background: Cesium.Color.WHITE
  }
  // 构造函数
  constructor(mapViewer) {
    this.mapViewer = mapViewer
    this.$viewer = mapViewer.getViewer()
  }

  /**
   * 绘制文字
   * @param cartesian3
   * @param label
   * @param labelColor
   */
  public drawLabel(cartesian3: Cesium.Cartesian3, label: string) {
    const entity = new Cesium.Entity()
    entity.position = cartesian3
    entity.label = this.createLabel(label)
    return this.mapViewer.drawEntities.add(entity)
  }

  /**
   * 绘制点数据
   * @param cartesian3
   * @param label
   * @param labelColor
   */
  public drawPoint(cartesian3: Cesium.Cartesian3, label?: string) {
    // 建立实体
    const entity = new Cesium.Entity()

    // 设置实体坐标
    entity.position = cartesian3

    // 设置实体高度
    // TODO:测试空间绘点
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian3)
    const terrainHeight = this.$viewer.scene.globe.getHeight(cartographic)

    const heightReference = terrainHeight > 0
      ? Cesium.HeightReference.CLAMP_TO_GROUND
      : Cesium.HeightReference.RELATIVE_TO_GROUND
    // 设置点数据信息
    entity.point = this.createPoint(heightReference)

    // 设置文字内容
    if (label && label.trim()) {
      entity.label = this.createLabel(label)
    }

    return this.mapViewer.drawEntities.add(entity) as Cesium.Entity
  }

  /**
   * 绘制多边形
   * @param positions
   */
  public drawPolygon(
    positions:
      | Cesium.PolygonHierarchy
      | Array<Cesium.Cartographic | Cesium.Cartesian3>,
    {
      fillColor,
      borderColor,
      clampToGround = true
    }: {
      borderColor?: Cesium.Color,
      fillColor?: Cesium.Color,
      clampToGround?: boolean
    } = {}
  ) {
    let hierarchy
    // 创建多边形实体
    if (positions instanceof Cesium.PolygonHierarchy) {
      hierarchy = positions
    } else {
      hierarchy = new Cesium.PolygonHierarchy(
        positions.map(point => {
          if (point instanceof Cesium.Cartographic) {
            return CesiumCommonService.DegreesToCartesian3(this.$viewer, point)
          } else {
            return point
          }
        })
      )
    }

    return this.mapViewer.drawEntities.add(
      new Cesium.Entity({
        polygon: {
          hierarchy,
          perPositionHeight: !clampToGround,
          material: fillColor || this.color.polygon,
          outline: !clampToGround,
          outlineColor: borderColor || this.color.border
        }
      })
    )
  }

  /**
   * 绘制折线
   * @param $viewer
   * @param positions
   * @param color 线条颜色
   */
  public drawPolyline(
    positions: Array<Cesium.Cartographic | Cesium.Cartesian3>,
    {
      finish = false,
      clampToGround = true,
      color = this.color.polyline
    } = {}
  ) {
    // 折线实体
    const polylineEntity = new Entity({
      polyline: {
        width: 3,
        material: color,
        arcType: clampToGround ? Cesium.ArcType.GEODESIC : Cesium.ArcType.NONE,
        clampToGround, // 开启贴地模式
        depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
          color,
          outlineColor: color.withAlpha(0.5),
          outlineWidth: 3
        })
      }
    })

    const getPositions = () => {
      return positions.map(point => {
        if (point instanceof Cesium.Cartographic) {
          return CesiumCommonService.DegreesToCartesian3(this.$viewer, point)
        } else {
          return point
        }
      })
    }

    if (finish) {
      polylineEntity.polyline.positions = getPositions()
    } else {
      // 折线位置
      polylineEntity.polyline.positions = new Cesium.CallbackProperty(getPositions, false)
    }

    return this.mapViewer.drawEntities.add(polylineEntity)
  }

  /**
   * 创建标签
   * @param label
   * @param labelColor
   */
  public createLabel(label: string, color?) {
    // 判断文字颜色是否与背景色一致，否则就换个背景色
    // let labelBackgroudColor = Cesium.Color.WHITE
    // if (labelBackgroudColor.equals(this.color.label)) {
    //   labelBackgroudColor = Cesium.Color.YELLOW
    // }
    return new Cesium.LabelGraphics({
      text: label,
      font: '32px system-ui',
      scale: 0.5,
      fillColor: color || this.color.label,
      outlineWidth: 1,
      outlineColor: this.color.background,
      showBackground: true,
      backgroundColor: this.color.background.withAlpha(0.3),
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      pixelOffset: new Cesium.Cartesian2(10.0, 1.0),
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    })
  }

  /**
   * 创建一个point
   * @param color 点的内部颜色
   * @param outlineColor 点的外边框颜色
   */
  public createPoint(heightReference?, color?, outlineColor?) {
    return new Cesium.PointGraphics({
      heightReference: heightReference || Cesium.HeightReference.CLAMP_TO_GROUND,
      color: color || this.color.point,
      pixelSize: 6,
      outlineColor: outlineColor || this.color.outline,
      outlineWidth: 3
    })
  }
}
