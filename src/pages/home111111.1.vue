<template>
  <section class="home-page fill">
    <div class="system-logo"></div>
    <div class="row system-menus">
      <div v-for="(item, index) of menuList" :key="index" class="menu-item">
        <div class="hexagon">
          <div class="hexagon-in">
            <div
              class="item-content row middle-span center-span"
              :style="item.style"
            >
              <svg-icon :iconSize="32" :iconName="item.icon"></svg-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="menu row">
      <a
        v-for="(item, index) of menuList"
        :key="item.url"
        :style="item.style"
        class="menu-item"
        :class="`menu-item-${index + 1}`"
        @click="openWindow(item)"
      >
        <div class="menu-icon">
          <svg-icon :iconSize="32" :iconName="item.icon"></svg-icon>
        </div>
        <div class="“menu-title“">{{ item.label }}</div>
      </a>
    </div> -->
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Layout } from '@/core/decorator'
import { WindowSize } from '../config/enum.config'
import { namespace } from 'vuex-class'
import { District } from '~/models/district.model'

@Layout('root')
@Component({
  components: {}
})
export default class Home extends Vue {
  private readonly menuList = [
    {
      label: '多规管理',
      url: 'layer-system',
      icon: 'layer',
      style: {
        background: '#409CE7'
      }
    },
    {
      label: '业务管理',
      url: 'business-system',
      icon: 'business',
      style: {
        background: '#819BEC'
      }
    },
    {
      label: '外业管理',
      url: 'task-system',
      icon: 'task',
      style: {
        background: '#72CA50'
      }
    },
    {
      label: '统计管理',
      url: 'statistic-system',
      icon: 'statistic',
      style: {
        background: '#F0C239'
      }
    },
    {
      label: '运维管理',
      url: 'manage-system',
      icon: 'manage',
      style: {
        background: '#955FF1'
      }
    }
  ]

  private openWindow(item) {
    this.$window.open(
      item.url,
      {
        width: WindowSize.large.width,
        height: Math.min(WindowSize.large.height, window.screen.height - 40)
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


 <style lang="less" scoped>
.home-page {
  .system-logo {
    height: 120px;
    background-image: url('../assets/images/home/logo.png');
    background-repeat: no-repeat;
    background-position: center;
  }
  .system-menus {
    height: 530px;
    .menu-item {
      position: relative;
      width: 380px;
      margin: 10px;
    }
    .hexagon {
      transform: skewX(-40deg);
      position: absolute;
      width: 100%;
      overflow: hidden;
      .hexagon-in {
        transform: skewX(60deg);
      }
    }
    .item-content {
      height: 235px;
      transform: skewX(-4deg);
      border: solid;
      text-align: center;
    }
  }
}
</style>

