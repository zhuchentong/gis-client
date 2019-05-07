<template>
  <section class="component modify-layer" v-loading="loading">
    <el-form ref="form" :model="layer" :rules="rules" label-width="120px">
      <el-form-item prop="fileId" label="图层文件">
        <file-upload ref="upload" :fileNumberLimit="1" :fileSizeLimit="150" :AllowExtension="compressedFileTypes" :fileList.sync="fileList" @update:fileList="onFileListChange" @onUploadSuccess="onUploadSuccess">上传图层</file-upload>
      </el-form-item>
      <el-form-item prop="layerName" label="图层名称">
        <el-input v-model="layer.layerName" :maxlength="50" placeholder="请输入图层名称"></el-input>
      </el-form-item>
      <el-form-item prop="groupId" label="所属分组">
        <el-select v-model="layer.groupId" placeholder="请选择图层所属分组">
          <el-option v-for="{id,groupName} of groupList" :key="id" :label="groupName" :value="id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="layerRemark" label="图层说明">
        <el-input type="textarea" class="large" :maxlength="200" v-model="layer.layerRemark"></el-input>
      </el-form-item>
    </el-form>
    <div class="operate-buttons">
      <el-button @click="emitClose">取消</el-button>
      <el-button @click="commit">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator"
import { namespace } from "vuex-class"
import { Form } from "element-ui"
import { LayerInfo } from "~/models/layer-info.model"
import { FileType } from "~/enum/enum.config"
import DataBox from "~/components/common/data-box.vue"
import FileUpload from "~/components/common/file-upload.vue"
import CommonTitle from "~/components/common/common-title.vue"

const LayerGroupModule = namespace('layerGroupModule')

@Component({
  components: {
    FileUpload,
    DataBox,
    CommonTitle
  }
})
export default class ModifyLayer extends Vue {
  @LayerGroupModule.Getter('getListByManageLayers') private groupList!: any[]

  @Prop({
    type: LayerInfo,
    default: () => new LayerInfo()
  })
  private layer!: LayerInfo
  private compressedFileTypes = [FileType.compressed]
  private loading = false
  private fileList: any[] = []
  private attachFileDataSet: any[] = []
  private rules = {
    layerName: { required: true, message: "请输入图层名称" },
    fileId: { required: true, message: "请上传文件" },
    groupId: { required: true, message: "请选择图层所属分组" }
  }

  @Emit("close")
  private emitClose() {
    const form = this.$refs.form as Form
    form.resetFields()
    const upload = this.$refs.upload as FileUpload
    upload.reset()

    // 清空附件
    this.attachFileDataSet = []
  }

  @Emit("success")
  private emitSuccess() {
    this.loading = false
    this.$message.success("操作成功")
    this.emitClose()
  }


  private commit() {
    const form = this.$refs.form as Form
    form.validate(v => {
      if (!v) return

      this.loading = true
      this.layer
        .saveLayer()
        .subscribe(this.emitSuccess, () => (this.loading = false))
    })
  }

  private onUploadSuccess() {
    this.layer.fileId = this.fileList[0].response.id
    const form = this.$refs.form as Form
    form.validateField("fileId", () => { return })
  }

  private onFileListChange(files) {
    if (!files.length) this.layer.fileId = ""
  }
}
</script>

<style lang="less" scoped>
</style>
