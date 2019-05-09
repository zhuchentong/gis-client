<template>
  <section class="component business-detail-attach">
    <div class="no-data" v-if="!flowId || !dataSet.length"></div>
    <view-file-info v-else v-for="item of dataSet" :key="item.id" :fileInfo="item" class="content-file"></view-file-info>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { FlowInfoService } from "~/services/flow-info.service"
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'
import ViewFileInfo from "~/components/common/view-file-info.vue"

@Component({
  components: {
    ViewFileInfo
  }
})
export default class extends Vue {
  @Prop()
  private flowId!: string

  @Inject
  private service!: FlowInfoService

  private dataSet: any[] = []


  @Watch('flowId', { immediate: true })
  private onIdChange(value) {
    if (!this.flowId) {
      this.dataSet = []
      return
    }
    this.service.getBusinessFileByFlowId(new RequestParams({ flowId: this.flowId }))
      .subscribe(data => this.dataSet = data)

  }
}
</script>

<style lang="less" scoped>
.component.business-detail-attach {
  .content-file {
    margin: 0 10px 10px 0;
  }
}
</style>



