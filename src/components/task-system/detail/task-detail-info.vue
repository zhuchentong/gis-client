<template>
  <section class="component task-detail-info">
    <div class="detail-item">
      <common-title title="基础信息" :showIcon="false"></common-title>
      <label-item label="项目名称" :value="info.projectName"></label-item>
      <label-item label="项目类型" :value="info.projectType"></label-item>
      <label-item label="创建时间" :value="info.createTime"></label-item>
    </div>
    <div class="detail-item">
      <common-title title="业务相关信息" :showIcon="false"></common-title>
      <label-item label="项目名称" :value="info.projectName"></label-item>
      <label-item label="项目类型" :value="info.projectType"></label-item>
      <label-item label="创建时间" :value="info.createTime"></label-item>
    </div>
    <div class="detail-item">
      <common-title title="业务专属字段" :showIcon="false"></common-title>
      <label-item label="项目名称" :value="info.projectName"></label-item>
      <label-item label="项目类型" :value="info.projectType"></label-item>
      <label-item label="创建时间" :value="info.createTime"></label-item>
    </div>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { BusinessFlowModel } from "~/models/business-flow.model"

@Component({
  components: {
  }
})
export default class extends Vue {

  @Prop()
  private flowId!: string

  private businessFlowModel = new BusinessFlowModel()

  private info: any = {
    projectName: "姚店村商用地",
    projectType: "报地",
    createTime: "2019-04-21 18:32:10"
  }

  // @Watch('flowId', { immediate: true })
  // private onIdChange(value) {
  //   this.info = {}
  //   value && this.businessFlowModel.getBaseInfo(value).subscribe(
  //     data => this.info = data || {}
  //   )
  // }

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


