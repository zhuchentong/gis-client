<template>
  <section class="component append-task-attach">
    <upload-attach :attachFileDataSet="attachDataList" ref="upload-attach"></upload-attach>
    <div class="operate-buttons">
      <el-button @click="onCancel">取消</el-button>
      <el-button @click="onSubmit">确定</el-button>
    </div>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { PatrolInfoService } from "~/services/patrol-info.service"
import { Inject } from "typescript-ioc"
import { RequestParams } from '~/core/http'
import { FileType } from "~/config/enum.config"
import UploadAttach from "~/components/business-common/upload-attach.vue"

@Component({
  components: {
    UploadAttach
  }
})
export default class extends Vue {
  @Prop()
  private id!: string

  @Inject
  private service!: PatrolInfoService

  private attachDataList: any = []

  @Emit('close')
  private onCancel() {
    this.attachDataList = []
  }

  @Emit('success')
  private onSuccess() {
    this.$message.success('文件上传成功')
    this.onCancel()
  }

  private onSubmit() {
    // 
    this.onSuccess()
  }

}
</script>


