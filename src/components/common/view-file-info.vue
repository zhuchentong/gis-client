<template>
  <section class="component view-file-info">
    <img v-img v-if="isImage" :src="url">
    <img v-else-if="isMusic" :src="`${publicPath}video.jpg`" @click="dialog.audio = true">
    <img v-else-if="isVideo" :src="`${publicPath}video.jpg`" @click="dialog.video = true">
    <img v-else-if="isPdf" :src="`${publicPath}video.jpg`" @click="dialog.pdf = true">
    <img v-else :src="`${publicPath}video.jpg`" @click="downLoadFile">
    {{fileInfo.originName}}

    <!-- pdf预览 -->
    <pdf-view :visible.sync="dialog.pdf" :src="url" :fileName="fileInfo.originalName"></pdf-view>
    <el-dialog :title="fileInfo.originalName" class="media-info" :center="true" :visible="dialog.video" @close="onVideoClose">
      <video class="video-info-content" :src="url" controls ref="video"></video>
    </el-dialog>
    <el-dialog :title="fileInfo.originalName" class="media-info" :center="true" :visible="dialog.audio" @close="onAudioClose">
      <video class="video-info-content" :src="url" controls ref="audio"></video>
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
  private publicPath = process.env.BASE_URL

  private baseImages = {
    video: 'video',
    pdf: 'pdf',
    other: 'other',
    music: 'music'
  }

  private canViewTypes = [...FileType.PICTURE.value, ...FileType.MP3.value, ...FileType.MP4.value]
  private fileType = FileType

  private dialog = {
    pdf: false,
    video: false,
    audio: false
  }

  private get extStr() {
    let str: string = this.fileInfo.extensionName
    if (str) str = str.toLowerCase()
    return str
  }

  /**
   * 下载文件
   */
  private downLoadFile() {
    // 下载文件
    const downLoadOption = {
      url: this.url,
      filename: this.fileInfo.fileName,
      originalName: this.fileInfo.originalName
    }
    this.$electron.ipcRenderer.send('downloadFile', downLoadOption)
  }

  private onVideoClose() {
    const video = this.$refs.video as any
    if (!video.paused) video.pause()
    this.dialog.video = false
  }

  private onAudioClose() {
    const audio = this.$refs.audio as any
    if (!audio.paused) audio.pause()
    this.dialog.audio = false
  }


  private get url() {
    return CommonService.getLocalServerFilePath(this.fileInfo.fileName)
  }

  private get isImage() {
    return FileType.PICTURE.value.includes(this.extStr)
  }

  private get isMusic() {
    return FileType.MP3.value.includes(this.extStr)
  }

  private get isVideo() {
    return FileType.MP4.value.includes(this.extStr)
  }

  private get isPdf() {
    return this.extStr === 'pdf'
  }
}
</script>

<style lang="less" scoped>
.component.view-file-info {
  height: 120px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #f2f2f2;

  > img {
    height: 120px;
    width: 120px;
  }

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
