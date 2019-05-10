<template>
  <section class="layer-menu-list">
    <div v-for="item in menuList" :class="{'active':currentMenuKey === item.key}" class="layer-menu-item col middle-span center-span" :key="item.key" @click="onSelectMenuItem(item)">
      <svg-icon class="menu-item-icon" :iconSize="18" :iconName="item.icon"></svg-icon>
      <div class="menu-item-label">{{item.label}}</div>
    </div>
  </section>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation, namespace } from 'vuex-class'
import { MenuList } from "./layer-system.config"
const MenuModule = namespace('menuModule')
@Component({
  components: {}
})
export default class extends Vue {
  @MenuModule.Getter private currentMenuKey!: string
  @MenuModule.Mutation private updateCurrentMenu

  private readonly menuList = MenuList

  private onSelectMenuItem(menuItem) {
    this.updateCurrentMenu(menuItem)
  }
}
</script>

<style lang="less" scoped>
.layer-menu-list {
  height: 100%;
  width: 60px;
  background: #16a6d1;

  .layer-menu-item {
    height: 60px;
    width: 60px;
    margin-bottom: 5px;

    .menu-item-label {
      font-size: 12px;
      color: white;
    }

    .menu-item-icon {
      padding: 10px 0;
    }

    &.active {
      background: #fc8c16;
      border-radius: 10px;
    }
  }
}
</style>

