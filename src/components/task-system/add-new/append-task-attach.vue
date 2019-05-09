<template>
  <section class="component append-task-attach">
    <upload-attach :attachFileDataSet="attachDataList" :AllowExtension="fileTypes" ref="upload-attach"></upload-attach>
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

  private fileTypes = [FileType.PICTURE, FileType.MP4]

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
    if (!this.attachDataList.length) {
      this.$message('您还没有选择附件')
      return
    }

    // 文件挑拣
    const picFiles = this.attachDataList.filter(x => FileType.PICTURE.value.includes(x.extensionName.toLowerCase()))
    const videoFiles = this.attachDataList.filter(x => FileType.MP4.value.includes(x.extensionName.toLowerCase()))

    const params = {
      id: this.id,
      imageFileIds: picFiles.map(v => v.id),
      videoFileIds: videoFiles.map(v => v.id)
    }
    this.service.addPatrolFile(new RequestParams(params)).subscribe(this.onSuccess)
  }

}
</script>


