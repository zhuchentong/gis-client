<template>
  <section class="component work-message">
    <span class="message-icon" @click="dialog.messageBoxVisible = true">
      <el-badge :value="unReadMsgCount" class="icon" v-if="unReadMsgCount > 0">
        <svg-icon iconName="message" iconSize="32"></svg-icon>
      </el-badge>
      <svg-icon iconName="message" iconSize="32" v-else></svg-icon>
    </span>
    <el-dialog
      :visible.sync="dialog.messageBoxVisible"
      title="消息列表"
      @close="getUnReadCount"
    >
      <message-box :visible="dialog.messageBoxVisible"></message-box>
    </el-dialog>
    <el-dialog
      title="消息详情"
      :visible.sync="dialog.messageDetail"
      @close="getUnReadCount"
      append-to-body
    >
      <message-detail :message="websocketMsgModel"></message-detail>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import SvgIcon from "~/components/common/svg-icon.vue"
import MessageBox from "~/components/workspace/message/message-box.vue"
import { Component, Prop, Vue } from "vue-property-decorator"
import { State, Mutation } from "vuex-class"
import { ReminderService } from "~/utils/reminder.service"
import { WebsocketMsgModel } from "~/models/websocket-msg.model"
import { CommonService } from "@/utils/common.service"
import MessageDetail from "~/components/workspace/message/message-detail.vue"
import { ElNotificationOptions } from "element-ui/types/notification"


@Component({
  components: {
    SvgIcon,
    MessageBox,
    MessageDetail
  }
})
export default class WorkMessage extends Vue {
  @State private unReadMsgCount!: number
  @Mutation private updateUnReadCount!: (count: number) => void

  private dialog = {
    messageBoxVisible: false,
    messageDetail: false
  }

  private websocketMsgModel = new WebsocketMsgModel()

  private updateMessageBoxVisible(isVisible) {
    // 是否显示消息
    this.dialog.messageBoxVisible = true
  }

  private mounted() {
    this.getUnReadCount()
    ReminderService.addMessageListener({ id: "work-message-onload", type: 'Reminder' })
      .subscribe((data) => {
        this.getUnReadCount()
        this.showNotificationMsg(data)
      })
  }

  private showNotificationMsg(data: any) {
    CommonService.revertData(this.websocketMsgModel, data)
    const option: any = {
      title: this.websocketMsgModel.title || "新消息提醒",
      body: this.websocketMsgModel.content
    }
    // 通知主进程 进行WINDOW 消息弹出
    this.$electron.ipcRenderer.send('reminder', option)
    // web 页面 Element 通知消息弹出
    option.position = 'bottom-right'
    option.message = option.body
    option.duration = 6666
    this.$notify.info(option)
    if (this.websocketMsgModel.messageMode === 'POPUP') {
      this.websocketMsgModel.setRead().subscribe(this.getUnReadCount)
      this.dialog.messageDetail = true
    }
  }

  /**
   * 获取未读消息数量
   */
  private getUnReadCount() {
    this.dialog.messageBoxVisible = false
    this.websocketMsgModel.getUnReadMsgCount().subscribe(count => this.updateUnReadCount(count))
  }
}
</script>

<style lang="less" scoped>
</style>
