<template>
  <section class="component search-panel" v-loading="loading">
    <div class="compute-item text-center" v-for="item of items" :key="item.key" @click="onItemClick(item)" :class="{'active': checkItem.key === item.key}">
      <svg-icon :iconName="item.icon" iconSize="40"></svg-icon>
      <div>{{item.label}}</div>
    </div>
    <el-dialog :title="checkItem.label" :center="true" :visible.sync="dialog.search" width="750px" :close-on-click-modal="false" :close-on-press-escape="false" @close="checkItem = {}">
      <keep-alive>
        <component :is="checkItem.component" :visabled="dialog.search" :viewer="viewer" @success="onSuccess"></component>
      </keep-alive>
    </el-dialog>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { MenuList, SearchDialogs } from "~/components/layer-system/search-panel/search-panel.config.ts"
import MapViewer from "~/components/layer-viewer/map-viewer.vue"

@Component({
  components: {
    ...SearchDialogs
  }
})
export default class SearchPanel extends Vue {

  @Prop()
  private viewer!: MapViewer

  private items = MenuList
  private checkItem: any = {}
  private loading = false

  private dialog = {
    search: false
  }

  private onItemClick(item) {
    this.checkItem = item
    this.dialog.search = true
  }

  private onSuccess(data) {
    this.checkItem = {}
    this.dialog.search = false
  }

}
</script>

<style lang="less" scoped>
.component.search-panel {
  position: relative;
  height: 100%;
  .compute-item {
    padding-top: 20px;
    display: inline-block;
    height: 80px;
    width: 120px;
  }
  .active {
    color: #fc8144;
    background-color: #f3f3f3;
  }
  .view-result {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>