<template>
  <section class="component create-new-business">
    <common-title title="基本信息"></common-title>
    <el-form :model="baseModel" :rules="baseRules" inline label-width="120px" ref="baseForm">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="baseModel.name" :maxlength="50" clearable></el-input>
      </el-form-item>
      <el-form-item label="项目类型" prop="type">
        <el-select v-model="baseModel.type" clearable @change="onTypeChange">
          <el-option v-for="item of baseInfoConfig" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目面积" prop="acreage">
        <el-input v-model="baseModel.acreage" type="number" :min="0.1" :max="100000">
          <span slot="append">亩</span>
        </el-input>
      </el-form-item>
      <el-form-item label="行政区" prop="region">
        <district v-model="baseModel.region"></district>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input type="textarea" :rows="1" :maxlength="250" v-model="baseModel.remark" class="inline-full-textarea"></el-input>
      </el-form-item>
    </el-form>
    <common-title v-if="currentBase" title="业务信息"> </common-title>
    <component v-if="currentBase" :is="currentBase.component" :ref="baseModel.type"></component>
    <common-title title="流程审批" iconName="flow"></common-title>
    <el-form :model="baseModel" inline label-width="120px" ref="whether-form">
      <el-form-item label="是否开启流程" prop="whether">
        <el-radio-group v-model="baseModel.whether">
          <el-radio v-for="{code,name} of $dict.getDictData('CommonShow')" :key="code" :label="code">{{name}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="baseModel.whether === 'YES'" label="审核人员" prop="nextUserId">
        <user-select v-model="baseModel.nextUserId"></user-select>
      </el-form-item>
    </el-form>
    <upload-attach :attachFileDataSet="attachDataList" ref="upload-attach"></upload-attach>
    <upload-layer ref="upload-layer"></upload-layer>
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
import District from "~/components/business-common/district.vue"
import { CreateBusinessModel } from "~/models/create-business.model"
import UserSelect from "~/components/business-common/user-select.vue"

@Component({
  components: {
    DataBox,
    ...NewBusinessComponents,
    UploadAttach,
    UploadLayer,
    District,
    UserSelect
  }
})
export default class extends Vue {
  private baseInfoConfig = BaseInfoConfig
  private currentBase: any | null = null
  private attachDataList: any[] = []
  // 基础信息
  private baseModel = new CreateBusinessModel()

  private baseRules = {
    name: { required: true, message: "请输入项目名称" },
    type: { required: true, message: "请选择项目类型" },
    region: { required: true, message: "请选择项目所在行政区" },
    acreage: [
      { required: true, message: "请输入项目面积" },
      { min: 0.1, message: "请输入正确的面积", target: "blur" }
    ]
  }

  @Emit('close')
  private onClose() {
    let c: any = this.$refs.baseForm
    c.resetFields()
    c = this.$refs['whether-form']
    c.resetFields()
    this.attachDataList = []
    c = this.$refs["upload-attach"]
    c.clear()
    c = this.$refs["upload-layer"]
    c.clear()
    this.currentBase = null
  }

  @Emit('success')
  private onSuccess() {
    this.$message.success(`${this.currentBase.label}业务操作成功`)
    this.onClose()
  }

  /**
   * 切换业务组件
   */
  private onTypeChange(type) {
    this.currentBase = BaseInfoConfig.find(x => x.value === type)
  }

  /**
   * 提交操作
   */
  private async onSubmit() {
    let tmpComponent: any = this.$refs.baseForm
    let result = await tmpComponent.validate().then(v => v).catch(v => v)
    if (!result) return
    tmpComponent = this.$refs[this.baseModel.type]
    result = await tmpComponent.validate().then(v => v).catch(v => v)
    if (!result) return
    tmpComponent = this.$refs['upload-layer'] as UploadLayer
    result = await tmpComponent.validate().then(v => v).catch(v => v)
    if (!result) return

    this.saveData()
  }

  /**
   * 获取组件数据 并保存
   */
  private saveData() {
    const tmpComponent: any = this.$refs[this.baseModel.type]
    const data = tmpComponent.getData()

    const layerComponent = this.$refs['upload-layer'] as UploadLayer
    const layerData = layerComponent.getData()

    this.baseModel.createBusiness(data, this.attachDataList, layerData)
      .subscribe(this.onSuccess)
  }

}
</script>


<style lang="less">
.component.create-new-business {
  .el-form .el-form-item .el-form-item__content .inline-full-textarea {
    width: 500px;
  }
}
</style>

