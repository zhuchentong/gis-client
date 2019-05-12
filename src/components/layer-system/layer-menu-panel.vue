<template>
  <section class="layer-menu-panel">
    <keep-alive>
      <component :is="currentComponentName" :viewer="viewer"></component>
    </keep-alive>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Mutation, namespace } from 'vuex-class'
import { PanelComponents } from './layer-system.config'
const MenuModule = namespace('menuModule')

@Component({
  components: {
    ...PanelComponents
  }
})
export default class extends Vue {
  @MenuModule.Getter private currentComponentName!: string

  @Prop()
  private viewer
}
</script>

<style lang="less" scoped>
.layer-menu-panel {
}
</style>

