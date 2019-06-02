<template>
  <div class="component hexagon">
    <div class="to-right">
      <div class="to-left">
        <div class="content ">
          <slot> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Hexagon extends Vue {
}

</script>

<style lang="less" scoped>
.component.hexagon {
  position: relative;
  width: 220px;
  overflow: hidden;

  .to-right {
    width: 100%;
    transform: skewX(-30deg);
    overflow: hidden;
  }

  .to-left {
    width: 100%;
    transform: skewX(30deg) skewX(30deg);
    overflow: hidden;
  }

  .content {
    height: 180px;
    transform: skewX(-30deg);
  }
}
</style>


