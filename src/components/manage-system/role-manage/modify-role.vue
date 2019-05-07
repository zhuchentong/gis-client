<template>
  <section class="component modify-role">
    <el-form ref="form" :model="role" :rules="rules" label-width="100px">
      <el-form-item prop="roleName" label="角色名">
        <el-input v-model="role.roleName" placeholder="角色名"></el-input>
      </el-form-item>
      <el-form-item prop="roleStatus" label="角色状态">
        <el-select v-model="role.roleStatus" placeholder="角色状态" clearable>
          <el-option v-for="{code,name} of $dict.getDictData('CommonState')" :key="code" :label="name" :value="code">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="operate-buttons">
      <el-button @click="emitClose">取消</el-button>
      <el-button @click="commit">确定</el-button>
    </div>

  </section>
</template>

<script lang="ts">
import { Role } from "~/models/role.model"
import { Layout } from "~/core/decorator"
import { Component, Vue, Emit, Prop } from "vue-property-decorator"
import { Form } from 'element-ui'

@Component({
  components: {

  }
})
export default class ModifyRole extends Vue {

  @Prop({
    type: Role,
    default: () => new Role()
  })
  private role!: Role

  // 角色状态列表
  private rules: any = {
    roleName: { required: true, message: "请输入角色名" },
    roleStatus: { required: true, message: "请选择角色状态" }
  }


  @Emit("close")
  private emitClose() {
    const form = this.$refs["form"] as Form
    form.resetFields()
  }

  @Emit("success")
  private success() {
    this.$message.success("操作成功")
    this.emitClose()
  }


  /**
   * 提交数据
   */
  private commit() {
    const form = this.$refs["form"] as Form
    form.validate(valid => {
      if (!valid) return

      if (this.role.id) {
        // 编辑角色
        this.role.update().subscribe(this.success)
      } else {
        // 新增角色
        this.role.create().subscribe(this.success)
      }
    })
  }
}
</script>

<style lang="less" scoped>
</style>
