<template>
  <base-col-three class="page business-system">
    <div slot="left" class="text-center" style="height:100%">
      <div v-for="item of menus" :key="item.name" class="business-system-menu-item pointer" @click="currentMenu = item" :class="{'business-system-menu-activated': item.name === currentMenu.name}">
        <svg-icon :iconName="item.icon" iconSize="32"></svg-icon>
        <div class="menu-item-label">{{item.label}}</div>
      </div>
    </div>
    <component slot="content" :is="currentMenu.component"></component>

  </base-col-three>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Layout } from '@/core/decorator'
import BaseColThree from "~/components/common/base-col-three.vue"
import { MenuItems, PageComponents } from "~/components/manage-system/manage-system.config"

@Layout('workspace')
@Component({
  components: {
    BaseColThree,
    ...PageComponents
  }
})
export default class extends Vue {

  private menus = MenuItems
  private currentMenu = MenuItems[0]

}
</script>

<style lang="less" scoped>
.page.business-system {
  .business-system-menu {
    &-item {
      padding: 10px;
      background-color: #f2f2f2;
      .menu-item-label {
        font-size: 14px;
      }
    }
    &-activated {
      background-color: aquamarine;
    }
  }

  .search {
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    border-bottom: solid 2px #f3f3f3;
    &-worktype {
      padding-left: 3px;
      width: 100px;
    }
  }
  .info-item {
    padding: 5px 0 5px 10px;
    border-bottom: solid 2px #f3f3f3;
    &-activated {
      background-color: #ffffea;
    }
  }
  .content-tabs {
    height: 100%;
    margin-left: 10px;
    &-panes {
      height: 100%;
      &-base {
        height: 100%;
      }
    }
  }
  .add-item {
    background-color: #409eff;
  }
}
</style>

<style lang="less">
.page.business-system {
  @line-height: 20px;
  .search {
    .el-input {
      /*
        设置局部按钮行内高度
      */
      line-height: @line-height!important;
      .el-input__inner {
        line-height: @line-height!important;
        height: @line-height!important;
      }
      .el-input__icon {
        height: @line-height!important;
        line-height: @line-height!important;
      }
    }
    .el-button.el-button--default {
      line-height: @line-height!important;
    }
  }
  .el-pagination {
    margin-top: 20px;
  }
  .content-tabs .el-tabs__content {
    height: calc(100% - 60px);
  }
}
</style>


