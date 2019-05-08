<template>
  <div
    class="default-layout fill"
    style="overflow:auto;"
  >
    <div class="header draggable">
      <div class="layout-header-operate-block">
        <el-button
          color="white"
          type="text"
          @click="onLogout()"
        >注销</el-button>
        <el-button
          type="text"
          @click="onExit()"
        >退出</el-button>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang = "ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { WindowSize } from '@/config/enum.config'

@Component({
  components: {}
})
export default class RootLayout extends Vue {
  @Action private clearUserLoginData!: () => boolean

  private onExit() {
    this.$electron.remote.process.exit(0)
  }

  private onLogout() {
    this.clearUserLoginData()
    this.$window.open(
      'login',
      {
        width: 500,
        height: 400
      },
      {
        replace: true
      },
      this
    )
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