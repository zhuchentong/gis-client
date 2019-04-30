<template>
  <section class="component business-detail-approve">
    <el-steps direction="vertical">
      <el-step v-for="(item,index) of dataSet" :key="item.id" :status="item.status" :icon="index === 0 ? 'el-icon-edit':''">
        <el-card slot="title">
          <label-item minWidth="90px" label="流程节点" :value="item.name"></label-item>
          <label-item minWidth="90px" label="操作人" :value="item.user"></label-item>
          <label-item minWidth="90px" label="操作时间" :value="item.date"></label-item>
          <label-item minWidth="90px" label="说明" :value="item.description"></label-item>
        </el-card>
      </el-step>
    </el-steps>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import { BusinessFlowModel } from "~/models/business-flow.model"

@Component({
  components: {
    DataBox
  }
})
export default class extends Vue {
  @Prop()
  private flowId!: string
  private businessFlowModel = new BusinessFlowModel()
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
  private onIdChange(value) {
    this.dataSet = []
    value && this.businessFlowModel.getBaseInfo(value).subscribe(
      data => this.dataSet = data
    )
  }


}
</script>

<style lang="less" scoped>
.component.business-detail-approve {
  padding-left: 40px;
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
      }
    }
  }
}
</style>


