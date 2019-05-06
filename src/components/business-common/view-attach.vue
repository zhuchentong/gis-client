<template>
  <section class="component view-attach">
    <data-box :data="data" ref="report-file-table">
      <template slot="columns">
        <el-table-column prop="originalName" label="原始文件名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="fileName" label="文件名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="extensionName" label="扩展名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" :min-width="$helper.getOperateWidth(1)">
          <template slot-scope="scope">
            <el-button type="text" @click="pdfView(scope.row)" v-if="isPdf(scope.row.extensionName)">预览</el-button>
            <el-button type="text" @click="imageView(scope.row)" v-else-if="isImage(scope.row.extensionName)">预览</el-button>
            <el-button type="text" @click="videoView(scope.row)" v-else-if="isVideo(scope.row.extensionName)">预览</el-button>
            <el-button type="text" @click="downLoadFile(scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <!-- pdf预览 -->
    <pdf-view :visible.sync="dialog.pdf" :src="$common.getLocalServerFilePath(fileInfo.fileName)" :fileName="fileInfo.originalName"></pdf-view>
    <el-dialog :title="fileInfo.originalName" class="media-info" :visible.sync="dialog.img" :center="true" @close="onImgClose">
      <img class="img-info-content" :src="$common.getLocalServerFilePath(fileInfo.fileName)" :alt="fileInfo.originalName" v-img>
    </el-dialog>
    <el-dialog :title="fileInfo.originalName" class="media-info" :visible.sync="dialog.video" :center="true" @close="onVideoClose">
      <video class="video-info-content" :src="$common.getLocalServerFilePath(fileInfo.fileName)" controls ref="video"></video>
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
  private data!: any[]

  private dialog = {
    pdf: false,
    img: false,
    video: false
  }

  private fileInfo: any = {}


  /**
   * PDF预览
   */
  private pdfView(file: any) {
    this.fileInfo = file
    this.dialog.pdf = true
  }

  private imageView(file: any) {
    this.fileInfo = file
    this.dialog.img = true
  }

  private videoView(file: any) {
    this.fileInfo = file
    this.dialog.video = true
  }


  private onVideoClose() {
    const video = this.$refs.video as any
    if (!video.paused) video.pause()
  }

  private onImgClose() {
    this.dialog.img = false
  }

  /**
   * 下载文件
   */
  private downLoadFile(file: any) {
    // 下载文件
    const url = CommonService.getLocalServerFilePath(file.fileName)
    this.$electron.ipcRenderer.send('downloadFile', { url, filename: file.originalName })
  }

  private isPdf(extStr: string) {
    return extStr && extStr === "pdf"
  }

  private isImage(extStr: string) {
    return FileType.PICTURE.value.findIndex(x => x === extStr || x.toUpperCase() === extStr) > -1
  }

  private isVideo(extStr: string) {
    return FileType.MP4.value.findIndex(x => x === extStr || x.toUpperCase() === extStr) > -1
  }

}
</script>

<style lang="less" scoped>
.component.view-attach {
  .img-info-content,
  .video-info-content {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>

<style lang="less">
.component.view-attach {
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
}
</style>
