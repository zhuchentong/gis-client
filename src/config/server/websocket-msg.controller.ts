import { RequestMethod } from '~/core/http'

const CONTROLLER = 'webSocketMsgController'

export default {
  /**
   * 获取消息列表
   */
  getMsgList: {
    controller: CONTROLLER,
    action: 'getMsgList',
    type: RequestMethod.Get
  },
  /**
   * 获取未读消息总数
   */
  getUnReadMsgCount: {
    controller: CONTROLLER,
    action: 'getUnReadMsgCount ',
    type: RequestMethod.Get
  },
  /**
   * 删除消息
   */
  updateMsgStatus: {
    controller: CONTROLLER,
    action: 'updateMsgStatus ',
    type: RequestMethod.Post
  },
  /**
   * 获取消息详情
   */
  getMsgDetail: {
    controller: CONTROLLER,
    action: 'getMsgDetail ',
    type: RequestMethod.Get
  },
  /**
   * 获取最新三条未读消息
   */
  getWorkbenchReminder: {
    controller: CONTROLLER,
    action: 'getWorkbenchReminder',
    type: RequestMethod.Get
  },
  /**
   * 删除
   */
  deletedReminderMessage: {
    controller: CONTROLLER,
    action: 'deletedReminderMessage',
    type: RequestMethod.Post
  }
}
