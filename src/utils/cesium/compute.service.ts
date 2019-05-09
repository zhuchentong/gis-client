import * as turf from '@turf/turf'

export class CesiumComputeService {
  /**
   * 计算距离
   */
  public static computeDistance(point1, point2) {
    const from = turf.point(point1)
    const to = turf.point(point2)
    return turf.distance(from, to, {
      units: 'meters'
    })
  }

  /**
   * 计算面积
   * @param positions
   */
  public static computeArea(positions) {
    const polygon = turf.polygon([[...positions, positions[0]]])
    return turf.area(polygon)
  }
}
