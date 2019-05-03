<template>
  <section class="component business-detail-attach">
    <view-attach :data="dataSet"></view-attach>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import { BusinessFlowModel } from "~/models/business-flow.model"
import ViewAttach from "~/components/business-common/view-attach.vue"

@Component({
  components: {
    ViewAttach
  }
})
export default class extends Vue {
  @Prop()
  private flowId!: string
  private businessFlowModel = new BusinessFlowModel()
  private dataSet = [
    {
      fileId: "123332",
      originalName: "环保批文",
      fileName: "120ssdff993ks9f3",
      extensionName: "pdf",
    },
    {
      fileId: "123333",
      originalName: "施工计划",
      fileName: "120ssdff993ks9f3",
      extensionName: "pdf",
    },
    {
      fileId: "123334",
      originalName: "位置文件",
      fileName: "120ssdff993ks9f3",
      extensionName: "txt",
    }
  ]


  @Watch('flowId', { immediate: true })
  private onIdChange(value) {
    // this.dataSet = []
    // value && this.businessFlowModel.getBusinessFileByFlowId(value).subscribe(
    //   data => this.dataSet = data
    // )
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


