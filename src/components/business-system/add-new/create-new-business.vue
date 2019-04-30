<template>
  <section class="component create-new-business">
    <common-title title="基本信息" :showIcon="false"></common-title>
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
    <common-title title="附件材料" :showIcon="false">
      <el-button @click="appendAttach">新增附件</el-button>
    </common-title>
    <data-box :data="attachDataSet" :maxHeight="120">
      <template slot="columns">
        <el-table-column label="原始文件名" prop="originName"></el-table-column>
        <el-table-column label="文件名称" prop="fileName"></el-table-column>
        <el-table-column label="扩展名称" prop="extensionName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="() => attachDataSet.splice(scope.$index,1)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <common-title title="图层数据" :showIcon="false">
    </common-title>
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
import FileUpload from "~/components/common/file-upload.vue"

@Component({
  components: {
    DataBox,
    ...NewBusinessComponents,
    FileUpload
  }
})
export default class extends Vue {
  private baseInfoConfig = BaseInfoConfig
  private currentBase: any | null = null
  private attachDataSet: any[] = []

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
    const form: any = this.$refs.baseForm
    form.resetFields()
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

  private appendAttach() {
    // 
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

