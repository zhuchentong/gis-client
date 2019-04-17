<template>
  <section class="layer-system-page">
    <div class="menu"></div>
    <div class="tool"></div>
    <div class="layer-tree"></div>
    <div class="layer-view"></div>
    <div class="bottom"></div>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Layout } from '@/core/decorator'

@Layout('workspace')
@Component({
  components: {}
})
export default class extends Vue {}
</script>

