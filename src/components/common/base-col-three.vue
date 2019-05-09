<template>
  <section class="base-col-three row no-warp">
    <div class="layout-left">
      <slot name="left"></slot>
    </div>
    <div class="layout-middle" v-if="!hiddenMiddle">
      <slot name="middle"></slot>
    </div>
    <div class="layout-content col-span">
      <slot name="content"></slot>
    </div>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class extends Vue {

  private hiddenMiddle = false

  private mounted() {
    this.hiddenMiddle = !this.$slots.middle
  }

}
</script>

<style lang="less" scoped>
.base-col-three {
  .layout {
    &-left {
      flex-basis: 80px;
    }
    &-middle {
      flex-basis: 300px;
      background-color: #fafafa;
    }
    &-content {
      padding: 0;
      flex: 1;
    }
  }
}
</style>