import Cesium from 'cesium/Cesium'
import { CesiumCommonService } from './common.service'
import { CesiumDrawService } from './draw.service'
import MapViewer from '@/component/layer-system/layer-viewer/map-viewer.vue'
import { Observable } from 'rxjs'
/**
 * 公共函数
 */
export class CesiumInteractService {
  private viewer: Cesium.Viewer
  private mapViewer: MapViewer
  private drawService: CesiumDrawService

  constructor(mapViewer) {
    this.mapViewer = mapViewer
    this.viewer = mapViewer.getViewer()
    this.drawService = new CesiumDrawService(this.viewer)
  }

  /**
   * 交互下绘制点
   * @param param
   */
  public startDrawPoint() {
    const event = Cesium.ScreenSpaceEventType.LEFT_CLICK
    return new Observable(observer => {
      const eventListener = this.addEventListener(event, e => {
        // 获取点击坐标点
        const cartographic = CesiumCommonService.getViewCartesianPoint(
          this.viewer,
          e.position
        )
        // 无效坐标点
        if (!cartographic) return
        // 转换位置信息
        const position = CesiumCommonService.DegressToCartesian3(
          this.viewer,
          cartographic
        )
        // 添加坐标点
        this.drawService.drawPoint(position)
        // 结束监听
        eventListener.end()
        observer.next({ cartographic, position })
        observer.complete()
      })
    })
  }

  /**
   * 交互下绘制多变形/折线
   * @param param0
   */
  public startDrawPolyline({
    closed = false,
    fillColor,
    borderColor
  }: {
    closed?: boolean
    fillColor?: Cesium.Color
    borderColor?: Cesium.Color
  } = {}) {
    const positions: Array<Cesium.Cartographic | Cesium.Cartesian3> = []
    // 绘制多边形
    this.drawService.drawPolyline(positions)
    const startEvent = Cesium.ScreenSpaceEventType.LEFT_CLICK
    const endEvent = Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    return new Observable(observer => {
      const startEventListener = this.addEventListener(startEvent, e => {
        const point = CesiumCommonService.getPosition(this.viewer, e.position)
        if (point) {
          positions.push(point)
        }
        observer.next({
          point,
          positions
        })
      })

      const endEventListener = this.addEventListener(endEvent, e => {
        startEventListener.end()
        endEventListener.end()
        observer.complete()

        if (closed) {
          this.drawService.drawPolygon(positions, {
            fillColor,
            borderColor
          })
        }
      })
    })
  }

  private addLeftClickListener(handler) {
    this.viewer.screenSpaceEventHandler.setInputAction(
      handler,
      Cesium.ScreenSpaceEventType.LEFT_CLICK
    )
  }

  private addEventListener(event: number, handler) {
    this.viewer.screenSpaceEventHandler.setInputAction(handler, event)
    return {
      end: () => {
        this.removeEventListener(event)
      }
    }
  }

  private removeEventListener(event: number) {
    this.viewer.screenSpaceEventHandler.removeInputAction(event)
  }
}
