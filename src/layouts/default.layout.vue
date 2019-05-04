<template>
  <div class="layout fill" style="overflow:auto;">
    <div class="header draggable">
      <div class="layout-header-operate-block">
        <el-button type="text" @click="onExit()">退出</el-button>
      </div>
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
export default class DefaultLayout extends Vue {
  private onExit() {
    this.$electron.remote.process.exit(0)
  }
}
</script>

<style lang="less" scoped>
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