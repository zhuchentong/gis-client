<template>
  <section class="component business-detail-approve">
    <div class="text-right">
      <el-button @click="dialog.nextApprove = true">指定审批</el-button>
      <el-button @click="dialog.approve = true">审批</el-button>
      <el-button @click="finshFlow">结束流程</el-button>
    </div>
    <div class="approve-steps">
      <el-steps direction="vertical">
        <el-step v-for="(item,index) of dataSet" :key="item.id" :status="item.status" :icon="index === 0 ? 'el-icon-edit':''">
          <el-card slot="description">
            <label-item minWidth="90px" label="流程节点" :value="item.name"></label-item>
            <label-item minWidth="90px" label="操作人" :value="item.user"></label-item>
            <label-item minWidth="90px" label="操作时间" :value="item.date"></label-item>
            <label-item minWidth="90px" label="说明" :value="item.description"></label-item>
          </el-card>
        </el-step>
      </el-steps>
    </div>

    <el-dialog title="选择下一个审批人" :center="true" :visible.sync="dialog.nextApprove" width="500px" :show-close="false" :close-on-click-modal="false">
      <next-select-approve :flowModel="flowModel" :flowId="flowId" @close="dialog.nextApprove = false" @success="onIdChange"></next-select-approve>
    </el-dialog>
    <el-dialog title="流程审批" :center="true" :visible.sync="dialog.approve" width="500px" :show-close="false" :close-on-click-modal="false">
      <flow-approve :flowModel="flowModel" :flowId="flowId" @close="dialog.approve = false" @success="onIdChange"></flow-approve>
    </el-dialog>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import { BusinessFlowModel } from "~/models/business-flow.model"
import NextSelectApprove from "~/components/business-system/detail/next-select-approve.vue"
import FlowApprove from "~/components/business-system/detail/flow-approve.vue"

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
  private flowModel!: BusinessFlowModel

  private dialog = {
    nextApprove: false,
    approve: false
  }

  private dataSet = [
    {
      id: "12",
      name: "申请",
      user: "张晓光",
      date: "2019-03-12 14:30:23",
      description: "历史数据补充",
      status: "finish"
    },
    {
      id: "13",
      name: "审批",
      user: "业务科-斗科长",
      date: "2019-03-12 14:30:23",
      description: "符合业务要求",
      status: "success"
    },
    {
      id: "14",
      name: "审批",
      user: "调查科-李旺",
      date: "2019-03-12 14:30:23",
      description: "核实无误",
      status: "success"
    },
    {
      id: "5",
      name: "审批",
      user: "环保科-栗科长",
      date: "2019-03-12 14:30:23",
      description: "复合环保要求",
      status: "success"
    },
    {
      id: "16",
      name: "拒绝",
      user: "王局长",
      date: "2019-03-12 14:30:23",
      description: "资料不够详细",
      status: "error"
    }
  ]


  @Watch('flowId', { immediate: true })
  private onIdChange() {
    // this.dataSet = []
    // this.flowId && this.businessFlowModel.getBaseInfo(this.flowId).subscribe(
    //   data => this.dataSet = data
    // )
  }

  private finshFlow() {
    this.flowModel.finishFlow(this.flowId).subscribe(
      () => {
        this.$message.success("操作成功")
        this.onIdChange()
      }
    )
  }

}
</script>

<style lang="less" scoped>
.component.business-detail-approve {
  position: relative;
  padding-left: 40px;
  .approve-steps {
    position: absolute;
    top: 50px;
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
  .el-steps {
    margin-top: 50px;
    .el-step {
      .el-step__main {
        margin-top: -40px;
        margin-bottom: 60px;
        flex-basis: 500px;
      }
    }
  }
}
</style>


