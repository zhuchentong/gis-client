<template>
  <section class="component upload-layer">
    <common-title title="图层文件" iconName="shp-buffer">
      <template slot="append">
        <file-upload ref="layer-upload" :fileList.sync="layerList" :fileNumberLimit="1" :showFileList="false" :AllowExtension="compressedFileTypes" @onUploadSuccess="onLayerUploadSuccess">上传图层</file-upload>
      </template>
    </common-title>
    <data-box class="select-data-box" :data="layerFileDataSet" :hiddenIndex="false" :maxHeight="80">
      <template slot="columns">
        <el-table-column prop="originalName" label="文件名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="layerName" label="图层名称" align="center" width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.layerName" placeholder="请输入图层名称" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="操作" align="center" width="90px">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteLayerFile(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop, Watch, Model } from "vue-property-decorator"
import { FileType } from "~/enum/enum.config"
import { CommonService } from "~/utils/common.service"
import DataBox from "~/components/common/data-box.vue"
import FileUpload from "~/components/common/file-upload.vue"
import { ValidatorService } from '@/utils/validator.service'

@Component({
  components: {
    DataBox,
    FileUpload
  }
})
export default class UploadImageLayer extends Vue {
  private compressedFileTypes = [FileType.compressed]

  // 图层组
  private layerList: any[] = []

  @Prop({ default: () => new Array<any>() })
  private layerFileDataSet!: any[]

  public validate() {
    if (!this.layerFileDataSet.length) {
      this.$message(`请上传图层文件`)
      return Promise.resolve(false)
    }

    const r = {
      fileId: { required: true, message: "请上传图层文件" },
      layerName: { required: true, message: "请输入图层名称" }
    }
    const validates = this.layerFileDataSet.map(v => {
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

  public clear(){
    (this.$refs['layer-upload'] as FileUpload).reset()
  }

  /**
   * 图层上传成功
   */
  private onLayerUploadSuccess(id: string, data: any) {
    this.layerFileDataSet.push({
      fileId: data.id,
      originalName: data.originalName,
      layerName: ""
    })
  }


  /**
   * 删除图层
   */
  private deleteLayerFile(file) {
    const fileId = file.fileId
    this.layerFileDataSet.splice(
      this.layerFileDataSet.findIndex(item => item.id === fileId),
      1
    )
    this.layerList.splice(
      this.layerList.findIndex(x => x.response.id === fileId),
      1
    )
  }
}
</script>

<style lang="less" scoped>
</style>
