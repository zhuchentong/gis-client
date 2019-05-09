<template>
  <div class="label-item" :style="itemStyle">
    <label :style="labelStyle" class="label-item-label">{{label}}</label>
    <label class="label-item-value">{{value}}</label>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Container } from 'element-ui'

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
      minWidth: `${labelWidth}px`
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
    overflow: hidden;
  }
}
</style>
