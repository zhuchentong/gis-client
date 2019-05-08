<template>
  <base-col-three class="page manage-system">
    <div slot="left" class="text-center system-menu" style="height:100%">
      <div v-for="item of menus" :key="item.name" class="system-menu-item pointer" @click="currentMenu = item" :class="{'system-menu-activated': item.name === currentMenu.name}">
        <svg-icon :iconName="item.icon" iconSize="24"></svg-icon>
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
.page.manage-system {
  .system-menu {
    &-item {
      padding: 15px 10px;
    }
    .menu-item-label {
      font-size: 14px;
    }
  }
}
</style>

