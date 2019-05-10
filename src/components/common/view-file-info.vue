<template>
  <section class="component view-file-info" :title="fileInfo.originalName">
    <img v-img v-if="isImage" :src="url">
    <img v-else-if="isMusic" :src="baseImages.audio" :alt="fileInfo.originalName" @click="dialog.audio = true">
    <img v-else-if="isVideo" :src="baseImages.video" :alt="fileInfo.originalName" @click="dialog.video = true">
    <img v-else-if="isPdf" :src="baseImages.pdf" :alt="fileInfo.originalName" @click="dialog.pdf = true">
    <img v-else :src="baseImages.file" :alt="fileInfo.originalName">
    <div class="file-bottom row between-span">
      <div class='file-name'>
        {{fileInfo.originalName}}
      </div>
      <div class="file-action">
        <span title="预览" v-if="isImage||isMusic||isPdf||isVideo">
          <svg-icon iconName="preview" @click.native="previewFile"></svg-icon>
        </span>
        <span title="下载">
          <svg-icon iconName="download" @click.native="downLoadFile"></svg-icon>
        </span>

      </div>
    </div>

    <!-- pdf预览 -->
    <pdf-view :visible.sync="dialog.pdf" :src="url" :fileName="fileInfo.originalName"></pdf-view>
    <el-dialog :title="fileInfo.originalName" class="media-info" width="900px" :center="true" :visible="dialog.video" @close="onVideoClose">
      <video class="video-info-content" :src="url" controls ref="video"></video>
    </el-dialog>
    <el-dialog :title="fileInfo.originalName" class="media-info" :center="true" :visible="dialog.audio" @close="onAudioClose">
      <audio class="video-info-content" :src="url" controls ref="audio"></audio>
    </el-dialog>
    <el-dialog :title="fileInfo.originalName" class="media-info" :visible.sync="dialog.img" :center="true">
      <img class="img-info-content" :src="$common.getLocalServerFilePath(fileInfo.fileName)" :alt="fileInfo.originalName" v-img>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CommonService } from '~/utils/common.service'
import DataBox from '~/components/common/data-box.vue'
import PdfView from '~/components/common/pdf-view.vue'
import { FileType } from '~/config/enum.config'

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
    video: require('~/assets/images/video.png'),
    pdf: require('~/assets/images/pdf.png'),
    file: require('~/assets/images/file.png'),
    audio: require('~/assets/images/audio.png')
  }

  private canViewTypes = [
    ...FileType.PICTURE.value,
    ...FileType.MP3.value,
    ...FileType.MP4.value
  ]
  private fileType = FileType

  private dialog = {
    pdf: false,
    video: false,
    audio: false,
    img: false
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

  private previewFile() {
    switch (true) {
      case this.isImage:
        this.dialog.img = true
        break
      case this.isVideo:
        this.dialog.video = true
        break
      case this.isMusic:
        this.dialog.audio = true
        break
      case this.isPdf:
        this.dialog.pdf = true
        break
    }
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
  width: 180px;
  position: relative;
  display: inline-block;
  border: solid 1px #c6c6c6;

  img {
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

  .img-info-content,
  .video-info-content {
    max-width: 100%;
    max-height: 100%;
  }

  .file-bottom {
    // display: none;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    text-overflow: ellipsis;
    height: 20px;
    line-height: 20px;
    background-color: #ffffff88;
    overflow-y: hidden;
    text-indent: 2px;
    box-shadow: 0px -1px 1px #999999;

    .file-name {
      width: 120px;
      word-break: break-word;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 20px;
      line-height: 20px;
    }

    .file-action {
      width: 60px;
      text-align: right;
      svg {
        height: 20px;
        line-height: 20px;
        margin: 0 2px;
        text-shadow: 0px 0px 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
