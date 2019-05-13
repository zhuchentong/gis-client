<template>
  <section class="home-page fill">
    <div class="system-title">
      <div>延安高新区</div>
      <div>多规合一综合信息平台</div>
    </div>
    <div class="menu row">
      <a v-for="(item,index) of menuList" :key="item.url" :style="item.style" class="menu-item" :class="`menu-item-${index+1}`" @click="openWindow(item)">
        <div class="menu-icon">
          <svg-icon :iconSize="32" :iconName="item.icon"></svg-icon>
        </div>
        <div class="“menu-title“">{{item.label}}</div>
      </a>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Layout } from '@/core/decorator'
import { WindowSize } from '../config/enum.config'
import { namespace } from 'vuex-class'
import { District } from '~/models/district.model'
const DistrictModule = namespace('districtModule')

@Layout('root')
@Component({
  components: {}
})
export default class extends Vue {
  @DistrictModule.Mutation private updateDistrictData

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

  private mounted() {
    new District().getDistrictList().subscribe(this.updateDistrictData)
  }
}
</script>


 <style lang="less">
.home-page {
  .system-title {
    color: white;
    font-size: 30px;
    text-shadow: 5px 5px 5px gray;
    position: absolute;
    top: 120px;
    left: 30px;
    div:nth-child(1) {
    }
    div:nth-child(2) {
      margin-top: 10px;
      margin-left: 30px;
    }
  }
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
      box-shadow: 2px 2px 2px gray;
      border-radius: 10px;
      margin: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &:active {
        box-shadow: 0px 0px 0px gray;
      }

      .menu-title {
        font-size: 18px;
      }

      .menu-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
        width: 80px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 100%;
        margin-bottom: 10px;
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

