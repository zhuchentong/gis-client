<template>
  <div class="layout fill" style="overflow:hidden;">
    <div class="header draggable">
      <el-button type="text" @click="onExit()">退出</el-button>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang = "ts">
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

<style lang="less">
@height: 40px;
.header {
  text-align: right;
  margin: 0 10px;
  height: @height;
}
.content {
  position: relative;
  height: calc(100% - @height);
}
</style>