<template>
  <section class="component message-box">
    <data-box
      :selection-list.sync="selectionList"
      :stripe="queryMsgModel.readStatus === 'READ'"
      :rowClassName="getRowClass"
      ref="databox"
      row-key="id"
      :data="messageDataSet"
      :page="pageService"
      :maxHeight="380"
      @onPageChange="refreshData"
    >
      <template slot="buttons">
        <el-radio-group
          v-model="queryMsgModel.readStatus"
          size="mini"
          @change="onStateChange"
        >
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="READ">已读</el-radio-button>
          <el-radio-button label="UNREAD">未读</el-radio-button>
        </el-radio-group>
      </template>
      <template slot="append">
        <el-button @click="deleteMessages">删除</el-button>
      </template>
      <template slot="columns">
        <el-table-column
          prop="messageType"
          label="消息类型"
          :formatter="
            row => $filter.dictConvert(row.messageType, 'MessageType')
          "
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="消息标题"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="msgDate"
          label="日期"
          :formatter="row => $filter.dateTimeFormat(row.msgDate)"
        ></el-table-column>
        <el-table-column label="查看详情">
          <template slot-scope="scope">
            <el-button @click="openMessageDetail(scope.row)" type="text"
              >查看</el-button
            >
            <el-button @click="deleteClick(scope.row)" type="text"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </template>
    </data-box>
    <el-dialog
      title="消息详情"
      :visible.sync="dialog.messageDetail"
      @close="dialog.messageDetail = false"
      width="500px"
      append-to-body
    >
      <message-detail :message="websocketMsgModel"></message-detail>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Mutation } from 'vuex-class'
import { PageService } from '~/extension/services/page.service'
import MessageDetail from './message-detail.vue'
import DataBox from '~/components/common/data-box.vue'
import { Prop, Watch } from 'vue-property-decorator'
import { WebsocketMsgModel } from '@/models/websocket-msg.model'
import { CommonService } from '@/utils/common.service'

@Component({
  components: {
    DataBox,
    MessageDetail
  }
})
export default class MessageBox extends Vue {
  @Mutation private updateUnReadCount!: (num: number) => void
  private pageService = new PageService()
  private messageDataSet: any[] = []
  private selectionList = []

  @Prop({ required: true })
  private visible!: boolean

  private queryMsgModel = new WebsocketMsgModel()
  private websocketMsgModel = new WebsocketMsgModel()
  private dialog = {
    messageDetail: false
  }

  /**
   * 初始化
   */
  private mounted() {
    this.refreshData()
  }

  @Watch('visible', { immediate: true })
  private onVisibleChange(value) {
    if (value) {
      this.refreshData()
    }
  }

  private onStateChange() {
    this.pageService.reset()
    this.refreshData()
  }

  /**
   * 获取行样式
   */
  private getRowClass(scope) {
    return (scope.row.readStatus as string).toLowerCase()
  }

  /**
   * 刷新数据
   */
  private refreshData() {
    this.getUnReadCount()
    this.queryMsgModel
      .queryMessages(this.pageService)
      .subscribe(data => (this.messageDataSet = data.content))
  }

  /**
   * 打开消息详情
   */
  private openMessageDetail(row: any) {
    this.websocketMsgModel = new WebsocketMsgModel()
    CommonService.revertData(this.websocketMsgModel, row)
    this.websocketMsgModel.setRead().subscribe(this.getUnReadCount)
    this.dialog.messageDetail = true
  }

  /**
   * 批量删除消息
   */
  private deleteMessages() {
    if (!this.selectionList.length) {
      this.$message('请选择要删除的消息')
    }
    const messageIdList = this.selectionList.map((x: any) => x.id)
    this.websocketMsgModel.delete(messageIdList).subscribe(this.refreshData)
  }

  private deleteClick(row: any) {
    this.websocketMsgModel.id = row.id
    this.websocketMsgModel.delete().subscribe(this.refreshData)
  }

  /**
   * 获取未读消息数量
   */
  private getUnReadCount() {
    this.websocketMsgModel
      .getUnReadMsgCount()
      .subscribe(count => this.updateUnReadCount(count))
  }
}
</script>

<style lang="less">
.message-box.component {
  height: 460px;
  .data-box {
    .el-table__row {
      &.unread {
        background-color: #f2feff !important;
      }
    }
  }
}
</style>
