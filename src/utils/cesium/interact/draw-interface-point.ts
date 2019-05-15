import { Observable } from 'rxjs'
import { CesiumCommonService } from '../common.service'
import { DrawInteract } from './draw-interact'
import Cesium from 'cesium/Cesium'
import { CesiumDrawService } from '../draw.service'

export class DrawInteractPoint extends DrawInteract {
  private drawService: CesiumDrawService
  private position

  constructor(mapViewer) {
    super(mapViewer, {
      start: Cesium.ScreenSpaceEventType.LEFT_CLICK
    })

    this.drawService = new CesiumDrawService(mapViewer)
  }

  /**
   * 开始绘制
   * @param e
   */
  public startDraw(e) {
    if (this.position) {
      return
    }

    // 获取点击坐标点
    const cartographic = CesiumCommonService.getViewCartesianPoint(
      this.viewer,
      e.position
    )

    if (cartographic) {
      const degrees = {
        latitude: Cesium.Math.toDegrees(cartographic.latitude),
        longitude: Cesium.Math.toDegrees(cartographic.longitude)
      }

      const cartesian3 = CesiumCommonService.DegressToCartesian3(
        this.viewer,
        cartographic
      )

      this.position = {
        cartographic,
        cartesian3,
        degrees
      }

      // 添加坐标点
      this.drawService.drawPoint(this.position.cartesian3)
      this.observer.next(this.position)
    }
  }

  /**
   * 结束绘制
   * @param e
   */
  public endDraw(e) {
    return
  }

  /**
   * 重置绘制状态
   */
  public resetDraw() {
    this.position = null
  }
}
