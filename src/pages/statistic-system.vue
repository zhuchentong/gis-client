<template>
  <base-col-three class="page statistic-system">
    <div slot="middle">
      <div>
        <common-title title="数据统计"></common-title>
        <div v-for="item of dataMenus" :key="item.component" @click="currentComponent = item.component">
          {{item.label}}
        </div>
      </div>
    </div>

    <keep-alive slot="content">
      <component :is="currentComponent"></component>
    </keep-alive>

  </base-col-three>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Layout } from '@/core/decorator'
import BaseColThree from "~/components/common/base-col-three.vue"
import { DataMenu, BussinessMenu, DataComponents } from "~/components/statistic-system/statistic-system.config.ts"

@Layout('workspace')
@Component({
  components: {
    BaseColThree,
    ...DataComponents
  }
})
export default class extends Vue {

  private readonly dataMenus = DataMenu

  private currentComponent = DataMenu[0].component

}
</script>

