<template>
  <section :style="{ paddingLeft: defaultPaddingLeft }" class="component fold-spread">
    <div class="layer-spread-container">
      <div class="layer-spread-card" @click="spread = !spread">
        <svg-icon :class="{'spread': !spread}" iconName="xiala" iconSize="16"></svg-icon>
      </div>
      <div v-show="spread" :class="{'slot-transtion': spread}">
        <!-- 动态内容区 -->
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import SvgIcon from "~/components/common/svg-icon.vue"
import { Vue, Component, Emit, Prop, Model } from "vue-property-decorator"

@Component({
  components: {
    SvgIcon
  }
})
export default class FoldSpread extends Vue {
  @Prop({
    type: String,
    default: "20px"
  })
  public defaultPaddingLeft!: string

  private spread: boolean = true

  public setSpread(value: boolean) {
    this.spread = value
  }

}
</script>

<style lang="less" scoped>
.component.fold-spread {
  display: block;
  position: absolute;
  width: 100%;
  bottom: 24px;
  box-sizing: border-box;

  .layer-spread-container {
    position: relative;
    height: 100%;
    // padding: 10px 0;
    box-sizing: border-box;
    background: #fff;
    border-left: 1px solid #cecece;
    border-top: 1px solid #cecece;

    .layer-spread-card {
      position: absolute;
      height: 20px;
      width: 60px;
      top: -16px;
      left: 19px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background: #fff;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      cursor: pointer;
      .spread {
        transform: rotate(180deg);
        transition: all 0.6s;
      }
    }
    .slot-transtion {
      transition: all 0.5s;
    }
  }
}
</style>
