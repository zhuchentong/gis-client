<template>
  <base-col-three class="page manage-system">
    <div slot="left" class="text-center manage-system-menu" style="height:100%">
      <div v-for="item of menus" :key="item.name" class="manage-system-menu-item pointer" @click="currentMenu = item" :class="{'manage-system-menu-activated': item.name === currentMenu.name}">
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
  .manage-system-menu {
    background-color: #21a7cf;
    &-item {
      padding: 15px 10px;
      color: #fefefe;
      .menu-item-label {
        font-size: 14px;
      }
    }
    &-activated {
      color:#fc8144;
      background-color: rgb(117,203,228);
    }
  }
}
</style>

