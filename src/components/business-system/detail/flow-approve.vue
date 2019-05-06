<template>
  <section class="component flow-approve">
    <el-form :model="model" :rules="rules" label-width="90px" ref="form">
      <el-form-item label="审批结果" prop="status">
        <el-select v-model="model.status">
          <el-option v-for="{code,name} of $dict.getDictData('ApprovalStatus')" :key="code" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批意见" prop="comments">
        <el-input type="textarea" maxlength="300" v-model="model.comments"></el-input>
      </el-form-item>
    </el-form>
    <div class="operate-buttons">
      <el-button @click="onClose">取消</el-button>
      <el-button @click="onSubmit">确定</el-button>
    </div>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import UserSelect from "~/components/business-common/user-select.vue"
import { FlowInfoService } from "~/services/flow-info.service"
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'

@Component({
  components: {
    UserSelect
  }
})
export default class extends Vue {
  @Prop()
  private flowId!: string

  @Inject
  private service!: FlowInfoService

  private model = {
    status: "AGREE",
    comments: ""
  }

  private rules = {
    status: { required: true, message: "请选择审批意见" }
  }

  @Emit("close")
  private onClose() {
    (this.$refs.form as any).resetFields()
  }

  @Emit("success")
  private onSuccess() {
    this.$message.success("操作成功")
    this.onClose()
  }

  private onSubmit() {
    (this.$refs.form as any).validate(v => {
      if (!v) return
      const requestParam = new RequestParams({
        flowId: this.flowId,
        opinion: this.model.comments,
        status: this.model.status
      })
      this.service.flowApproval(requestParam).subscribe(this.onSuccess)
    })
  }
}
</script>


