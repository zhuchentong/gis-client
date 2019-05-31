import { Observable } from 'rxjs'
import { CesiumCommonService } from '../common.service'
import { DrawInteract } from './draw-interact'
import Cesium from 'cesium/Cesium'
import { CesiumDrawService } from '../draw.service'

export class DrawInteractLine extends DrawInteract {
  private drawService: CesiumDrawService
  private positions: Cesium.Cartesian3[] = []
  private entityId = ""

  /**
   * 绘制线操作
   * @param mapViewer mapViewer 组件
   * @param clampToGround 是否贴地？ 默认开启贴地模式
   */
  constructor(mapViewer, private clampToGround?) {
    super(mapViewer, {
      start: Cesium.ScreenSpaceEventType.LEFT_CLICK
    })
    this.drawService = new CesiumDrawService(mapViewer)
    this.tipInfo = '鼠标左键第一次点击绘制起点，第二次点击绘制终点'
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
      if (isCreatePolyline) {
        const entity = this.drawService.drawPolyline(this.positions, { clampToGround: this.clampToGround })
        this.entityId = entity.id
      }
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
    if (!this.entityId) return

    //  重新绘制线，callbackproperty 不支持 地形深度遮挡填充
    const entity: Cesium.Entity = this.mapViewer.drawEntities.getById(this.entityId)
    const polyline = entity.polyline.clone()
    polyline.positions = (polyline.positions as Cesium.CallbackProperty).getValue()
    entity.polyline = polyline
  }

  /**
   * 重置绘制状态
   */
  public resetDraw() {
    this.positions = []
  }
}
