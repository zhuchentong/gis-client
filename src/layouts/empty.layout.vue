<template>
  <div
    class="layout fill draggable"
    style="overflow:hidden;"
  >
    <router-view />
  </div>
</template>

<script lang = "ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class EmptyLayout extends Vue {}
</script>

<style lang="less">
</style>