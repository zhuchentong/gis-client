import * as turf from '@turf/turf'
import Cesium from 'cesium'
/**
 * 公共函数
 */
export class CesiumService {
  /**
   * 绘制多边形带孔洞
   * @param viewer
   * @param positions
   * @param color 默认颜色为红色
   * @param borderColor 边框颜色 默认宽度为1，颜色为红色
   */
  public static drawPolygon(
    viewer: Cesium.Viewer,
    positions: Cesium.PolygonHierarchy,
    color?: Cesium.Color,
    borderColor?: Cesium.Color
  ): Cesium.Entity

  /**
   * 绘制多边形 采用弧度坐标
   * @param viewer
   * @param positions
   * @param color 默认颜色为红色
   */
  public static drawPolygon(
    viewer: Cesium.Viewer,
    positions: Cesium.Cartographic[],
    color?: Cesium.Color
  ): Cesium.Entity

  public static drawPolygon(
    viewer: Cesium.Viewer,
    positions: Cesium.PolygonHierarchy | Cesium.Cartographic[],
    color = Cesium.Color.RED,
    borderColor = Cesium.Color.RED
  ) {
    let hierarchy = new Cesium.PolygonHierarchy()
    if (positions instanceof Cesium.PolygonHierarchy) {
      hierarchy = positions
    } else {
      hierarchy.positions = positions.map(p =>
        CesiumService.DegressToCartesian3(viewer, p)
      )
    }

    return viewer.entities.add({
      polygon: {
        hierarchy,
        material: color,
        height: 0,
        outline: true,
        outlineColor: borderColor
      }
    })
  }

  /**
   * 绘制折线
   * @param viewer
   * @param positions
   * @param color 线条颜色
   */
  public static drawPolyline(
    viewer: Cesium.Viewer,
    positions: Cesium.Cartographic[],
    color = Cesium.Color.RED,
    clampToGround = false
  ) {
    const polylineOption: any = {
      polyline: {
        width: 3,
        material: color,
        clampToGround // 开启贴地模式
      }
    }
    polylineOption.polyline.positions = new Cesium.CallbackProperty(
      () =>
        positions.map(cartographic =>
          CesiumService.DegressToCartesian3(viewer, cartographic)
        ),
      false
    )
    return viewer.entities.add(polylineOption)
  }

  /**
   * 绘制点数据
   * @param viewer
   * @param position 位置
   * @param label 描述文字
   * @param labelColor 文字颜色
   */
  public static drawPoint(
    viewer: Cesium.Viewer,
    cartesian3: Cesium.Cartesian3,
    label: string,
    labelColor?
  ) {
    const entity = new Cesium.Entity()
    // 实体对应的点位置
    entity.position = cartesian3

    const heightReference =
      Cesium.Cartographic.fromCartesian(cartesian3).height > 0
        ? Cesium.HeightReference.RELATIVE_TO_GROUND
        : Cesium.HeightReference.CLAMP_TO_GROUND
    // 点信息
    entity.point = new Cesium.PointGraphics({
      heightReference,
      color: Cesium.Color.RED,
      pixelSize: 6,
      outlineColor: Cesium.Color.YELLOW,
      outlineWidth: 3
    })

    if (label && label.trim() !== '') {
      // 标签信息
      entity.label = CesiumService.createLabel(label, labelColor)
    }
    return viewer.entities.add(entity)
  }

  public static drawLabel(
    viewer: Cesium.Viewer,
    cartesian3: Cesium.Cartesian3,
    label: string,
    labelColor?
  ) {
    const entity = new Cesium.Entity()
    entity.position = cartesian3
    entity.label = CesiumService.createLabel(label, labelColor)
    return viewer.entities.add(entity)
  }

  /**
   * 创建标签
   * @param label
   * @param labelColor
   */
  public static createLabel(label: string, labelColor = Cesium.Color.BLACK) {
    // 判断文字颜色是否与背景色一致，否则就换个背景色
    let labelBackgroudColor = Cesium.Color.WHITE
    if (labelBackgroudColor.equals(labelColor)) {
      labelBackgroudColor = Cesium.Color.YELLOW
    }
    return new Cesium.LabelGraphics({
      text: label,
      font: '20px sans-serif',
      scale: 0.8,
      fillColor: labelColor,
      outlineWidth: 1,
      outlineColor: labelBackgroudColor,
      showBackground: true,
      backgroundColor: labelBackgroudColor.withAlpha(0.3),
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      pixelOffset: new Cesium.Cartesian2(10.0, 1.0),
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    })
  }

  public static computeDistance(point1, point2) {
    const from = turf.point(point1)
    const to = turf.point(point2)
    return turf.distance(from, to, {
      units: 'meters'
    })
  }

