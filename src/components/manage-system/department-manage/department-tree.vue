<template>
  <section class="component department-tree">
    <common-title :showIcon="false" title="部门数据">
      <template slot="append">
        <el-button type="text" @click="appendDepartment" v-show="!isView">增加部门</el-button>
      </template>
    </common-title>
    <el-tree :data="deptTreeData" node-key="id" ref="deptTree" :props="{label:'departmentName'}" :current-node-key="currentDeptId" highlight-current @current-change="onCurrentChange">
      <div slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="node-item" v-show="currentDeptId === data.id && !isView">
          <a @click="() => appendDepartment(data)" title="增加">
            <svg-icon iconName="add-round" iconSize="13" iconColor="#13227a"></svg-icon>
          </a>
          <a @click="() => editDepartment(node, data)" title="修改">
            <svg-icon iconName="edit-round" iconSize="13"></svg-icon>
          </a>
          <a @click="() => deleteDepartment(node, data)" title="删除">
            <svg-icon iconName="delete-round" iconSize="13" iconColor="red"></svg-icon>
          </a>
        </span>
      </div>
    </el-tree>

    <el-dialog :title="`${department.id ? '维护' : '添加'}部门`" :center="true" :visible.sync="dialog.modifyDepartment" :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false">
      <modify-department :department="department" @close="dialog.modifyDepartment = false"></modify-department>
    </el-dialog>

  </section>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Model } from "vue-property-decorator"
import { State, Mutation, Action, namespace } from "vuex-class"
import { DepartmentModel } from "~/models/department.model"
import { CommonService } from '@/utils/common.service'
import ModifyDepartment from "~/components/manage-system/department-manage/modify-department.vue"
import { Tree } from "element-ui"
import { RequestParams } from "~/core/http"
import { Inject } from "typescript-ioc"
import { DepartmentService } from "~/services/department.service"

const DepartmentModule = namespace('departmentModule')


@Component({
  components: {
    ModifyDepartment
  }
})
export default class DepartmentTree extends Vue {
  @DepartmentModule.Getter private deptTreeData!: any[]
  @DepartmentModule.Mutation private updateDeptData!: (data) => void
  @Model("selected-change") private currentDeptId!: string
  @Prop({ type: Boolean, default: false }) private isView!: boolean
  @Prop({ type: Boolean, default: false })
  private showUser!: boolean

  private department = new DepartmentModel()

  @Inject
  private service!: DepartmentService

  private dialog = {
    modifyDepartment: false
  }

  @Emit("selected-change")
  private emitSelectedDeptId(id) { return }

  private onCurrentChange(data: any) {
    this.emitSelectedDeptId(data.id)
  }

  private get showCraeteButton() {
    return this.deptTreeData && this.deptTreeData.length
  }

  /**
   * 新增
   */
  private appendDepartment(data?: any): void {
    this.department = new DepartmentModel()
    if (data) {
      this.department.parentId = data.id
    }
    this.dialog.modifyDepartment = true
  }

  /**
   * 编辑
   */
  private editDepartment(node: any, data: any): void {
    this.department.id = data.id
    this.department.parentId = data.parentId
    this.department.departmentName = data.departmentName
    this.dialog.modifyDepartment = true
  }

  /**
   * 删除组织机构
   */
  private deleteDepartment(node: any, department: any): void {
    this.$confirm(`您确定要删除[${department.departmentName}]吗?`)
      .then(() => {
        const options = { append: [department.id] }
        this.service.deleteDepartmentById(new RequestParams(null, options))
          .subscribe(() => {
            this.$message.success("操作成功")
            this.queryAllDeptData()
            this.emitSelectedDeptId("")
          })
      }).catch()
  }

  private mounted() {
    this.queryAllDeptData()
  }

  private queryAllDeptData() {
    this.service.getDepartmentList(new RequestParams(null))
      .subscribe(data => {
        this.updateDeptData(data)
        this.$nextTick(() => {
          if (this.deptTreeData.length) {
            const tree = this.$refs.deptTree as Tree
            const mountedNodeKey = this.deptTreeData[0].id
            tree.setCurrentKey(mountedNodeKey)
            this.emitSelectedDeptId(mountedNodeKey)
          }
        })
      })
  }
}
</script>
<style lang="less" scoped>
.component.department-tree {
  .node-item {
    vertical-align: text-top;
    display: inline-block;
    margin-left: 10px;
    > a {
      margin-left: 6px;
    }
  }
}
</style>

