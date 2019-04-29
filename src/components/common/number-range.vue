<template>
  <section class="component number-range">
    <el-input v-model.lazy.number="minValue" :min="0" :max="999999999" type="number" :placeholder="minPlaceholder">
      <template slot="append">
        <slot name="min-append"></slot>
      </template>
    </el-input>
    <span>-</span>
    <el-input v-model.lazy.number="maxValue" :min="0" :max="999999999" type="number" :placeholder="maxPlaceholder">
      <template slot="append">
        <slot name="max-append"></slot>
      </template>
    </el-input>
  </section>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Watch, Prop, Emit, Model } from "vue-property-decorator"

@Component({
  components: {}
})
export default class NumberRange extends Vue {
  @Prop({ default: "最小值" })
  private minPlaceholder
  @Prop({ default: "最大值" })
  private maxPlaceholder

  @Prop({
    type: Boolean,
    default: false
  })
  private isInteger

  private vMin = ""
  private vMax = ""

  @Model("numberRangeChange")
  private numberRange!: { min: number; max: number }

  public validate(rule, value, callback) {
    if (this.numberRange.min > this.numberRange.max) {
      callback(new Error("输入数字范围有误"))
    }
  }


  public resetField(min = "", max = "") {
    this.minValue = min
    this.maxValue = max
  }

  @Watch("numberRange", { deep: true })
  private onValueChange(value) {
    if (!value) return
    this.vMin = value.min
    this.vMax = value.max
  }


  @Emit("numberRangeChange")
  private updateNumberRange(value) {
    return
  }

  private get minValue() {
    return this.vMin
  }

  private set minValue(value) {
    this.vMin = value
    this.updateNumberRange({
      min: this.vMin,
      max: this.vMax
    })
  }
  private get maxValue() {
    return this.vMax
  }

  private set maxValue(value) {
    this.vMax = value
    this.updateNumberRange({
      min: this.vMin,
      max: this.vMax
    })
  }

  private parseInt(value) {
    if (this.isInteger) {
      return Math.round(Number.parseFloat(value))
    }

    return value
  }
}
</script>

<style lang="less">
.component.number-range {
  .el-input {
    width: 88px !important;
    .el-input--inner {
      width: 50px !important;
    }
    .el-input__inner {
      &:focus,
      &:hover {
        padding-right: 1px;
      }
    }
  }
}
</style>
