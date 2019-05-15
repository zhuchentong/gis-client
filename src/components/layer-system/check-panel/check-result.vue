<template>
  <section class="component check-result">
    <el-tabs v-model="currentTab">
      <el-tab-pane v-for="{key,label} of tabs" :key="key" :name="key" :label="label">
        <keep-alive>
          <component :is="currentTab"></component>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import { FlowInfoService } from "~/services/flow-info.service"
import { RequestParams } from "~/core/http/"
import { Inject } from "typescript-ioc"
import { PageService } from "~/extension/services/page.service"
import { ResultTabs, ResultComponents } from "./check-panel.config"

@Component({
  components: {
    ...ResultComponents
  }
})
export default class CheckResult extends Vue {
  private readonly tabs = ResultTabs
  private currentTab = ResultTabs[0].key

}
</script>
