<template>
  <section class="component modify-user">
    <el-form ref="form" :model="user" :rules="rules" label-width="100px">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="user.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="departmentId" label="所属部门">
        <el-cascader v-model="departId" :props="{label:'departmentName',value:'id'}" :options="deptTreeData" placeholder="上级部门名称" change-on-select clearable :show-all-levels="false" :disabled="!user.id">
        </el-cascader>
      </el-form-item>
      <el-form-item prop="userTitle" label="职称">
        <el-select v-model="user.userTitle">
          <el-option v-for="{code,name} of $dict.getDictData('UserTitle')" :key="code" :value="code" :label="name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="userStatus" label="状态">
        <el-select v-model="user.userStatus">
          <el-option v-for="{code,name} of $dict.getDictData('CommonState')" :key="code" :value="code" :label="name"></el-option>
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
import { User } from "~/models/user.model"
import { Component, Vue, Emit, Prop } from "vue-property-decorator"
import { namespace } from "vuex-class"
import { Form } from 'element-ui'

const DepartmentModule = namespace('departmentModule')

@Component({
  components: {

  }
})
export default class ModifyUser extends Vue {
  @DepartmentModule.Getter private deptTreeData!: any[]
  @DepartmentModule.Getter private getParents!: (id) => string[]

  private rules: any = {
    username: { required: true, message: "请输入用户名" },
    departmentId: { required: true, message: "请选择归属部门" }
  }


  @Prop({
    type: User,
    default: () => new User()
  })
  private user!: User


  @Emit("close")
  private emitClose() {
    const form: any = this.$refs["form"]
    form.resetFields()
  }

  @Emit("success")
  private emitSuccess() {
    this.$message.success("操作成功")
    this.emitClose()
  }

  private get departId() {
    return this.getParents(this.user.departmentId)
  }

  private set departId(val) {
    this.user.departmentId = val.length ? val[val.length - 1] : ""
  }

  private commit() {
    const form = this.$refs.form as Form
    form.validate(v => {
      if (!v) return
      if (this.user.id) {
        this.user.update().subscribe(this.emitSuccess)
      } else {
        this.user.create().subscribe(this.emitSuccess)
      }
    })
  }


}
</script>

<style lang="less" scoped>
</style>
