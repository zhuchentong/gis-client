<template>
  <div
    class="layout fill"
    style="overflow:hidden;"
  >
    <div class="header draggable row middle-span">
      <img
        class="logo"
        src="../assets/images/logo.png"
      >
      <div class="title">多规合一综合信息平台</div>
    </div>
    <div class="layout-header-operate-block header-text">
      <a @click="onExit()">退出</a>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class WorkspaceLayout extends Vue {
  private onExit() {
    const win = this.$electron.remote.getCurrentWindow()
    win && win.close()
  }
}
</script>

<style lang="less" scoped>
@height: 40px;
.header {
  text-align: right;
  padding: 0 10px;
  height: @height;
  background-image: url('../assets/images/layout/header-bg.png');
  background-size: 100% auto;

  .logo {
    height: 30px;
    margin: 0 10px;
  }

  .title {
    font-size: 18px;
    color: white;
    font-weight: bold;
  }
}

.header-text {
  a {
    color: white;
    line-height: 40px;
  }
}

.content {
  position: relative;
  height: calc(100% - @height);
}
</style>