<template>
  <section class="component upload-attach">
    <common-title :title="title" iconName="files">
      <template slot="append">
        <file-upload ref="attach-upload" :AllowExtension="AllowExtension" :fileList.sync="attachList" :showFileList="false" @onUploadSuccess="onFileUploadSuccess">上传文件</file-upload>
      </template>
    </common-title>
    <data-box class="select-data-box" :data="attachFileDataSet" ref="report-file-table" :maxHeight="120">
      <template slot="columns">
        <el-table-column prop="originalName" label="原始文件名" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="fileName" label="文件名" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="extensionName" label="扩展名称" align="center"></el-table-column>
        <el-table-column prop="remark" label="操作" align="center" width="90px">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteFile(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop, Watch, Model } from "vue-property-decorator"
import { CommonService } from "~/utils/common.service"
import DataBox from "~/components/common/data-box.vue"
import FileUpload from "~/components/common/file-upload.vue"
import { ValidatorService } from '@/utils/validator.service'
import { IFileType } from '~/models/interface/i-file-type.interface'

@Component({
  components: {
    DataBox,
    FileUpload
  }
})
export default class UploadAttach extends Vue {

  @Prop({ default: "附件资料" })
  private title!: string

  // 允许的文件后缀类型
  @Prop({
    type: Array
  })
  private AllowExtension!: Array<string | IFileType>


  private attachList: any[] = []

  @Prop({ default: () => new Array<any>() })
  private attachFileDataSet!: any[]

  public validate() {
    if (!this.attachFileDataSet.length) {
      this.$message(`请上传${this.title}`)
      return Promise.resolve(false)
    }

    const r = {
      fileId: { required: true, message: "请输入文件名" },
      fileType: { required: true, message: "请选择附件分类" }
    }
    const validates = this.attachFileDataSet.map(v => {
      return ValidatorService.validate(v, r)
    })

    return Promise.all(validates).then(values => {
      return true
    }).catch(({ errors }) => {
      if (errors.length) {
        this.$message(errors[0].message)
      }
      return false
    })
  }

  public clear() {
    (this.$refs['attach-upload'] as FileUpload).reset()
  }

  /**
   * 图层上传成功
   */
  private onFileUploadSuccess(id: string, data: any) {
    this.attachFileDataSet.push({ ...data })
  }


  /**
   * 删除附件
   */
  private deleteFile(file) {
    if (file) {
      this.attachFileDataSet.splice(
        this.attachFileDataSet.findIndex(item => item.id === file.id),
        1
      )
    }
  }
}
</script>

<style lang="less" scoped>
</style>
