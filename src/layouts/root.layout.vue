<template>
  <div class="default-layout fill" style="overflow:auto;">
    <div class="header draggable">
      <div class="layout-header-operate-block">
        <el-dropdown
          @command="handleCommand"
          class="user-setting"
          trigger="click"
        >
          <span>
            您好, {{ userData.username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="user-setting">
            <el-dropdown-item icon="el-icon-edit" command="password"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-circle-close" command="logout"
              >注销</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="text" @click="onExit()">退出</el-button>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
    <el-dialog
      title="修改密码"
      :center="true"
      :visible.sync="dialog.password"
      width="450px"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <modify-password
        @close="dialog.password = false"
        @success="modifySuccess"
      ></modify-password>
    </el-dialog>
  </div>
</template>

<script lang = "ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import { WindowSize } from '@/config/enum.config'
import ModifyPassword from "~/components/manage-system/modify-password.vue"

@Component({
  components: {
    ModifyPassword
  }
})
export default class RootLayout extends Vue {
  @Action private clearUserLoginData!: () => boolean
  @State private userData!: any

  private dialog = {
    password: false
  }

  private onExit() {
    this.$electron.remote.process.exit(0)
  }

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

  private handleCommand(command) {
    switch (command) {
      case 'password':
        this.dialog.password = true
        break
      case 'logout':
        this.onLogout()
        break
    }
  }

  private modifySuccess() {
    this.$confirm("是否重新登录?").then(() => {
      this.onLogout()
    }).catch()
  }
}
</script>
<style lang="less">
.default-layout {
  .header {
    .el-button--text {
      color: white;
    }
  }
  .user-setting {
    position: relative;
    color: white;
    margin-right: 20px;
  }
}
</style>


<style lang="less" scoped>
@height: 40px;
.default-layout {
  background: url('../assets/images/home/background.png');
  background-size: 100% auto;
}
.header {
  text-align: right;
  margin: 0 10px;
  height: @height;
  color: white;
}
.content {
  position: relative;
  height: calc(100% - @height);
}
</style>