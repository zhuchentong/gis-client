<template>
  <section class="page user-manage row no-warp">
    <div class="organization-tree">
      <department-tree v-model="currentDeptId" @selected-change="refreshData"></department-tree>
    </div>
    <div class="user-list col-span">
      <data-form ref="data-form" :model="queryModel" @onSearch="refreshData" :page="pageService">
        <template slot="inputs">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="queryModel.username" placeholder="用户名"></el-input>
          </el-form-item>
        </template>
      </data-form>

      <data-box ref="table" :data="dataSet" @onPageChange="refreshData" :page="pageService">
        <template slot="buttons">
          <el-button @click="addClick" :disabled="!currentDeptId">新增用户</el-button>
        </template>
        <template slot="columns">
          <!--数据列区域-->
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="userTitle" label="职称" :formatter="(row) => $filter.dictConvert(row.userTitle,'UserTitle')"></el-table-column>
          <el-table-column prop="userStatus" label="状态" :formatter="(row) => $filter.dictConvert(row.userStatus,'CommonState')"></el-table-column>
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <el-button type="text" @click="onRoleAllot(scope.row)">分配角色</el-button>
              <el-button type="text" @click="onResetPwd(scope.row)">密码重置</el-button>
              <el-button type="text" @click="editClick(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </template>
      </data-box>
    </div>

    <!--编辑用户-->
    <el-dialog :title="`${user.id ? '修改':'新增'}用户`" :center="true" :visible.sync="dialog.modifyUser" :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false">
      <modify-user :user="user" @close="dialog.modifyUser = false" @success="refreshData"></modify-user>
    </el-dialog>

    <!--分配角色-->
    <el-dialog title="分配角色" :center="true" :visible.sync="dialog.roleAllot" width="700px" :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false">
      <allot-role ref="allot-role" :user="user" @success="refreshData" @close="dialog.roleAllot = false"></allot-role>
    </el-dialog>

  </section>
</template>

<script lang="ts">
import { Layout } from "~/core/decorator"
import { Component, Vue } from "vue-property-decorator"
import { State, Mutation, Action, namespace } from "vuex-class"
import { OperatorsService } from "~/services/operators.service"
import { DepartmentModel } from "~/models/department.model"
import { User } from "~/models/user.model"
import { RequestParams } from "~/core/http/request-params"
import { PageService } from '~/extension/services/page.service'

import DataBox from "~/components/common/data-box.vue"
import DataForm from "~/components/common/data-form.vue"
import AllotRole from "~/components/manage-system/user-manage/allot-role.vue"
import ModifyUser from "~/components/manage-system/user-manage/modify-user.vue"
import DepartmentTree from "~/components/manage-system/department-manage/department-tree.vue"
import { CommonService } from "~/utils/common.service"


@Layout('workspace')
@Component({
  components: {
    DataForm,
    DataBox,
    ModifyUser,
    AllotRole,
    DepartmentTree
  }
})
export default class UserManage extends Vue {
  @State private userData
  private user = new User()

  private pageService = new PageService()
  private currentDeptId: string = ""
  private queryModel = new User()
  private dataSet: any[] = []
  private dialog: any = {
    modifyUser: false,
    roleAllot: false
  }

  /**
   * 加载数据
   */
  private refreshData() {
    // 因为departentTree 会返回选中的部门ID， 所以不必要再mounted的时候加载用户列表
    this.queryModel.departmentId = this.currentDeptId
    this.queryModel.getUserList(this.pageService).subscribe(
      data => this.dataSet = data.content
    )
  }


  /**
   * 分配角色
   */
  private onRoleAllot(data: any): any {
    this.user = new User()
    this.user.id = data.id
    this.user.roleIds = data.roleIds
    // 分配角色逻辑
    this.dialog.roleAllot = true
  }

  /**
   * 编辑用户
   */
  private editClick(data: any) {
    CommonService.revertData(this.user, data)
    this.dialog.modifyUser = true
  }

  private addClick() {
    this.user = new User()
    this.user.departmentId = this.currentDeptId
    this.dialog.modifyUser = true
  }


  /**
   * 重置密码
   */
  private onResetPwd(data: any): any {
    this.$confirm(`您确定要对用户[${data.username}]重置密码吗?`)
      .then(() => {
        CommonService.revertData(this.user, data)
        this.user.resetPassword().subscribe(
          () => this.$message.success('重置密码成功')
        )
      })
      .catch()
  }

}
</script>

<style lang="less" scoped>
.page.user-manage {
  .organization-tree {
    // flex-basis: 220px;
    width: 300px;
    overflow-x: auto;
  }
  .user-list {
    flex: 1;
  }
}
</style>

<style lang="less">
.page.user-manage {
  .organization-tree,
  .department-tree .el-tree {
    background-color: #f9f8f4;
  }
}
</style>