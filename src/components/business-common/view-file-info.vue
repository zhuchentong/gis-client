<template>
  <section class="component view-attach">
    <div v-if="fileInfo.extensionName === ''">

    </div>
    <!-- pdf预览 -->
    <pdf-view :visible.sync="dialog.pdf" :src="$common.getLocalServerFilePath(pdf.fileName)" :fileName="pdf.originalName"></pdf-view>
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

  private dialog = {
    pdf: false
  }

  private pdf: any = {}


  /**
   * PDF预览
   */
  private pdfView(file: any) {
    this.pdf = file
    this.dialog.pdf = true
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
</style>
