<template>
  <section class="layer-menu-list">
    <div
      v-for="item in menuList"
      :class="{'active':currentMenuItem === item.key}"
      class="layer-menu-item col middle-span center-span"
      :key="item.key"
      @click="onSelectMenuItem(item.key)"
    >
      <svg-icon class="menu-item-icon" :iconSize="18"  :iconName="item.icon"></svg-icon>
      <div class="menu-item-label" >{{item.label}}</div>
    </div>
  </section>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation, namespace } from 'vuex-class'
const MenuModule = namespace('menuModule')
@Component({
  components: {}
})
export default class extends Vue {
  @MenuModule.State private currentMenuItem
  @MenuModule.Mutation private updateCurrentMenuItem

  private readonly menuList = [
    {
      key: 'layer-list',
      label: '图层目录',
      icon: 'layer-list'
    },
    {
      key: 'layer-control',
      label: '图层控制',
      icon: 'layer-control'
    },
    {
      key: 'measure',
      label: '测量',
      icon: 'measure'
    },
    {
      key: 'search',
      label: '检索',
      icon: 'search'
    },
    {
      key: 'check',
      label: '检测',
      icon: 'check'
    },
    {
      key: 'viewer',
      label: '视角',
      icon: 'viewer',
    },
    {
      key: 'compute',
      label: '计算',
      icon: 'compute'
    },
    {
      key: 'site',
      label: '地点',
      icon: 'site'
    },
    {
      key: 'project',
      label: '项目',
      icon: 'project'
    },
    {
      key: 'task',
      label: '外业',
      icon: 'task'
    },
  ]

  private onSelectMenuItem(menuItem){
    this.updateCurrentMenuItem(menuItem)
  }
}
</script>

<style lang="less" scoped>
.layer-menu-list {
  height: 100%;
  width: 60px;
  background: #16A6D1;

  .layer-menu-item {
    height: 60px;
    width: 60px;
    margin-bottom:5px;

    .menu-item-label{
      font-size:12px;
      color:white;
    }

    .menu-item-icon{
      padding:10px 0;
    }

    &.active {
      background: #fc8c16;
      border-radius: 10px;
    }
  }
}
</style>

