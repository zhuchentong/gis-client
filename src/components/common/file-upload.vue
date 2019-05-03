<template>
  <section class="component file-upload">
    <el-upload :headers="headers" ref="upload" class="upload" multiple :before-upload="onBeforeUpload" :before-remove="onBeforeRemove" :file-list="fileList" :action="uploadUrl" :limit="fileNumberLimit?fileNumberLimit:null" :show-file-list="showFileList" :on-success="onSucess" :on-error="onError" :on-change="onChange" :on-remove="onRemove">
      <span :class="{'ext-title':extTypeTitle}">{{extTypeTitle}}</span>
      <el-button class="upload-button" @click="clickHandle" :disabled="disableUpload">上传文件</el-button>
    </el-upload>
  </section>
</template>

<script lang="ts">
import appConfig from '~/config/app.config'
import uploadFileController from "~/config/server/upload-file.controller"
import { Component, Vue, Emit, Prop } from "vue-property-decorator"
import { State } from "vuex-class"
import { RequestOption, RequestParams } from '@/core/http'
import { FileType } from '~/enum/enum.config'
import { IFileType } from '~/models/interface/i-file-type.interface'

@Component({
  components: {}
})
export default class FileUpload extends Vue {

  // 是否显示文件列表
  @Prop({ default: true })
  public showFileList

  // 允许的文件后缀类型
  @Prop({
    type: Array
  })
  public AllowExtension!: Array<string | IFileType>

  // 文件数量限制
  @Prop({
    default: false,
    type: [Boolean, Number]
  })
  public fileNumberLimit

  // 文件带下限制
  @Prop({
    default: 100,
    type: Number
  })
  public fileSizeLimit

  // 文件列表
  @Prop({
    default: () => [],
    type: Array
  })
  public fileList!: any[]

  @State private userToken

  public reset() {
    const upload: any = this.$refs["upload"]
    upload.clearFiles()
    this.updateFileList([])
  }

  // 获取上传文件头部信息
  get headers() {
    return {
      "X-OperatorToken": this.userToken
    }
  }

  /**
   * 是否禁止上传
   */
  get disableUpload() {
    return this.fileNumberLimit
      ? this.fileList.length >= this.fileNumberLimit
      : false
  }

  /**
   * 上传路径
   */
  get uploadUrl() {
    return [
      appConfig.server,
      new RequestOption(uploadFileController.upload, new RequestParams(null)).getRequestUrl()
    ].join("/")
  }

  // 上传成功回调事件
  @Emit("onUploadSuccess")
  private onUploadSucess(id, data) {
    // 
  }

  // 上传异常回调事件
  @Emit("onUploadError")
  private onUploadError() {
    // 
  }

  // 更新文件列表
  @Emit("update:fileList")
  private updateFileList(fileList) {
    // 
  }

  // 删除成功的回调事件
  @Emit("onBeforeUpload")
  private onBeforeLoad() {
    // 
  }

  // 删除成功的回调事件
  @Emit("onUploadRemove")
  private onUploadRemove() {
    // 
  }

  private clickHandle(event) {
    if (this.disableUpload) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
  /**
   * 上传成功回调
   */
  private onSucess(data, { uid }) {
    this.onUploadSucess(uid, data)
  }

  /**
   * 错误信息回调
   */
  private onError(err, file) {
    this.$message.error("文件上传失败,请重新上传")
    const findIndex = this.fileList.findIndex(x => x.id === file.id)
    if (findIndex > -1) this.fileList.splice(findIndex, 1)
    this.onUploadError()
  }

  /**
   * 文件上传状态改变回调
   */
  private onChange(file, uploadFileList) {
    switch (file.status) {
      case "ready": {
        this.fileList.push({
          uid: file.uid,
          name: file.name,
          percentage: file.percentage,
          status: file.status
        })
        break
      }
      case "faild": {
        console.log(file, this.fileList.length, 'onChange')
        break
      }
    }
    this.updateFileList(this.fileList)
  }



  /**
   * 删除处理
   */
  private onRemove(file, fileList) {
    this.onUploadRemove()
    this.updateFileList(fileList)
  }

  /**
   * 删除预处理
   */
  private onBeforeRemove(file, fileList) {
    if (file.percentage === 0) {
      return false
    }
    return this.$confirm("是否确定删除该文件?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
  }

  /**
   * 上传文件预处理
   * 上传文件大小限制
   */
  private onBeforeUpload({ name, size, uid }) {
    // 预处理
    this.onBeforeLoad()

    let result: boolean = true

    if (this.AllowExtension && this.AllowExtension.length) {
      // 文件名异常
      if (name.toString().split(".") < 2) {
        this.$message(`文件格式错误`)
        result = false
      }

      const [extension] = name.split(".").slice(-1)

      const checkType = this.AllowExtension.some((x: any) => {
        if (typeof x === "object") {
          return (x as IFileType).value.includes(extension)
        } else {
          return x === extension
        }
      })

      if (!checkType) {
        this.$message(`文件格式不符合要求`)
        result = false
      }
    }
    // 限制上传文件大小
    if (this.fileSizeLimit * 1024 * 1024 < size) {
      this.$message(`文件${name}超过上传文件大小限制${this.fileSizeLimit}MB`)
      result = false
    }

    if (!result) {
      this.fileList.splice(this.fileList.findIndex(x => x.uid === uid), 1)
    }

    return result
  }

  private get extTypeTitle() {
    if (!this.AllowExtension) return ""
    const item = this.AllowExtension[0]
    if (typeof item === "object") {
      const title = this.AllowExtension.map((v) => (v as IFileType).title).join()
      return `文件支持类型包含:${title}`
    } else {
      return `文件支持以下格式：${this.AllowExtension.join()}`
    }
  }

}
</script>

<style lang="less">
.component.file-upload {
  .el-upload.el-upload--text {
    height: 26px !important;
    pointer-events: none;
  }
  .ext-title {
    padding-left: 20px;
    font-size: 12px;
    display: inline-block;
    min-width: 200px;
  }
  .upload-button {
    pointer-events: auto;
  }
  .upload-button.is-disabled {
    pointer-events: none;
  }
}
</style>
