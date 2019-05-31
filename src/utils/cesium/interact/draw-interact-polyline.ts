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
  private clampToGround
  private polylineId = ""

  constructor(
    mapViewer,
    {
      closed = false,
      fill = false,
      fillColor,
      borderColor,
      clampToGround = true
    }: {
      closed?: boolean,
      fill?: boolean,
      fillColor?: Cesium.Color,
      borderColor?: Cesium.Color,
      clampToGround?: boolean
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
    this.clampToGround = clampToGround
    this.tipInfo = "鼠标左键点击绘制转折点，左键双击结束绘制"
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
      const entity = this.drawService.drawPolyline(this.positions, { clampToGround: this.clampToGround })
      this.polylineId = entity.id
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
  public endDraw() {
    this.clioseEventListener()

    if (!this.polylineId) return

    //  重新绘制线，callbackproperty 不支持 地形深度遮挡填充
    const entity: Cesium.Entity = this.mapViewer.drawEntities.getById(this.polylineId)
    const polyline = entity.polyline.clone()
    const linePositions: Cesium.Cartesian3[] = (polyline.positions as Cesium.CallbackProperty).getValue()
    if (this.closed) linePositions.push(this.positions[0])
    polyline.positions = linePositions
    entity.polyline = polyline

    if (this.closed && this.fill) {
      this.drawService.drawPolygon(this.positions, {
        fillColor: this.fillColor,
        clampToGround: this.clampToGround,
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
