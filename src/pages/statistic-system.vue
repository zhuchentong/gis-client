<template>
  <base-col-three class="page statistic-system">
    <div slot="middle" class="menu">
      <div
        class="statistic-group"
        v-for="{ name, icon, items } of menus"
        :key="name"
      >
        <common-title :iconName="icon" :title="name"></common-title>
        <div
          class="statistic-group-item"
          :class="{ actived: currentComponent === item.component }"
          v-for="item of items"
          :key="item.component"
          @click="currentComponent = item.component"
        >
          {{ item.label }}
        </div>
      </div>
    </div>

    <div slot="content">
      <component :is="currentComponent"></component>
    </div>
  </base-col-three>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Layout } from '@/core/decorator'
import BaseColThree from "~/components/common/base-col-three.vue"
import { MenuList, DataComponents, TaskComponents, BussinessComponents } from "~/components/statistic-system/statistic-system.config.ts"

@Layout('workspace')
@Component({
  components: {
    BaseColThree,
    ...DataComponents,
    ...BussinessComponents,
    ...TaskComponents
  }
})
export default class StatisticSystem extends Vue {

  private readonly menus = MenuList

  private currentComponent = MenuList[0].items[0].component

}
</script>

<style lang="less">
.page.statistic-system {
  .layout-middle {
    flex-basis: 230px;
  }
  .menu {
    height: 100%;
    background-color: #21a7cf;
  }

  .statistic-group {
    .common-title {
      .custom-card-header {
        color: #fefefe;
      }
      background-color: #2488af;
    }
    &-item {
      color: #fefefe;
      padding-left: 20px;
      line-height: 28px;
      font-size: 14px;
      &:hover {
        cursor: pointer;
      }
    }
    .actived {
      color: #040e12;
      font-weight: bold;
    }
  }
  .layout-content {
    .component {
      .common-title {
        padding: 0;
      }
      .ve-histogram,
      .ve-line,
      .ve-pie {
        height: 350px !important;
      }

      .no-data {
        height: 350px;
        margin: 0;
        line-height: 350px;
      }

      .el-select {
        width: 120px;
      }
      .el-radio-group {
        line-height: 26px;
        .el-radio-button--mini > .el-radio-button__inner {
          padding: 6px 15px;
        }
      }
    }
  }
}
</style>
