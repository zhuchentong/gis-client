<template>
  <!-- 报地 -->
  <el-form :model="model" :rules="rules" label-width="120px" ref="form" inline class="component report-land">
    <el-form-item label="申报日期" prop="applyTime">
      <el-date-picker v-model="model.applyTime"></el-date-picker>
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
    applyTime: new Date()
  }

  private rules = {
    applyTime: { required: true, message: "请选择申报日期" }
  }

  public validate() {
    return (this.$refs.form as Form).validate()
  }

  public getData() {
    return {
      applyTime: this.$filter.dateFormat(this.model.applyTime)
    }
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


