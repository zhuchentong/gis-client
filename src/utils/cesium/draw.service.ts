import Cesium, { Entity } from 'cesium/Cesium'
import { CesiumCommonService } from './common.service'
import MapViewer from '~/components/layer-viewer/map-viewer.vue'
/**
 * 公共函数
 */
export class CesiumDrawService {
  // Cesium视图
  private viewer: Cesium.Viewer
  private mapViewer: any
  // 颜色配置
  private readonly color = {
    label: Cesium.Color.BLACK,
    point: Cesium.Color.RED,
    outline: Cesium.Color.YELLOW,
    polygon: Cesium.Color.RED,
    polyline: Cesium.Color.RED,
    border: Cesium.Color.YELLOW,
    background: Cesium.Color.WHITE
  }
  // 构造函数
  constructor(mapViewer) {
    this.mapViewer = mapViewer
    this.viewer = mapViewer.getViewer()
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
    const heightReference =
      Cesium.Cartographic.fromCartesian(cartesian3).height > 0
        ? Cesium.HeightReference.RELATIVE_TO_GROUND
        : Cesium.HeightReference.CLAMP_TO_GROUND

    // 设置点数据信息
    entity.point = new Cesium.PointGraphics({
      heightReference,
      color: this.color.point,
      pixelSize: 6,
      outlineColor: this.color.outline,
      outlineWidth: 3
    })

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
      borderColor,
      fillColor
    }: { borderColor?: Cesium.Color; fillColor?: Cesium.Color } = {}
  ) {
    let hierarchy
    // 创建多边形实体
    if (positions instanceof Cesium.PolygonHierarchy) {
      hierarchy = positions
    } else {
      hierarchy = new Cesium.PolygonHierarchy(
        positions.map(point => {
          if (point instanceof Cesium.Cartographic) {
            return CesiumCommonService.DegressToCartesian3(this.viewer, point)
          } else {
            return point
          }
        })
      )
    }

    return this.mapViewer.drawEntities.add({
      polygon: {
        hierarchy,
        material: fillColor || this.color.polygon,
        height: 0,
        outline: true,
        outlineColor: borderColor || this.color.border
      }
    })
  }

  /**
   * 绘制折线
   * @param viewer
   * @param positions
   * @param color 线条颜色
   */
  public drawPolyline(
    positions: Array<Cesium.Cartographic | Cesium.Cartesian3>,
    clampToGround = false
  ) {
    const polylineEntity = new Entity({
      polyline: {
        width: 3,
        material: this.color.polyline,
        clampToGround // 开启贴地模式
      }
    })
    polylineEntity.polyline.positions = new Cesium.CallbackProperty(
      () =>
        positions.map(point => {
          if (point instanceof Cesium.Cartographic) {
            return CesiumCommonService.DegressToCartesian3(this.viewer, point)
          } else {
            return point
          }
        }),
      false
    )

    return this.mapViewer.drawEntities.add(polylineEntity)
  }

  /**
   * 创建标签
   * @param label
   * @param labelColor
   */
  private createLabel(label: string) {
    // 判断文字颜色是否与背景色一致，否则就换个背景色
    // let labelBackgroudColor = Cesium.Color.WHITE
    // if (labelBackgroudColor.equals(this.color.label)) {
    //   labelBackgroudColor = Cesium.Color.YELLOW
    // }
    return new Cesium.LabelGraphics({
      text: label,
      font: '20px sans-serif',
      scale: 0.8,
      fillColor: this.color.label,
      outlineWidth: 1,
      outlineColor: this.color.background,
      showBackground: true,
      backgroundColor: this.color.background.withAlpha(0.3),
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      pixelOffset: new Cesium.Cartesian2(10.0, 1.0),
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    })
  }
}
