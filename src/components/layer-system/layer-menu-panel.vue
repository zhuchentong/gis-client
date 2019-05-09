<template>
  <section class="layer-menu-panel">
    <component :is="currentMenuItem"></component>
  </section>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation, namespace } from 'vuex-class'
import LayerListPanel from './menu-panel/layer-list-panel.vue'
import LayerContrlPanel from './menu-panel/layer-control-panel.vue'
import SearchPanel from './menu-panel/search-panel.vue'
import CheckPanel from './menu-panel/check-panel.vue'
import MeasurePanel from './menu-panel/measure-panel.vue'
import ViewerPanel from './menu-panel/viewer-panel.vue'
import TaskPanel from './menu-panel/task-panel.vue'
import ProjectPanel from './menu-panel/project-panel.vue'
import SitePanel from './menu-panel/site-panel.vue'
const MenuModule = namespace('menuModule')
@Component({
  components: {
    'layer-list': LayerListPanel,
    'layer-control': LayerContrlPanel,
    search: SearchPanel,
    check: CheckPanel,
    measure: MeasurePanel,
    viewer: ViewerPanel,
    task: TaskPanel,
    project: ProjectPanel,
    site: SitePanel
  }
})
export default class extends Vue {
  @MenuModule.State private currentMenuItem
}
</script>

<style lang="less" scoped>
.layer-menu-panel {
}
</style>

