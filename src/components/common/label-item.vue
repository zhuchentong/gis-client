<template>
  <div class="label-item row" :style="itemStyle">
    <div :style="labelStyle" class="label-item-label">{{label}}</div>
    <div class="label-item-value">
      {{value}}
      <slot></slot>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ default: '标签名称:' })
  private label!: string

  @Prop({ default: '' })
  private value!: string

  @Prop({ default: 1 })
  private span!: number

  private defulatConfig = {
    column: 1,
    labelWidth: 80
  }

  private get itemStyle() {
    const column = this.container.column
    const span = Math.min(this.span, column)
    const width =
      (Math.round((this.span / column) * 10000) / 100).toFixed(2) + '%'

    return {
      width,
      maxWidth: width,
      minWidth: width
    }
  }

  private get labelStyle() {
    const labelWidth = this.container.labelWidth
    return {
      flexBasis: `${labelWidth}px`
    }
  }

  get container(): any {
    let parent = this.$parent

    while (
      parent &&
      parent.$options &&
      parent.$options.name !== 'LabelContainer'
    ) {
      parent = parent.$parent
    }

    return parent && parent.$options.name === 'LabelContainer'
      ? parent
      : this.defulatConfig
  }
}
</script>

<style lang="less" scoped>
.label-item {
  line-height: 24px;
  height: 24px;
  &-label {
    text-align: right;
    &::after {
      content: '：';
    }
  }
  &-value {
    flex: 1;
    padding-left: 2px;
    overflow: hidden;
  }
}
</style>
