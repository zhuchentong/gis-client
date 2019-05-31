<template>
  <div class="default-layout fill" style="overflow:auto;">
    <div class="header ">
      <div class="layout-header-operate-block row">
        <work-message class="work-tool"></work-message>
        <work-user class="work-tool"></work-user>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang = "ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import { WindowSize } from '@/config/enum.config'
import ModifyPassword from '~/components/root-layout-panel/modify-password.vue'
import WorkUser from '~/components/root-layout-panel/work-user.vue'
import WorkMessage from '~/components/root-layout-panel/work-message.vue'

@Component({
  components: {
    WorkUser,
    WorkMessage
  }
})
export default class RootLayout extends Vue { }
</script>
<style lang="less">
.default-layout {
  // .header {
  //   .el-button--text {
  //     color: white;
  //   }
  // }
  .user-setting {
    position: relative;
    color: white;
    margin-right: 20px;
  }
  .layout-header-operate-block {
    margin-top: 10px;
    .work-tool {
      padding-right: 15px;
      &:hover {
        cursor: pointer;
      }
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