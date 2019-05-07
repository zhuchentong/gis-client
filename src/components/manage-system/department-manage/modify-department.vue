<template>
  <section class="component modify-department">
    <el-form ref="form" :model="department" :rules="rules" label-width="120px">
      <el-form-item prop="departmentName" label="部门名称">
        <el-input v-model="department.departmentName" placeholder="部门名称"></el-input>
      </el-form-item>
      <el-form-item prop="parentId" label="上级部门">
        <el-cascader v-model="parents" :props="{label:'departmentName',value:'id'}" :options="deptTreeData" placeholder="上级部门名称" change-on-select clearable>
        </el-cascader>
      </el-form-item>

    </el-form>
    <div class="operate-buttons">
      <el-button @click="emitClose">取消</el-button>
      <el-button @click="commit">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import { DepartmentModel } from "~/models/department.model"
import { Component, Vue, Emit, Prop } from "vue-property-decorator"
import { State, Mutation, Action, namespace } from "vuex-class"
import { CommonService } from '@/utils/common.service'
import { RequestParams } from "~/core/http"
import { Inject } from "typescript-ioc"
import { DepartmentService } from "~/services/department.service"

const DepartmentModule = namespace('departmentModule')

@Component({
  components: {}
})
export default class ModifyDepartment extends Vue {
  @DepartmentModule.Getter private deptTreeData!: any[]
  @DepartmentModule.Getter private getParents!: (id) => any
  @DepartmentModule.Mutation private updateDeptData!: (data) => void


  @Prop({ type: DepartmentModel, default: () => new DepartmentModel() })
  private department!: DepartmentModel


  @Inject
  private service!: DepartmentService

  private deptList: any[] = []
  private rules: any = {
    departmentName: { required: true, message: "请输入部门名称" }
  }


  private get parents() {
    return this.getParents(this.department.parentId)
  }

  private set parents(val) {
    this.department.parentId = val.length ? val[val.length - 1] : ""
  }

  /**
   * 提交数据
   */
  private commit() {
    const form: any = this.$refs["form"]
    form.validate(valid => {
      if (!valid) return
      this.service.saveDepartment(new RequestParams(this.department)).subscribe(this.onSuccess)
    })
  }

  @Emit("close")
  private emitClose() {
    const form: any = this.$refs["form"]
    form.resetFields()
  }

  private onSuccess(data) {
    this.$message.success("操作成功")
    this.updateDeptData(data)
    this.emitClose()
  }
}
</script>

<style lang="less" scoped>
</style>
