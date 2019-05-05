<template>
  <section class="component upload-layer">
    <common-title title="图层文件" iconName="shp-buffer"></common-title>
    <el-form :model="layerModel" :rules="rules" label-width="120px" ref="form">
      <el-form-item label="图层文件" prop="fileId">
        <file-upload ref="layer-upload" :fileList.sync="layerList" :fileNumberLimit="1" :AllowExtension="compressedFileTypes" @onUploadSuccess="onLayerUploadSuccess">上传图层</file-upload>
      </el-form-item>
      <el-form-item label="图层名称" prop="layerName">
        <el-input v-model="layerModel.layerName" :maxlength="50" placeholder="请输入图层文件别名"></el-input>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop, Watch, Model } from "vue-property-decorator"
import { FileType } from "~/enum/enum.config"
import { CommonService } from "~/utils/common.service"
import FileUpload from "~/components/common/file-upload.vue"
import { ValidatorService } from '@/utils/validator.service'
import { Form } from "element-ui"

@Component({
  components: {
    FileUpload
  }
})
export default class UploadImageLayer extends Vue {
  private compressedFileTypes = [FileType.compressed]

  // 图层组
  private layerList: any[] = []


  private layerModel = {
    fileId: "",
    layerName: ""
  }

  private rules = {
    layerName: { validator: this.validateFile }
  }

  public clear() {
    this.layerList = [];
    (this.$refs.form as Form).resetFields()
  }

  /**
   * 验证图层文件
   */
  public validate() {
    return (this.$refs.form as Form).validate()
  }

  /**
   * 获取图层文件数据
   */
  public getData() {
    // 有数据则校验
    if (this.layerList.length) {
      return this.layerModel
    }
    return null
  }

  private validateFile(rule, value, callback) {
    if (this.layerModel.fileId && !this.layerModel.layerName) {
      callback(new Error('请输入图层文件别名'))
    } else {
      callback()
    }
  }


  private onLayerUploadSuccess(id: string, data: any) {
    this.layerModel.fileId = data.id
    const originalName = data.originalName as string
    this.layerModel.layerName = originalName.slice(0, originalName.indexOf('.'))
  }

  @Watch("layerList.length")
  private onFileListChange(value) {
    if (value === 0) {
      this.layerModel.fileId = ""
      this.layerModel.layerName = ""
    }
  }

}
</script>

<style lang="less" scoped>
</style>
