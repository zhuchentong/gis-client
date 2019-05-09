<template>
  <div class="label-container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class LabelContainer extends Vue {
  public componentName = 'label-container'

  @Prop({ default: 80 })
  private labelWidth!: number

  @Prop({ default: 2 })
  private column!: number
}
</script>

<style lang="less" scoped>
.label-item {
  line-height: 24px;
  height: 24px;
  &-label {
    &::after {
      content: '：';
    }
  }
  &-value {
    padding-left: 2px;
    overflow: hidden;
  }
}
</style>
