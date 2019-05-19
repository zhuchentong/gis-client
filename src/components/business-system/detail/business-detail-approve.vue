<template>
  <section class="component business-detail-approve">
    <div class="no-data" v-if="!flowId"></div>
    <div v-else>
      <div class="text-right">
        <el-button v-show="showNextBtn" @click="dialog.nextApprove = true"
          >指定审批</el-button
        >
        <el-button v-show="showApproveBtn" @click="dialog.approve = true"
          >审批</el-button
        >
        <el-button v-show="showDoneBtn" @click="finshFlow">结束流程</el-button>
      </div>
      <div class="approve-steps">
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) of dataSet"
            :hide-timestamp="true"
            size="large"
            :key="index"
            :icon="item.icon"
            :type="item.type"
          >
            <el-card class="approve-steps-item">
              <label-item
                label="流程节点"
                :value="item.status | dictConvert('FlowChartStatus')"
              ></label-item>
              <label-item
                :label="
                  item.status === 'PENDING_APPROVAL' ? '待审批人' : '操作人'
                "
                :value="item.userName"
              ></label-item>
              <label-item
                label="操作时间"
                :value="item.time | dateTimeFormat('yyyy年MM月dd日 hh:mm:ss')"
              ></label-item>
              <label-item label="说明" :value="item.opinion"></label-item>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <el-dialog
      title="选择下一个审批人"
      :center="true"
      :visible.sync="dialog.nextApprove"
      width="500px"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <next-select-approve
        :flowId="flowId"
        @close="dialog.nextApprove = false"
        @success="emitSuccess"
      ></next-select-approve>
    </el-dialog>
    <el-dialog
      title="流程审批"
      :center="true"
      :visible.sync="dialog.approve"
      width="500px"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <flow-approve
        :flowId="flowId"
        @close="dialog.approve = false"
        @success="emitSuccess"
      ></flow-approve>
    </el-dialog>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import NextSelectApprove from "~/components/business-system/detail/next-select-approve.vue"
import FlowApprove from "~/components/business-system/detail/flow-approve.vue"
import { FlowInfoService } from "~/services/flow-info.service"
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'
import { FlowTypeSetting } from "~/components/business-system/business-system.config"
import { State } from "vuex-class"

@Component({
  components: {
    DataBox,
    NextSelectApprove,
    FlowApprove
  }
})
export default class extends Vue {
  @Prop()
  private flowId!: string

  @Prop()
  private status!: string

  @State('userData.id')
  private loginUserId!: string

  @Inject
  private service!: FlowInfoService

  private dialog = {
    nextApprove: false,
    approve: false
  }

  private dataSet: any[] = []

  // 流程第一条
  private fisrtItem: any = {}
  // 流程最后一条
  private lastItem: any = {}
  // 时间线 icon type
  private flowItemTypeSettings!: any

  @Emit('success')
  private emitSuccess() { return }

  @Watch('flowId', { immediate: true })
  private onIdChange() {
    this.fisrtItem = {}
    this.lastItem = {}

    if (!this.flowId) {
      this.dataSet = []
      return
    }
    this.service.getFlowApprovesByFlowId(new RequestParams({ flowId: this.flowId }))
      .subscribe((data: any[]) => {
        this.dataSet = data.map((v, index) => {
          return {
            ...v,
            type: FlowTypeSetting[v.status],
            icon: index === 0 ? 'el-icon-edit' : ''
          }
        })

        this.fisrtItem = data.shift()
        this.lastItem = data.pop()
      })
  }
  /**
   * 结束流程
   */
  private finshFlow() {
    this.service.finishFlow(new RequestParams(null, { append: [this.flowId] }))
      .subscribe(() => {
        this.$message.success("操作成功")
        this.emitSuccess()
      })
  }

  private get showApproveBtn() {
    return this.status === 'PENDING_APPROVAL' && this.lastItem && this.lastItem.status === 'PENDING_APPROVAL'
  }

  private get showNextBtn() {
    return this.status === 'PENDING_APPROVAL' && this.lastItem && this.lastItem.status === 'AGREE'
  }

  private get showDoneBtn() {
    return this.showNextBtn || this.status === 'REPULSE' && this.lastItem && this.lastItem.status === 'REFUSE'
  }


}
</script>

<style lang="less" scoped>
.component.business-detail-approve {
  position: relative;
  padding-left: 40px;

  .approve-steps {
    margin-top: 40px;
    &-item {
      width: 400px;
    }
  }
  .approve-steps {
    position: absolute;
    top: 20px;
    left: 40px;
    right: 0;
    bottom: 0;
    overflow-y: auto;
  }
  .text-right {
    padding-right: 20px;
  }
}
</style>


<style lang="less">
.component.business-detail-approve {
  .approve-steps {
    .el-timeline {
      margin-top: 10px;
      font-size: 12px;
      .el-timeline-item__tail {
        margin-top: 50px;
      }
    }
    .el-timeline-item__node--large {
      left: -7px;
      width: 26px;
      height: 26px;
      margin-top: 50px;
    }
  }
}
</style>


