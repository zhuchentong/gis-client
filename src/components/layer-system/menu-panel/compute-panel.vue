<template>
  <section class="component compute-panel">
    <div class="compute-item text-center" v-for="item of items" :key="item.key" @click="onItemClick(item)" :class="{'active': computeItem.key === item.key}">
      <svg-icon :iconName="item.icon" iconSize="40"></svg-icon>
      <div>{{item.label}}</div>
    </div>

    <el-dialog :title="computeItem.label" :center="true" :visible.sync="dialog.compute" width="500px" @close="computeItem = {}" :close-on-click-modal="false" :close-on-press-escape="false">
      <component :is="computeItem.key"></component>
    </el-dialog>

  </section>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ComputItems, ComputeComponents } from "~/components/layer-system/compute-panel/compute.config.ts"

@Component({
  components: {
    ...ComputeComponents
  }
})
export default class ComputePanel extends Vue {

  private items = ComputItems
  private computeItem: any = {}

  private dialog = {
    compute: false
  }

  private onItemClick(item) {
    this.computeItem = item
    this.dialog.compute = true
  }

}
</script>

<style lang="less" scoped>
.component.compute-panel {
  .compute-item {
    padding-top: 20px;
    display: inline-block;
    height: 80px;
    width: 125px;
  }
  .active {
    color: #fc8144;
    background-color: #f3f3f3;
  }
}
</style>

<style lang="less">
.component.compute-panel {
  .el-dialog {
    .el-form .el-form-item .el-form-item__content .el-input {
      width: 280px !important;
    }
    .el-form .el-form-item .el-form-item__content .el-input.inline {
      width: 130px !important;
    }
    .multiply {
      display: inline-block;
      padding: 0 8px;
      font-weight: 900;
    }
  }
}
</style>
