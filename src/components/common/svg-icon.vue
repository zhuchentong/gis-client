<template>
  <svg class="svg-icon" aria-hidden="true" :style="iconStyle">
    <use :xlink:href="iconClass"></use>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

// 加载图标库文件
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
const req = require.context("../../assets/icons", false, /\.svg$/)
requireAll(req)

@Component({
  name: "svg-icon",
  components: {}
})
export default class SvgIcon extends Vue {
  @Prop({ required: true })
  public iconName!: string
  @Prop({ default: "18" })
  public iconSize!: string

  get iconClass() {
    return `#icon-${this.iconName}`
  }

  get iconStyle() {
    return {
      fontSize: `${this.iconSize}px`
    }
  }
}
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
