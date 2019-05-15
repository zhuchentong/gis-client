import { Observable } from 'rxjs'
import { bearingToAngle } from '@turf/turf'

export abstract class DrawInteract {
  protected observer
  protected obserable
  protected startEventListener
  protected endEventListener
  protected startEvent
  protected endEvent
  protected viewer
  protected mapViewer

  /**
   * 构造函数
   * @param mapViewer
   * @param param1
   */
  constructor(mapViewer, { start, end }: { start: number; end?: number }) {
    this.mapViewer = mapViewer
    this.viewer = mapViewer.getViewer()
    this.startEvent = start
    this.endEvent = end
  }

  /**
   * 启动绘制模式
   */
  public start() {
    this.obserable = new Observable(observer => (this.observer = observer))
    this.startEventListener = this.addEventListener(
      this.startEvent,
      this.startDraw.bind(this)
    )

    this.endEventListener =
      this.endEvent &&
      this.addEventListener(this.endEvent, this.endDraw.bind(this))

    this.mapViewer.startDrawMode(this.handleDrawToolEvent.bind(this))
    return this.obserable
  }

  /**
   * 开始绘制
   */
  public abstract startDraw(e: any)

  /**
   * 结束绘制
   */
  public abstract endDraw(e: any)

  /**
   * 重置绘制
   */
  public abstract resetDraw()

  /**
   * 关闭绘制监听
   */
  public clioseEventListener() {
    this.startEventListener.end()
    this.endEventListener && this.endEventListener.end()
  }

  /**
   * 处理绘制工具条事件
   * @param event
   */
  private handleDrawToolEvent(event) {
    switch (event) {
      case 'close':
        this.clioseEventListener()
        break
      case 'reset':
        this.resetDraw()
        break
      case 'submit':
        this.clioseEventListener()
        this.observer.complete()
        break
    }
  }

  /**
   * 添加事件监听
   * @param event
   * @param handler
   */
  private addEventListener(event: number, handler) {
    this.viewer.screenSpaceEventHandler.setInputAction(handler, event)
    return {
      end: () => {
        this.removeEventListener(event)
      }
    }
  }

  /**
   * 删除时间监听
   * @param event
   */
  private removeEventListener(event: number) {
    this.viewer.screenSpaceEventHandler.removeInputAction(event)
  }
}
