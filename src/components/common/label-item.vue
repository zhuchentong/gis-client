<template>
  <div class="label-item" :style="itemStyle">
    <label ref="label" :style="{minWidth:`${labelMinWidth}px`}" class="label-item-label">{{label}}</label>
    <label class="label-item-value" :class="{'label-item-no-warp': !noWarp}" :title="!showTitle ? value: ''" :style="{width:valueWidth}">
      {{value}}
      <slot></slot>
    </label>

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

  @Prop({ default: true })
  private noWarp!: boolean

  @Prop({ default: true })
  private showTitle!: boolean

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

  private get labelMinWidth() {
    return this.container.labelWidth
  }

  private get valueWidth() {
    return `calc(100% - ${this.labelMinWidth + 5}px)`
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
  display: inline-block;
  &-label {
    text-align: right;
    display: inline-block;
    &::after {
      content: '：';
    }
  }
  &-value {
    padding-left: 2px;
    display: inline-block;
    vertical-align: top;
  }
  &-no-warp {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
