<template>
  <!-- 供地 -->
  <el-form :model="model" :rules="rules" label-width="120px" ref="form" inline class="component provide-land">
    <el-form-item label="宗地编号" prop="supplyCode">
      <el-input v-model="model.supplyCode"></el-input>
    </el-form-item>
    <el-form-item label="供地方式" prop="supplyWay">
      <el-select v-model="model.supplyWay">
        <el-option v-for="{code,name} of $dict.getDictData('ProvisionType')" :key="code" :label="name" :value="code"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="供地文号" prop="code">
      <el-input v-model="model.code"></el-input>
    </el-form-item>
    <el-form-item label="供地日期" prop="supplyTime">
      <el-date-picker v-model="model.supplyTime" placeholder="请选择供地日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="批文编号" prop="grantName">
      <el-autocomplete v-model="grantInfo" value-key="code" placeholder="输入3个字符开始搜索" :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" @select="handleSelect"></el-autocomplete>
    </el-form-item>
    <el-form-item label="发布公告" prop="notice">
      <el-select v-model="model.notice">
        <el-option v-for="{code,name} of $dict.getDictData('CommonShow')" :key="code" :label="name" :value="code"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="土地用途" prop="nature">
      <el-select v-model="model.nature">
        <el-option v-for="{code,name} of $dict.getDictData('LandNature')" :key="code" :label="name" :value="code"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="具体地址" prop="address">
      <el-input type="textarea" :rows="1" :maxlength="250" v-model="model.address" class="inline-full-textarea"></el-input>
    </el-form-item>
  </el-form>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import { Form } from "element-ui"
import { CreateBusinessModel } from "~/models/create-business.model"

@Component({
  components: {
    DataBox
  }
})
export default class extends Vue {
  private businessModel = new CreateBusinessModel()

  private model = {
    supplyCode: "",
    supplyWay: "",
    code: "",
    supplyTime: "",
    grantName: "",
    grantId: "",
    notice: "",
    nature: "",
    address: ""
  }

  private rules = {
    supplyCode: { required: true, message: "请输入宗地编号" },
    supplyWay: { required: true, message: "请选择供地方式" },
    supplyTime: { required: true, message: "请选择供地日期" },
    code: { required: true, message: "请输入供地文号" },
    notice: { required: true, message: "请选择是否发布公告" },
    nature: { required: true, message: "请选择土地用途" },
    grantName: [
      { required: true, message: "请输入批地编号" },
      { validator: this.validateGrantId }
    ]
  }

  public validate() {
    return (this.$refs.form as Form).validate()
  }

  public getData() {
    return { ...this.model, supplyTime: this.$filter.dateFormat(this.model.supplyTime) }
  }

  public reset() {
    (this.$refs.form as Form).resetFields()
  }


  private get grantInfo() {
    return this.model.grantName
  }
  private set grantInfo(value) {
    this.model.grantName = value
    if (!value) this.model.grantId = ""
  }

  private validateGrantId(rule, value, callback) {
    if (!value || !this.model.grantId) {
      callback(new Error("请选择批地项目"))
    } else {
      callback()
    }
  }

  private handleSelect(item) {
    this.model.grantName = item.code
    this.model.grantId = item.id
  }

  private querySearchAsync(queryStr, callback) {
    this.model.grantId = ""
    if (queryStr.length < 3) callback([])
    this.businessModel.getGrantInfoByCode(queryStr).subscribe(callback)
  }

}
</script>
