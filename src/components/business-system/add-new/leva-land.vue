<template>
  <!-- 征地 -->
  <el-form :model="model" :rules="rules" label-width="120px" ref="form" inline class="component leva-land">
    <el-form-item label="征地文号" prop="code">
      <el-input v-model="model.code" :maxlength="50" placeholder="请输入征地文号"></el-input>
    </el-form-item>
    <el-form-item label="征收日期" prop="levyTime">
      <el-date-picker v-model="model.levyTime" placeholder="请选择征收日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="批文编号" prop="grantName">
      <el-autocomplete v-model="grantInfo" value-key="code" placeholder="输入3个字符开始搜索" :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" @select="handleSelect"></el-autocomplete>
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
    code: "",
    levyTime: new Date(),
    grantName: "",
    grantId: ""
  }

  private rules = {
    code: { required: true, message: "请输入征地文号" },
    conturn: { required: true, message: "请输入信息" },
    useInfo: { required: true, message: "请输入信息" },
    grantName: [
      { required: true, message: "请输入批地编号" },
      { validator: this.validateGrantId }
    ]
  }

  public validate() {
    return (this.$refs.form as Form).validate()
  }

  public getData() {
    return { ...this.model, levyTime: this.$filter.dateFormat(this.model.levyTime) }
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

<style lang="less" scoped>
.component.report-land {
}
</style>


