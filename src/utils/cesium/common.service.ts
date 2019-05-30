import Cesium from 'cesium/Cesium'

export class CesiumCommonService {
  /**
   * DegreesToCartesian3
   * @param viewer
   * @param cartographic
   */
  public static DegreesToCartesian3(_viewer, cartographic) {
    // 海拔
    const height = _viewer.scene.globe.getHeight(cartographic)
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
    _viewer: Cesium.Viewer,
    cartographic: Cesium.Cartographic
  ) {
    return Cesium.Cartesian3.fromRadians(
      cartographic.longitude,
      cartographic.latitude,
      cartographic.height,
      _viewer.scene.globe.ellipsoid
    )
  }

  public static getViewCartesianPoint(_viewer, position) {
    // 获取投射点
    const ray = _viewer.scene.camera.getPickRay(position)
    // 获取投射点坐标
    const point = _viewer.scene.globe.pick(ray, _viewer.scene)
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
      result = viewer.scene.pickPosition(postion, result)
    } else {
      const cartographic = CesiumCommonService.getViewCartesianPoint(
        viewer,
        postion
      )
      if (cartographic) {
        result = CesiumCommonService.DegreesToCartesian3(viewer, cartographic)
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
    polygonHierarchy.positions = CesiumCommonService.coordinateToCartesian3Array(
      outLineCoord
    )
    if (hasHoles) {
      // 设置孔洞
      polygonHierarchy.holes = coordinate.slice(1).map(v => {
        return new Cesium.PolygonHierarchy(
          CesiumCommonService.coordinateToCartesian3Array(v)
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

  /**
   * 角度转笛卡尔坐标系
   * @param degrees
   */
  public static degreesToCartesian3Array(
    degrees: Array<{ longitude: number; latitude: number }>
  ) {
    return degrees.map(item => {
      return Cesium.Cartesian3.fromDegrees(item.longitude, item.latitude)
    })
  }

  /**
   * 角度转笛卡尔坐标系
   * @param degrees
   */
  public static positionToCartesian3(postion: { longitude: number; latitude: number }) {
    return Cesium.Cartesian3.fromDegrees(postion.longitude, postion.latitude)
  }

  /**
   * 弧度转笛卡尔坐标系
   * @param radians
   */
  public static radiansToCartesian3Array(
    radians: Array<{ longitude: number; latitude: number }>
  ) {
    return radians.map(item => {
      return Cesium.Cartesian3.fromRadians(item.longitude, item.latitude)
    })
  }

  /**
   * 坐标系转换 笛卡尔坐标系转经纬度坐标
   * @param position 笛卡尔坐标
   */
  public static cartesian3ToDegrees(position: Cesium.Cartesian3) {
    const cartographic = Cesium.Cartographic.fromCartesian(position)
    return {
      latitude: Cesium.Math.toDegrees(cartographic.latitude),
      longitude: Cesium.Math.toDegrees(cartographic.longitude),
      height: cartographic.height
    }
  }
}
