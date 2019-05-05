<template>
  <section class="component business-detail-layer">
    <div v-if="layerInfo && layerInfo.layerCode"></div>

    <common-title :title="layerInfo.layerName" :showIcon="false">
      <el-button slot="append" @click="preview">预览</el-button>
    </common-title>
    <div v-if="load"></div>
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
  private load = false
  private layerInfo: any = {
    layerCode: "123",
    layerName: "白牙村报地-陕政土报[2019]03号"
  }

  private preview() {
    this.load = true
  }

  @Watch('flowId', { immediate: true })
  private onIdChange(value) {
    // this.layerInfo = {}
    //   value && this.businessFlowModel.getBaseInfo(value).subscribe(
    //     data => this.
    //   )
    // console.log(d)
    // d.subscribe(console.log, console.log, console.log)
  }
}
</script>

<style lang="less" scoped>
.component.business-detail-layer {
  .detail-item {
    padding: 20px;
    border-bottom: solid 2px #f3f3f3;
  }
}
</style>


