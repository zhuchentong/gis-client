<template>
  <section class="component area-detail">
    {{ area }}{{ unit | dictConvert('AreaUnit') }}
    <el-popover placement="right" trigger="hover">
      <div class="component area-detail content">
        <div class="content-item">{{ areaInfo.squ.toFixed(2) }} 平方米</div>
        <div class="content-item">{{ areaInfo.mu.toFixed(2) }} 亩</div>
        <div class="content-item">{{ areaInfo.ha.toFixed(4) }} 公顷</div>
      </div>
      <a slot="reference">
        <i class="el-icon-info"></i>
      </a>
    </el-popover>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { CommonService } from '~/utils/common.service'
@Component({
  components: {
  }
})
export default class AreaDetail extends Vue {


  @Prop({ required: true })
  private area!: any

  @Prop({ default: "SQUARE_METRE" })
  private unit!: any


  private get areaInfo() {
    return CommonService.convertArea(this.area, this.unit)
  }

}
</script>

<style lang="less">
.component.area-detail.content {
  padding-left: 10px;
  min-width: 150px;
  .content-item {
    line-height: 26px;
    border-bottom: 1px solid #f3f3f3;
    font-size: 12px;
  }
}
</style>
