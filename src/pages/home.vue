<template>
  <section class="home-page fill col">
    <div class="system-logo"></div>

    <div class="col system-menus">
      <hexagon
        v-for="(item, index) of menuList"
        :key="index"
        class="menu-item"
        :class="{ 'middle-item': index % 3 === 0 }"
      >
        <div
          :style="item.style"
          class="menu-content col center-span middle-span"
          :class="{ 'no-hover': !item.label }"
          @click="openWindow(item)"
        >
          <template v-if="item.url">
            <svg-icon
              :iconSize="100"
              :iconName="item.icon"
              :iconColor="item.iconColor"
            ></svg-icon>

            <div class="menu-title">{{ item.label }}</div>
          </template>
        </div>
      </hexagon>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Layout } from '@/core/decorator'
import { WindowSize } from '../config/enum.config'
import Hexagon from "~/components/common/hexagon.vue"

@Layout('root')
@Component({
  components: {
    Hexagon
  }
})
export default class Home extends Vue {
  private readonly menuList = [
    {
      style: {
        backgroundImage: `url('${require("~/assets/images/home/menu-bg-1.png")}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }
    },
    {
      label: '业务管理',
      url: 'business-system',
      icon: 'business',
      iconColor: "#4463A6",
      style: {
        background: '#678DE0'
      }
    },
    {
      label: '外业管理',
      url: 'task-system',
      icon: 'task',
      iconColor: "#318048",
      style: {
        background: '#49AA66'
      }
    },
    {
      label: '多规管理',
      url: 'layer-system',
      icon: 'layer',
      iconColor: "#1962C0",
      style: {
        background: '#398EDD'
      }
    },
    {
      label: '统计管理',
      url: 'statistic-system',
      icon: 'statistic',
      iconColor: "#8C8037",
      style: {
        background: '#B2A660'
      }
    },
    {
      label: '运维管理',
      url: 'manage-system',
      icon: 'manage',
      iconColor: "#5345AE",
      style: {
        background: '#7160E3'
      }
    },
    {
      style: {
        backgroundImage: `url('${require("~/assets/images/home/menu-bg-2.png")}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }
    }
  ]

  private openWindow(item) {
    if (!item.url) return
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
    flex-basis: 120px;
    background-image: url('../assets/images/home/logo.png');
    background-repeat: no-repeat;
    background-position: center;
  }
  .system-menus {
    margin-top: 5%;
    padding-top: 30px;
    flex-wrap: wrap;
    height: 500px;
    align-content: center;
    .menu-content {
      height: 100%;
      width: 100%;

      .menu-title {
        padding-top: 10px;
        line-height: 40px;
        height: 40px;
        color: #ffffff;
      }

      &:hover:not(.no-hover) {
        cursor: pointer;
        .menu-title {
          font-size: 20px;
          transition: font-size 0.5s;
        }
      }
    }
    .menu-item {
      margin: 5px;
    }
    .middle-item {
      flex-basis: 380px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 -50px;
    }
  }
}
</style>

