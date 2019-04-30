<template>
  <!-- 批地 -->
  <el-form :model="model" :rules="rules" label-width="120px" ref="form" inline class="component approve-land">
    <el-form-item label="项目面积" prop="projectArea">
      <el-input v-model="model.projectArea"></el-input>
    </el-form-item>
    <el-form-item label="行政区" prop="conturn">
      <el-input v-model="model.conturn"></el-input>
    </el-form-item>
    <el-form-item label="土地用途" prop="useInfo">
      <el-input v-model="model.useInfo"></el-input>
    </el-form-item>
    <el-form-item label="备注信息" prop="remark">
      <el-input type="textarea" :rows="1" v-model="model.remark" class="inline-full-textarea"></el-input>
    </el-form-item>
    <el-form-item label="批文编号" prop="remark">
      <el-input v-model="model.remark"></el-input>
    </el-form-item>
    <el-form-item label="批复日期" prop="remark">
      <el-input v-model="model.remark"></el-input>
    </el-form-item>
    <el-form-item label="批复结果" prop="remark">
      <el-input v-model="model.remark"></el-input>
    </el-form-item>
    <el-form-item label="批复信息" prop="remark">
      <el-input type="textarea" :rows="1" v-model="model.remark" class="inline-full-textarea"></el-input>
    </el-form-item>
  </el-form>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import { Form } from "element-ui"

@Component({
  components: {
    DataBox
  }
})
export default class extends Vue {

  private model = {
    projectArea: "",
    conturn: "",
    useInfo: "",
    remark: ""
  }

  private rules = {
    projectArea: { required: true, message: "请输入信息" },
    conturn: { required: true, message: "请输入信息" },
    useInfo: { required: true, message: "请输入信息" },
    remark: { required: true, message: "请输入信息" }
  }

  public validate() {
    return (this.$refs.form as Form).validate()
  }

  public getData() {
    return { ...this.model }
  }

  public reset() {
    (this.$refs.form as Form).resetFields()
  }

}
</script>

<style lang="less" scoped>
.component.report-land {
}
</style>


