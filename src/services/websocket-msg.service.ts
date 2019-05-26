import Controller from "~/config/server/websocket-msg.controller"
import { Request } from "~/core/http"
import { Observable } from 'rxjs'

export class WebSocketMsgService {


  /**
   * 获取消息列表
   * @param data 查询参数实体
   * @param page 分页参数
   * @param sort 排序参数
   */
  @Request({
    server: Controller.getMsgList
  })
  public getMsgList(requestParams): Observable<any> {
    return requestParams
      .request()
  }

  /**
   * 获取未读消息总数
   */
  @Request({
    server: Controller.getUnReadMsgCount
  })
  public getUnReadMsgCount(requestParams): Observable<any> {
    return requestParams
      .request()
  }

  /**
   * 改变消息状态
   */
  @Request({
    server: Controller.updateMsgStatus
  })
  public updateMsgStatus(requestParams): Observable<any> {
    return requestParams
      .request()
  }

  /**
   * 获取消息详情
   * @param data 消息id列表
   * @param loading 加载等待
   */
  @Request({
    server: Controller.getMsgDetail
  })
  public getMsgDetail(requestParams): Observable<any> {
    return requestParams
      .request()
  }

  /**
   * 获取最新三条未读消息
   * @param loading 加载等待
   */
  @Request({
    server: Controller.getWorkbenchReminder
  })
  public getWorkbenchReminder(requestParams): Observable<any> {
    return requestParams
      .request()
  }

  /**
   * 根据Id列表批量删除消息
   * @param data 实体
   * @param loading 加载等待
   */
  @Request({
    server: Controller.deletedReminderMessage
  })
  public deletedReminderMessage(requestParams): Observable<any> {
    return requestParams
      .request()
  }
}
