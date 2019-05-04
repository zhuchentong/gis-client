<template>
  <section class="component business-detail-info">
    <div class="detail-item">
      <common-title title="基础信息" :showIcon="false"></common-title>
      <label-item label="项目名称" :value="info.name"></label-item>
      <label-item label="项目类型" :value="info.type"></label-item>
      <label-item label="项目面积" :value="`${info.acreage || 0} 亩`"></label-item>
      <label-item label="行政区" :value="info.region | districtName"></label-item>
      <label-item label="备注信息" :value="info.remark"></label-item>
    </div>
    <div class="detail-item">
      <common-title title="业务关联信息" :showIcon="false"></common-title>
      <label-item label="供地文号" :value="info.projectName"></label-item>
      <label-item label="批地文号" :value="info.projectType"></label-item>
    </div>
    <div class="detail-item">
      <common-title title="业务专属字段" :showIcon="false"></common-title>
      <!-- 报地 -->
      <div v-if="info.type === 'REPORT'">
        <label-item label="申报日期" :value="info.applyTime | dateTimeFormat('yyyy年MM月dd日 hh:mm:ss')"></label-item>
      </div>
      <!-- 批地 -->
      <div v-if="info.type === 'GRANT'">
        <label-item label="批复日期" :value="info.grantTime | dateTimeFormat('yyyy年MM月dd日 hh:mm:ss')"></label-item>
        <label-item label="批文编号" :value="info.code"></label-item>
        <label-item label="报地项目" :value="info.grantName"></label-item>
        <label-item label="批复结果" :value="info.result | dictConvert('ApprovalStatus')"></label-item>
        <label-item label="批复信息" :value="info.grantRemark"></label-item>
      </div>
      <!-- 征地 -->
      <div v-if="info.type === 'EXPROPRIA'">
        <label-item label="征收日期" :value="info.levyTime | dateTimeFormat('yyyy年MM月dd日 hh:mm:ss')"></label-item>
        <label-item label="征地文号" :value="info.grantName"></label-item>
        <label-item label="批文编号" :value="info.xxxxx"></label-item>
      </div>
      <!-- 供地 -->
      <div v-if="info.type === 'SUPPLY'">
        <label-item label="供地日期" :value="info.supplyTime | dateTimeFormat('yyyy年MM月dd日 hh:mm:ss')"></label-item>
        <label-item label="宗地编号" :value="info.supplyCode"></label-item>
        <label-item label="供地方式" :value="info.supplyWay | dictConvert('ProvisionType')"></label-item>
        <label-item label="供地文号" :value="info.xxxxx"></label-item>
        <label-item label="批文编号" :value="info.xxxxx"></label-item>
        <label-item label="发布公告" :value="info.notice | dictConvert('CommonShow')"></label-item>
        <label-item label="土地用途" :value="info.nature | dictConvert('LandNature')"></label-item>
        <label-item label="具体地址" :value="info.xxxxx"></label-item>
      </div>
    </div>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { BusinessFlowModel } from "~/models/business-flow.model"
import { FlowInfoService } from "~/services/flow-info.service"
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'

@Component({
  components: {
  }
})
export default class extends Vue {

  @Prop()
  private flowId!: string

  private businessFlowModel = new BusinessFlowModel()

  @Inject
  private service!: FlowInfoService

  private info: any = {}

  @Watch('flowId', { immediate: true })
  private onIdChange(value) {
    if (!value) {
      this.info = {}
      return
    }
    this.service.queryFlowInfo(new RequestParams({ flowId: value }))
      .subscribe(data => this.info = data)
  }

}
</script>

<style lang="less" scoped>
.component.business-detail-info {
  .detail-item {
    padding: 20px;
    border-bottom: solid 2px #f3f3f3;
  }
}
</style>


