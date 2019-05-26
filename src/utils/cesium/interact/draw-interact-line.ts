import { Observable } from 'rxjs'
import { CesiumCommonService } from '../common.service'
import { DrawInteract } from './draw-interact'
import Cesium from 'cesium/Cesium'
import { CesiumDrawService } from '../draw.service'

export class DrawInteractLine extends DrawInteract {
  private drawService: CesiumDrawService
  private positions: Cesium.Cartesian3[] = []
  private readonly tipInfo = ''
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
    if (this.positions.length >= 2) {
      return
    }

    // 获取当前点
    const point = CesiumCommonService.getPosition(this.viewer, e.position)

    // 添加坐标点
    if (point) {
      const isCreatePolyline = this.positions.length === 0
      this.positions.push(point)
      isCreatePolyline && this.drawService.drawPolyline(this.positions)
    }

    // 通知坐标更新
    this.observer.next({
      point,
      positions: this.positions
    })
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
    this.positions = []
  }
}
