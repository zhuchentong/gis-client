<template>
  <section class="layer-menu-panel">
    <component :is="currentComponentName"></component>
  </section>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation, namespace } from 'vuex-class'
import { PanelComponents } from "./layer-system.config"
const MenuModule = namespace('menuModule')

@Component({
  components: {
    ...PanelComponents
  }
})
export default class extends Vue {
  @MenuModule.Getter private currentComponentName!: string


}
</script>

<style lang="less" scoped>
.layer-menu-panel {
}
</style>

