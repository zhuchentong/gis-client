<template>
  <section class="component view-file-info">
    <img v-img v-if="isImage" :src="url">
    <img v-else-if="isMusic" :src="baseImages.audio" :alt="fileInfo.originalName" @click="dialog.audio = true">
    <img v-else-if="isVideo" :src="baseImages.video" :alt="fileInfo.originalName" @click="dialog.video = true">
    <img v-else-if="isPdf" :src="baseImages.pdf" :alt="fileInfo.originalName" @click="dialog.pdf = true">
    <img v-else :src="baseImages.file" :alt="fileInfo.originalName" @click="downLoadFile">
    <div class="file-name">{{fileInfo.originalName}}</div>

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

  private publicPath = process.env.BASE_URL

  private baseImages = {
    video: require("~/assets/images/video.png"),
    pdf: require('~/assets/images/pdf.png'),
    file: require('~/assets/images/file.png'),
    audio: require('~/assets/images/audio.png')
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
    CommonService.downloadFile(downLoadOption)
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
  position: relative;
  display: inline-block;
  border: solid 1px #c6c6c6;
  // &:hover {
  //   .file-name {
  //     display: block;
  //   }
  // }

  > img {
    height: 120px;
    width: 180px;
    object-fit: cover;
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

  .file-name {
    // display: none;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    text-overflow: ellipsis;
    height: 20px;
    line-height: 20px;
    background-color: #eeffbb54;
    overflow-y: hidden;
    text-indent: 2px;
  }
}
</style>
