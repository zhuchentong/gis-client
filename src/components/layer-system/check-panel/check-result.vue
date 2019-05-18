<template>
  <section class="component check-result">
    <el-tabs v-model="currentTab">
      <el-tab-pane v-for="tab of tabs" :key="tab.component" :name="tab.component" :label="tab.name">
        <keep-alive>
          <component :is="tab.component" :content="tab.data" :range="tab.range"></component>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import DataBox from '~/components/common/data-box.vue'
import { FlowInfoService } from '~/services/flow-info.service'
import { RequestParams } from '~/core/http/'
import { Inject } from 'typescript-ioc'
import { PageService } from '~/extension/services/page.service'
import { ResultTabs, ResultComponents } from './check-panel.config'

@Component({
  components: {
    ...ResultComponents
  }
})
export default class CheckResult extends Vue {
  private tabs: any[] = []
  private currentTab = ResultTabs[0].key

  public startCheck(checkContent: any, range: { positions?; layer? }) {
    // 生成检测结果tab
    this.tabs = Object.entries(checkContent)
      .filter(([key, { name, values }]: [string, any]) => values.length)
      .map(([key, data]: [string, any]) => ({
        component: data.component,
        name: data.name,
        data: data.values.map(x => data.children.find(y => y.code === x)),
        range
      }))
  }
}
</script>
