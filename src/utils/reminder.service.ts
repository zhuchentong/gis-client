import app from '~/config/app.config'
import store from '~/store'
import { Stomp, CompatClient } from '@stomp/stompjs'
import { Observable } from "rxjs"
import SockJS from 'sockjs-client'
import { FilterService } from './filter.service'

export class ReminderService {
  // 消息服务监听列表
  public static messageListenerList: any[] = []
  public static instance: ReminderService

  public static connect() {
    ReminderService.instance = new ReminderService()
  }

  public static disConnect() {
    ReminderService.instance && ReminderService.instance.client && ReminderService.instance.client.disconnect()
  }

  /**
   * 注册webSocket消息
   * @param id 标识，用于防止重复注册
   * @param type 消息类型
   */
  public static addMessageListener({ id, type }: { id: string, type?: string | string[] }) {
    return new Observable((observer) => {
      // 查找已经注册的消息，如果有就删除之前的。总是注册最后的这一个
      const listenerIndex = ReminderService.messageListenerList.findIndex(x => x.id === id)
      if (listenerIndex > -1) ReminderService.messageListenerList.splice(listenerIndex, 1)
      ReminderService.messageListenerList.push({
        type: type || [],
        observer,
        id
      })
    })
    // Observable.create((observer) => {
    //   // 查找已经注册的消息，如果有就删除之前的。总是注册最后的这一个
    //   const listenerIndex = ReminderService.messageListenerList.findIndex(x => x.id === id)
    //   if (listenerIndex > -1) ReminderService.messageListenerList.splice(listenerIndex, 1)
    //   ReminderService.messageListenerList.push({
    //     type: type || [],
    //     observer,
    //     id
    //   })
    // })
  }

  public client!: CompatClient

  /**
   * 初始化65
   */
  private constructor() {
    if (!app.rabbitmq) return
    if (app.rabbitmq.socket && app.rabbitmq.socket.startsWith('ws://')) {
      this.client = Stomp.client(app.rabbitmq.socket)
    } else {
      const ws = new SockJS(app.rabbitmq.socket)
      this.client = Stomp.over(ws)
    }

    // 打印日志
    // 生产模式关闭日志打印
    if (!app.debug) {
      console.log("关闭 reminder 日志输出")
      this.client.debug = () => { return }
    }

    // 禁用日志消息
    this.client.connect(
      app.rabbitmq.username,
      app.rabbitmq.password,
      this.onConnectHandle.bind(this),
      this.onErrorHandle.bind(this),
      this.onCloseHandle.bind(this),
      app.rabbitmq.vhost)
  }

  /**
   * 处理消息open事件
   */
  private onConnectHandle() {
    console.log("reminder connected !", FilterService.dateTimeFormat(Date.now()))
    this.client.subscribe(
      (`${app.rabbitmq.exchange}/${store.state.userData.username}`),
      this.onReminderHandle.bind(this)
    )
  }

  /**
   * 处理消息message事件
   */
  private onReminderHandle({ body }) {
    // console.log(JSON.parse(body), "onReminderHandle消息日志")
    const msgBody = JSON.parse(body)
    try {
      const messageType: string = msgBody.messageType
      switch (messageType) {
        case "Reminder":
          this.onMessageHandle(msgBody.data)
          break
        default:
          console.log(`未处理的消息类型:${messageType}`)
          break
      }
    } catch (ex) {
      console.log(ex.message)
    }
  }

  private onMessageHandle(data) {
    ReminderService.messageListenerList.forEach(x => {
      if (!(x.type instanceof Array)) {
        x.type = [x.type]
      }

      // 空元素时监听所有事件
      if (!x.type.length) {
        return x.observer.next(data)
      }
      if (x.type.includes('Reminder')) {
        return x.observer.next(data)
      }
    })
  }

  /**
   * 处理消息close事件
   */
  private onCloseHandle(...a) {
    console.log('close', a)
  }

  /**
   * 处理消息error事件
   */
  private onErrorHandle(...a) {
    console.log('error', a)
  }
}
