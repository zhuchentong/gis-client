import { Model } from '~/core/model'
import { RequestParams } from '~/core/http'
import { WebSocketMsgService } from '~/services/websocket-msg.service'
import { PageService } from '@/extension/services/page.service'
import { SortService } from '@/extension/services/sort.service'

export class WebsocketMsgModel extends Model {


  public content: string = ""
  public id: string = ""
  // messageMode = POPUP 消息未弹框消息
  public messageMode: string = ""
  public messageType: string = ""
  public msgDate: Date | string = ""
  public readStatus: string = ""
  public title: string = ""

  private webSocketMsgService = new WebSocketMsgService()
  private defaultSort = new SortService()

  constructor() {
    super()
    this.defaultSort.update('msgDate', 'desc')
  }

  /**
   * 获取已读消息列表
   * @param page 
   */
  public getReadMsgList(page: PageService) {
    return this.webSocketMsgService.getMsgList(new RequestParams({
      messageReadStatus: "READ"
    }, { page }))
  }

  /**
   * 获取未读消息列表
   * @param page 
   */
  public getUnReadMsgList(page: PageService) {
    return this.webSocketMsgService.getMsgList(new RequestParams({
      messageReadStatus: "UNREAD"
    }, { page }))
  }

  public queryMessages(page: PageService) {
    return this.webSocketMsgService.getMsgList(new RequestParams({
      messageReadStatus: this.readStatus
    }, { page, sort: this.defaultSort }))
  }

  /**
   * 获取未读消息数量
   */
  public getUnReadMsgCount() {
    return this.webSocketMsgService.getUnReadMsgCount(new RequestParams({}))
  }



  /**
   * 获取3条未读消息
   */
  public getWorkbenchReminder() {
    return this.webSocketMsgService.getWorkbenchReminder(new RequestParams({}))
  }


  /**
   * 设置消息为已读
   * @param idList 
   */
  public setRead(idList?: string[]) {
    return this.webSocketMsgService.updateMsgStatus(new RequestParams({
      ids: idList || [this.id]
    }))
  }

  /**
   * 删除消息
   * @param idList 
   */
  public delete(idList?: string[]) {
    return this.webSocketMsgService.deletedReminderMessage(new RequestParams({
      idList: idList || [this.id]
    }))
  }
}
