<template>
  <section class="base-col-three row no-warp">
    <div class="layout-left">
      <slot name="left"></slot>
    </div>
    <div class="layout-middle">
      <slot name="middle"></slot>
    </div>
    <div class="layout-content col-span">
      <slot name="content"></slot>
    </div>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class extends Vue { }
</script>

<style lang="less" scoped>
.base-col-three {
  .layout {
    &-left {
      flex-basis: 80px;
    }
    &-middle {
      flex-basis: 300px;
    }
    &-content {
      flex: 1;
    }
  }

  .layout-left,
  .layout-middle,
  .layout-content {
    border: solid 1px #f3f3f3;
  }
}
</style>

<style lang="less">
// .base-col-three {
//   .layout-content {
//     .el-tabs {
//       height: 100%;
//       .el-tabs__content {
//         height: 100%;
//         .el-tab-pane {
//           height: 100%;
//         }
//       }
//     }
//   }
// }
</style>
