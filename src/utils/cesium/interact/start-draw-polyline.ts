import { Observable } from 'rxjs'
import { CesiumCommonService } from '../common.service'

export class DrawInteract {
  private observer
  private obserable
  private startEventListener
  private endEventListener
  private startEvent
  private endEvent
  private viewer
  private mapViewer
  private positions: any[] = []
  constructor(mapViewer) {
    this.mapViewer = mapViewer
    this.viewer = mapViewer.getView()
  }

  public start() {
    this.obserable = new Observable(observer => (this.observer = observer))
    return this.obserable
  }

  /**
   * 开始绘制
   * @param callback
   */
  public startDraw(callback) {
    this.startEventListener = this.addEventListener(this.startEvent, e => {
      const point = CesiumCommonService.getPosition(this.viewer, e.position)
      if (point) {
        this.positions.push(point)
      }
      this.observer.next({
        point,
        positions: this.positions
      })
    })
  }

  public endDraw() {
    this.startEventListener.end()
    this.endEventListener.end()
  }

  public resetDraw() {
    this.startEventListener.end()
    this.endEventListener.end()
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
