<template>
  <el-dialog class="pdf-view" width="80%" append-to-body :visible="visible" @open="dialogOpen" @close="emitUpdateVisible" :title="fileName">
    <pdf v-for="i in numPages" :key="i" :src="loadingTask" :page="i"></pdf>
  </el-dialog>
</template>

<script lang="ts">

import pdf from "vue-pdf"
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator"

@Component({
  components: {
    pdf
  }
})
export default class PdfView extends Vue {

  @Prop({
    type: Boolean,
    default: false
  })
  public visible!: boolean

  @Prop({
    required: true
  })
  public src!: string

  @Prop({
    default: "PDF 文档查看"
  })
  public fileName!: string

  private numPages = 0
  private loadingTask: any = null

  @Emit('update:visible')
  private emitUpdateVisible(val) {
    return
  }

  /**
   * 打开对话框回调函数
   */
  private dialogOpen() {
    if (this.src) {
      // 加载pdf
      this.loadingTask = pdf.createLoadingTask(this.src)

      this.loadingTask.then((data) => {
        this.numPages = data.numPages
      })
    }
  }

}
</script>