  public static computeArea(positions) {
    const polygon = turf.polygon([[...positions, positions[0]]])
    return turf.area(polygon)
  }

  /**
   * DegressToCartesian3
   * @param viewer
   * @param cartographic
   */
  public static DegressToCartesian3(viewer, cartographic) {
    // 海拔
    const height = viewer.scene.globe.getHeight(cartographic)
    // 地理坐标（弧度）转经纬度坐标
    return Cesium.Cartesian3.fromDegrees(
      (cartographic.longitude / Math.PI) * 180,
      (cartographic.latitude / Math.PI) * 180,
      height
    )
  }

  /**
   * Radians to Cartesian3
   * @param viewer
   * @param cartographic
   */
  public static RadiansToCartesian3(
    viewer: Cesium.Viewer,
    cartographic: Cesium.Cartographic
  ) {
    return Cesium.Cartesian3.fromRadians(
      cartographic.longitude,
      cartographic.latitude,
      cartographic.height,
      viewer.scene.globe.ellipsoid
    )
  }

  public static getViewCartesianPoint(viewer, position) {
    // 获取投射点
    const ray = viewer.scene.camera.getPickRay(position)
    // 获取投射点坐标
    const point = viewer.scene.globe.pick(ray, viewer.scene)
    // 投射点在地球外则为空
    if (!point) return
    // 获取地理坐标
    return Cesium.Ellipsoid.WGS84.cartesianToCartographic(point)
  }

  /**
   * 获取不规则多边形重心点
   * @param mPoints
   * @return
   */
  public static getCenter(mPoints: Cesium.Cartographic[]) {
    if (mPoints.length < 3) {
      console.error('至少需要三个点才能求重心', mPoints)
      return null
    }
    let area = 0.0 // 多边形面积
    let Gx = 0.0 // 重心的x
    let Gy = 0.0 // 重心的y
    for (let i = 1; i <= mPoints.length; i++) {
      const iLat = mPoints[i % mPoints.length].latitude
      const iLng = mPoints[i % mPoints.length].longitude
      const nextLat = mPoints[i - 1].latitude
      const nextLng = mPoints[i - 1].longitude
      const temp = (iLat * nextLng - iLng * nextLat) / 2.0
      area += temp
      Gx += (temp * (iLat + nextLat)) / 3.0
      Gy += (temp * (iLng + nextLng)) / 3.0
    }
    Gx = Gx / area
    Gy = Gy / area
    return Cesium.Cartographic.fromRadians(Gy, Gx)
  }

  /**
   * 获取随机颜色
   */
  public static getRandomColor() {
    return Cesium.Color.fromRandom({ alpha: 1 })
  }

  /**
   * 获取屏幕笛卡尔3纬坐标
   * @param viewer viewer
   * @param postion windowsPostition
   */
  public static getPosition(viewer: Cesium.Viewer, postion: Cesium.Cartesian2) {
    let result: Cesium.Cartesian3 | undefined
    const feature = viewer.scene.pick(postion)
    if (feature && viewer.scene.pickPositionSupported) {
      viewer.scene.pickPosition(postion, result)
    } else {
      const cartographic = CesiumService.getViewCartesianPoint(viewer, postion)
      if (cartographic) {
        result = CesiumService.DegressToCartesian3(viewer, cartographic)
      }
    }
    return result
  }

  /**
   * 坐标数组转笛卡尔坐标集合
   * @param coordinate
   */
  public static coordinateToCartesian3Array(coordinate: any[]) {
    if (coordinate && coordinate.length) {
      const points = coordinate
        .toString()
        .split(',')
        .map(v => Number.parseFloat(v))
      return Cesium.Cartesian3.fromDegreesArray(points)
    }
    return []
  }

  /**
   * pickFeature 获取的imageLayer的data数据中多边形数据，转换成多边形的层级数据
   * @param coordinate
   */
  public static coordinateToPolygonHierarchy(coordinate: any[]) {
    const hasHoles = coordinate.length > 1
    const polygonHierarchy = new Cesium.PolygonHierarchy()
    // 如果有孔洞，就取第一组数据
    const outLineCoord = hasHoles ? coordinate[0] : coordinate
    polygonHierarchy.positions = CesiumService.coordinateToCartesian3Array(
      outLineCoord
    )
    if (hasHoles) {
      // 设置孔洞
      polygonHierarchy.holes = coordinate.slice(1).map(v => {
        return new Cesium.PolygonHierarchy(
          CesiumService.coordinateToCartesian3Array(v)
        )
      })
    }
    return polygonHierarchy
  }

  public static getDistanceStr(distance: number) {
    return distance > 1000
      ? `${(distance / 1000).toFixed(2)} km`
      : `${distance.toFixed(2)} m`
  }
}
