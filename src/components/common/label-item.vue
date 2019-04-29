<template>
  <div class="label-item row">
    <label :style="{minWidth}" class="label-item-label">{{label}}</label><label class="label-item-value">{{value}}</label>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class extends Vue {
  @Prop({ default: "60px" })
  private minWidth!: string

  @Prop({ default: "标签名称:" })
  private label!: string

  @Prop({ default: "" })
  private value!: string
}
</script>

<style lang="less" scoped>
.label-item {
  line-height: 24px;
  height: 24px;
  &-label{
    &::after{
      content:"：";
    }
  }
  &-value {
    padding-left: 2px;
    overflow: hidden;
  }
}
</style>
