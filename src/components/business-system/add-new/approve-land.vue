<template>
  <!-- 批地 -->
  <el-form :model="model" :rules="rules" label-width="120px" ref="form" inline class="component approve-land">
    <el-form-item label="批文编号" prop="code">
      <el-input v-model="model.code" placeholder="请输入批文编号"></el-input>
    </el-form-item>
    <el-form-item label="报地项目" prop="reportName">
      <el-autocomplete v-model="reportInfo" value-key="name" placeholder="输入3个字符开始搜索" :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" @select="handleSelect"></el-autocomplete>
    </el-form-item>
    <el-form-item label="批复日期" prop="grantTime">
      <el-date-picker v-model="model.grantTime" placeholder="请选择批复日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="批复结果" prop="result">
      <el-select v-model="model.result">
        <el-option v-for="{code,name} of $dict.getDictData('ApprovalStatus')" :key="code" :label="name" :value="code"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="批复信息" prop="grantRemark">
      <el-input type="textarea" :rows="1" v-model="model.grantRemark" placeholder="请输入批复信息" class="inline-full-textarea"></el-input>
    </el-form-item>
  </el-form>
</template>

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
    code: "",
    grantTime: new Date(),
    result: "",
    grantRemark: "",
    reportId: "",
    reportName: ""
  }

  private rules = {
    code: { required: true, message: "请输入批文编号" },
    grantTime: { required: true, message: "请选择批复日期" },
    result: { required: true, message: "请选择批复结果" },
    grantRemark: { required: true, message: "请输入批复信息" },
    reportName: [
      { required: true, message: "请输入报地项目" },
      { validator: this.validateReport }
    ]
  }

  private get reportInfo() {
    return this.model.reportName
  }

  private set reportInfo(value) {
    this.model.reportName = value
    if (!value) this.model.reportId = ""
  }



  public validate() {
    return (this.$refs.form as Form).validate()
  }

  public getData() {
    return { ...this.model, grantTime: this.$filter.dateFormat(this.model.grantTime) }
  }

  public reset() {
    (this.$refs.form as Form).resetFields()
  }

  private validateReport(rule, value, callback) {
    if (!value || !this.model.reportId) {
      callback(new Error("请选择报地项目"))
    } else {
      callback()
    }
  }

  private handleSelect(item) {
    this.reportInfo = item.name
    this.model.reportId = item.id
  }

  private querySearchAsync(queryStr, callback) {
    this.model.reportId = ""
    if (queryStr.length < 3) callback([])
    this.businessModel.getReportByName(queryStr).subscribe(callback)
  }

}
</script>


