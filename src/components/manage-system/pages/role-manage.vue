<template>
  <section class="page role-manage">
    <data-form ref="data-form" :model="queryModel" @onSearch="refreshData" :page="pageService">
      <template slot="inputs">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryModel.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="roleStatus">
          <el-select v-model="queryModel.roleStatus" placeholder="角色状态" clearable>
            <el-option v-for="{code,name} of $dict.getDictData('CommonState')" :key="code" :label="name" :value="code">
            </el-option>
          </el-select>
        </el-form-item>
      </template>

    </data-form>

    <data-box ref="table" :data="dataSet" @onPageChange="refreshData" :page="pageService">
      <template slot="buttons">
        <el-button @click="addClick">新增角色</el-button>
      </template>
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column label="角色名" prop="roleName"></el-table-column>
        <el-table-column prop="roleStatus" label="角色状态" :formatter="row => $filter.dictConvert(row.roleStatus,'CommonState')">
        </el-table-column>
        <el-table-column label="操作" :min-width="$helper.getOperateWidth(3)">
          <template slot-scope="scope">
            <el-button type="text" @click="onModulePermission(scope.row)">分配权限</el-button>
            <el-button type="text" @click="editClick(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>

    <!--编辑角色-->
    <el-dialog :title="`${role.id? '修改': '新增'}角色`" :center="true" :visible.sync="dialog.modifyRole" :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false">
      <modify-role :role="role" @close="dialog.modifyRole = false" @success="refreshData"></modify-role>
    </el-dialog>

    <!--分配权限-->
    <el-dialog title="分配权限" :center="true" :visible.sync="dialog.modulePermission" :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false">
      <module-permission ref="module-permission" :role="role" @close="dialog.modulePermission=false" @success="refreshData"></module-permission>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import { Layout } from "~/core/decorator"
import { Component, Vue } from "vue-property-decorator"
import { Role } from "~/models/role.model"
import { RequestParams } from "~/core/http/request-params"
import { PageService } from "~/extension/services/page.service"
import { SortService } from "~/extension/services/sort.service"

import DataForm from "~/components/common/data-form.vue"
import DataBox from "~/components/common/data-box.vue"
import ModifyRole from "~/components/manage-system/role-manage/modify-role.vue"
import ModulePermission from "~/components/manage-system/role-manage/module-permission.vue"

@Layout("workspace")
@Component({
  components: {
    DataForm,
    DataBox,
    ModifyRole,
    ModulePermission
  }
})
export default class RoleManage extends Vue {
  private role = new Role()
  private queryModel = new Role()
  private pageService = new PageService()

  private dataSet: any[] = []
  private dialog: any = {
    modifyRole: false,
    modulePermission: false
  }

  private mounted() {
    this.refreshData()
  }

  /**
   * 加载数据
   */
  private refreshData() {
    this.queryModel.query(this.pageService).subscribe(data => {
      this.dataSet = data.content
    })
  }

  /**
   * 新增角色
   */
  private addClick() {
    this.role = new Role()
    this.dialog.modifyRole = true
  }

  /**
   * 分配权限
   */
  private onModulePermission(data: any): any {
    // 分配角色逻辑
    this.role.id = data.id
    this.role.resourceIds = data.resourceIds
    this.dialog.modulePermission = true
  }

  /**
   * 编辑角色
   */
  private editClick(data: any): any {
    this.role.id = data.id
    this.role.roleName = data.roleName
    this.role.roleStatus = data.roleStatus
    this.dialog.modifyRole = true
  }

  /**
   * 删除角色
   */
  private deleteClick(data: any): any {
    this.$confirm(`确认要删除角色【${data.roleName}】吗?`)
      .then(() => {
        this.role.id = data.id
        this.role.delete().subscribe(this.refreshData)
      }).catch()
  }
}
</script>

<style lang="less" scoped>
</style>
