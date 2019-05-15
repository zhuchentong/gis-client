import { Observable } from 'rxjs'
import { CesiumCommonService } from '../common.service'
import { DrawInteract } from './draw-interact'
import Cesium from 'cesium/Cesium'
import { CesiumDrawService } from '../draw.service'

export class DrawInteractPolyline extends DrawInteract {
  private positions: Cesium.Cartesian3[] = []
  private drawService
  private closed
  private fillColor
  private borderColor

  constructor(
    mapViewer,
    {
      closed = false,
      fillColor,
      borderColor
    }: {
      closed?: boolean
      fillColor?: Cesium.Color
      borderColor?: Cesium.Color
    } = {}
  ) {
    super(mapViewer, {
      start: Cesium.ScreenSpaceEventType.LEFT_CLICK,
      end: Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    })

    this.drawService = new CesiumDrawService(mapViewer)

    this.closed = closed
    this.fillColor = fillColor
    this.borderColor = borderColor
  }

  /**
   * 开始绘制
   * @param e
   */
  public startDraw(e) {
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
    this.clioseEventListener()

    if (this.closed) {
      this.drawService.drawPolygon(this.positions, {
        fillColor: this.fillColor,
        borderColor: this.borderColor
      })
    }
  }

  /**
   * 重置绘制状态
   */
  public resetDraw() {
    this.positions = []
  }
}
