<template>
  <section class="component view-file-info">
    <img v-img v-if="isImage" :src="url">
    <img v-else :src="baseImgUrl" @click="onOtherFileClick">
    <!-- pdf预览 -->
    <pdf-view :visible.sync="dialog.pdf" :src="url" :fileName="pdf.originalName"></pdf-view>
    <el-dialog :title="fileInfo.originalName" class="media-info" :center="true" :visible="dialog.video" @close="onVideoClose">
      <video class="video-info-content" :src="url" controls ref="video"></video>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import { CommonService } from "~/utils/common.service"
import DataBox from "~/components/common/data-box.vue"
import PdfView from "~/components/common/pdf-view.vue"
import { FileType } from "~/config/enum.config"

@Component({
  components: {
    DataBox,
    PdfView
  }
})
export default class ViewAttach extends Vue {

  @Prop({ default: () => new Array<any>() })
  private fileInfo!: any

  private baseImgUrl = "12312321312312312"

  private dialog = {
    pdf: false,
    video: false
  }

  private get extStr() {
    let str: string = this.fileInfo.extensionName
    if (str) str = str.toUpperCase()
    return str
  }

  /**
   * 下载文件
   */
  private downLoadFile(file: any) {
    // 下载文件
    const url = CommonService.getLocalServerFilePath(file.fileName)
    this.$electron.ipcRenderer.send('downloadFile', { url, filename: file.originalName })
  }

  private onOtherFileClick() {
    if (this.extStr && this.extStr === "pdf") {
      this.dialog.pdf = true
      return
    }
    if (FileType.MP4.value.findIndex(x => x === this.extStr) > -1) {
      this.dialog.video = true
      return
    }
  }

  private onVideoClose() {
    const video = this.$refs.video as any
    if (!video.paused) video.pause()
  }

  private get isImage() {
    return FileType.PICTURE.value.findIndex(x => x === this.extStr) > -1
  }

  private get url() {
    return CommonService.getLocalServerFilePath(this.fileInfo.fileName)
  }

}
</script>

<style lang="less" scoped>
.component.view-file-info {
  .media-info {
    .el-dialog__body {
      padding: 15px;
      padding-bottom: 20px;
      height: 420px;
      text-align: center;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
  .video-info-content {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
