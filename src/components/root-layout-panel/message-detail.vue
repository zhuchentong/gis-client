<template>
  <div class="component message-detail">
    <data-grid :labelWidth="100" row-key="orapId" contentAlign="left">
      <data-grid-item label="消息类型：" :span="6">
        <div class="row between-span">
          <span>{{ message.messageType | dictConvert('MessageType') }}</span>
          <a @click="openWindow" title="打开子系统">
            <svg-icon iconName="camera-fly"></svg-icon
          ></a>
        </div>
      </data-grid-item>
      <data-grid-item label="日期：" :span="6">{{
        message.msgDate | dateTimeFormat
      }}</data-grid-item>
      <data-grid-item label="消息标题：" :span="12">
        {{ message.title }}
      </data-grid-item>
      <data-grid-item label="消息内容：" :span="12">{{
        message.content
      }}</data-grid-item>
    </data-grid>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import { DataGrid, DataGridItem } from "@zct1989/vue-component"
import { WebsocketMsgModel } from '@/models/websocket-msg.model'
import { TypeSystemConfig } from "./message-type-system.config"
import { WindowSize } from '@/config/enum.config'

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class MessageDetail extends Vue {
  @Prop({
    type: WebsocketMsgModel,
    default: () => new WebsocketMsgModel()
  })
  private message!: WebsocketMsgModel

  private openWindow() {
    const config = TypeSystemConfig.find(x => x.msgTypes.includes(this.message.messageType))
    if (!config) return
    this.$window.open(
      config.url,
      {
        width: WindowSize.large.width,
        height: Math.min(WindowSize.large.height, window.screen.height - 40)
      },
      {
        replace: false,
        parent: true,
        frame: true
      },
      this
    )
  }
}
</script>
