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
    // 无效坐标点
    if (!cartographic) return
    // 转换位置信息
    this.position = CesiumCommonService.DegressToCartesian3(
      this.viewer,
      cartographic
    )
    // 添加坐标点
    this.drawService.drawPoint(this.position)
    this.observer.next({ cartographic, position: this.position })
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
