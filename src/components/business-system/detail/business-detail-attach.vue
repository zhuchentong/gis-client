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
import ViewAttach from "~/components/business-common/view-attach.vue"
import { FlowInfoService } from "~/services/flow-info.service"
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'

@Component({
  components: {
    ViewAttach
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



