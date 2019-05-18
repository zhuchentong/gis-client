import { Observable } from 'rxjs'
import { CesiumCommonService } from '../common.service'
import { DrawInteract } from './draw-interact'
import Cesium from 'cesium/Cesium'
import { CesiumDrawService } from '../draw.service'

export class DrawInteractPolyline extends DrawInteract {
  private positions: Cesium.Cartesian3[] = []
  private drawService
  private closed
  private fill
  private fillColor
  private borderColor

  constructor(
    mapViewer,
    {
      closed = false,
      fill = false,
      fillColor,
      borderColor
    }: {
      closed?: boolean
      fill?: boolean | Cesium.Color
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
    this.fill = fill
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

    if (!point) {
      return
    }

    this.positions.push(point)
    this.drawService.drawPoint(point)

    if (this.positions.length === 1) {
      this.drawService.drawPolyline(this.positions)
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
    // TODO: 添加绘制状态
    this.clioseEventListener()

    if (this.closed) {
      this.drawService.drawPolyline([
        this.positions[0],
        this.positions[this.positions.length - 1]
      ])
    }

    if (this.closed && this.fill) {
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
