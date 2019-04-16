<template>
  <div
    class="layout full draggable"
    style="overflow:auto;"
  >
    <router-view />
  </div>
</template>

<script lang = "ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="less">
</style>