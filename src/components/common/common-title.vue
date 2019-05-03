<template>
  <div class="component common-title row between-span">
    <div class="row middle-span">
      <svg-icon class="title" :iconName="iconName" :iconSize="iconSize" v-if="showIcon"></svg-icon>
      <span class="custom-card-header">{{title}}</span>
    </div>
    <div>
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import SvgIcon from "~/components/common/svg-icon.vue"

@Component({
  components: {
    SvgIcon
  }
})
export default class CommonTitle extends Vue {
  @Prop({ default: "标题" })
  public title

  @Prop({
    default: 'edit'
  })
  public iconName!: string

  @Prop({
    default: 14
  })
  public iconSize!: number

  @Prop({ type: Boolean, default: true })
  private showIcon!: boolean

}
</script>

<style lang="less" scoped>
.component.common-title {
  padding: 10px;
  .custom-card-header {
    margin-left: 5px;
    font-size: 13px;
    color: #28313e;
    font-weight: bold;
  }
}
</style>
