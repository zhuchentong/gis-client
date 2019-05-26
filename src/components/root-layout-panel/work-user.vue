<template>
  <section class="component work-user">
    <el-dropdown @command="dropdownClickHandle" trigger="click">
      <div class="row middle-span">
        <svg-icon iconName="user"></svg-icon>
        <span class="user-name">欢迎您, {{ userData.username }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="password"
          >修改密码</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-refresh" command="logout"
          >注销</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-circle-close" command="exit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog :visible.sync="dialog.password" width="500px" title="修改密码">
      <modify-password
        @close="dialog.password = false"
        @success="modifySuccess"
      ></modify-password>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { State, Mutation, Action, namespace } from "vuex-class"
import { ReminderService } from '@/utils/reminder.service'
import { District } from "~/models/district.model"
import { LayerGroup } from "~/models/layer-group.model"
import ModifyPassword from "~/components/root-layout-panel/modify-password.vue"

const DistrictModule = namespace('districtModule')

@Component({
  components: {
    ModifyPassword
  }
})
export default class WorkUser extends Vue {
  @State private userData!: any
  @Action private clearUserLoginData!: () => void
  @DistrictModule.Mutation private updateDistrictData!: (data) => void

  private dialog = {
    password: false
  }

  private dropdownClickHandle(command) {
    switch (command) {
      case "exit":
        this.clearUserLoginData()
        this.$electron.remote.process.exit(0)
        break
      case "password":
        this.dialog.password = true
        break
      case "logout": {
        this.onLogout()
        break
      }
    }
  }

  private mounted() {
    // 更新行政区划信息
    new District().getDistrictList().subscribe(this.updateDistrictData)
  }

  /**
   * 退出登录
   */
  private onLogout() {
    this.clearUserLoginData()
    this.$window.open(
      'login',
      {
        width: 500,
        height: 400,
        maximizable: false
      },
      {
        replace: true
      },
      this
    )
  }

  private modifySuccess() {
    this.$confirm("是否重新登录?").then(() => {
      this.onLogout()
    }).catch()
  }
}
</script>

<style lang="less" scoped>
.component.work-user {
  .user-photo {
    width: 24px;
    margin-right: 5px;
  }
  .user-name {
    color: #ffc876;
  }
}
</style>
