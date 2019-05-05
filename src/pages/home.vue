<template>
  <section class="home-page fill">
    <div class="menu row">
      <a
        v-for="(item,index) of menuList"
        :key="item.url"
        class="menu-item"
        :class="`menu-item-${index+1}`"
        @click="openWindow(item)"
      >{{item.label}}</a>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Layout } from '@/core/decorator'
import { WindowSize } from '../config/enum.config'

@Layout('default')
@Component({
  components: {}
})
export default class extends Vue {
  private readonly menuList = [
    {
      label: '多规管理',
      url: 'layer-system'
    },
    {
      label: '业务管理',
      url: 'business-system'
    },
    {
      label: '外业管理',
      url: 'task-system'
    },
    {
      label: '统计管理',
      url: 'statistic-system'
    },
    {
      label: '运维管理',
      url: 'manage-system'
    }
  ]

  private openWindow(item) {
    this.$window.open(
      item.url,
      {
        size: WindowSize.large
      },
      {
        replace: false,
        parent: true
      },
      this
    )
  }
}
</script>


 <style lang="less">
.home-page {
  .menu {
    position: absolute;
    left: 200px;
    right: 50px;
    top: 100px;
    bottom: 100px;
    display: grid;
    grid-template: 1fr 1fr/1fr 1fr 1fr;

    .menu-item {
      color: white;
      font-weight: bold;
      height: 150px;
      width: 150px;
      background: red;
      box-shadow: 5px 5px 5px gray;
      border-radius: 10px;
      margin: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:active {
        box-shadow: 2px 2px 2px gray;
      }
    }
  }
}

.loop(@n) when (@n > 0) {
  .menu-item.menu-item-@{n} {
    grid-row-start: if((@n < 3), 1, 2);
    grid-column-start: mod(@n, 3) + 1;
    place-self: center;
  }
  //循环调用自身
  .loop((@n - 1));
}

.loop(5);
</style>

