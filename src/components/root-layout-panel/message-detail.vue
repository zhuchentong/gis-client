<template>
  <div class="component message-detail">
    <data-grid :labelWidth="100" row-key="orapId" contentAlign="left">
      <data-grid-item label="消息类型：" :span="6">{{
        message.messageType | dictConvert('MessageType')
      }}</data-grid-item>
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
}
</script>
