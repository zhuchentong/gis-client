<template>
  <section class="component create-new-business">
    <common-title title="基本信息"></common-title>
    <el-form :model="baseModel" :rules="baseRules" inline label-width="120px" ref="baseForm">
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="baseModel.projectName" :maxlength="50" clearable></el-input>
      </el-form-item>
      <el-form-item label="项目类型" prop="projectType">
        <el-select v-model="baseModel.projectType" clearable @change="onProjectTypeChange">
          <el-option v-for="item of baseInfoConfig" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <component v-if="currentBase" :is="currentBase.component" :ref="baseModel.projectType"></component>
    <upload-attach :attachFileDataSet="attachDataSet" ref="upload-attach"></upload-attach>
    <upload-layer  :layerFileDataSet="layerDataList" ref="upload-layer"></upload-layer>
    <div class="operate-buttons">
      <el-button @click="onClose">取消</el-button>
      <el-button @click="onSubmit">提交</el-button>
    </div>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch, Emit } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import { NewBusinessComponents, BaseInfoConfig } from "~/components/business-system/business-system.config"
import UploadAttach from "~/components/business-common/upload-attach.vue"
import UploadLayer from "~/components/business-common/upload-layer.vue"

@Component({
  components: {
    DataBox,
    ...NewBusinessComponents,
    UploadAttach,
    UploadLayer
  }
})
export default class extends Vue {
  private baseInfoConfig = BaseInfoConfig
  private currentBase: any | null = null
  private attachDataSet: any[] = []
  private layerDataList:any[] = []

  private baseModel = {
    projectName: "",
    projectType: ""
  }

  private baseRules = {
    projectName: { required: true, message: "请输入项目名称" },
    projectType: { required: true, message: "请选择项目类型" },
  }

  @Emit('close')
  private onClose() {
    let c: any = this.$refs.baseForm
    c.resetFields()
    this.attachDataSet = []
    c = this.$refs["upload-attach"]
    c.clear()
    this.layerDataList = []
    c = this.$refs["upload-layer"]
    c.clear()
    this.currentBase = null
  }

  @Emit('success')
  private onSuccess() {
    this.$message.success(`${this.currentBase.label}业务操作成功`)
    this.onClose()
  }

  private onProjectTypeChange(type) {
    this.currentBase = BaseInfoConfig.find(x => x.value === type)
  }


  private async onSubmit() {
    let form: any = this.$refs.baseForm
    let result = await form.validate().then(v => v).catch(v => v)
    if (!result) return
    form = this.$refs[this.baseModel.projectType]
    result = await form.validate().then(v => v).catch(v => v)
    if (!result) return
    this.saveData(form.getData())
  }

  private saveData(baseTypeData: any) {
    const saveData = { ...this.baseModel, ...baseTypeData }
    this.onSuccess()
  }

}
</script>

<style lang="less" scoped>
.component.create-new-business {
}
</style>

<style lang="less">
.component.create-new-business {
  .el-form .el-form-item .el-form-item__content .inline-full-textarea {
    width: 500px;
  }
}
</style>

