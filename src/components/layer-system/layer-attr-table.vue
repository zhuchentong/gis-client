<template>
  <section class="layer-attr-table">
    <div
      class="table-icon"
      @click="updateTableShow"
      title="图层属性表"
    >
      <svg-icon
        :iconSize="24"
        :iconColor="isTableShow?'gray':'white'"
        iconName="table"
      ></svg-icon>
    </div>
    <!-- <transition name="fade"> -->
    <div v-show="isTableShow">
      <el-tabs
        type="border-card"
        v-model="currentTable"
      >
        <el-tab-pane
          v-for="layerTable of tableList"
          :key="layerTable.id"
          :name="layerTable.id"
          :label="layerTable.name"
        >
          <data-box
            class="layer-table-data-box"
            :data="layerTable.data"
            ref="layer-table-data-box"
            :height="240"
          >
            <template slot="columns">
              <el-table-column
                v-for="column of layerTable.columns"
                :key="column.key"
                :prop="column.key"
                :label="column.label"
                align="center"
                show-overflow-tooltip
              ></el-table-column>
            </template>
          </data-box>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- </transition> -->
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { State, Mutation, namespace } from 'vuex-class'
import { PanelComponents } from './layer-system.config'
import { cursorTo } from 'readline'
const LayerTableModule = namespace('layerTableModule')

@Component({
  components: {}
})
export default class LayerAttrTable extends Vue {
  @LayerTableModule.State private tableList!: any[]
  @LayerTableModule.State private isTableShow
  @LayerTableModule.Mutation
  private removeLayerAttrTable
  @LayerTableModule.Mutation
  private updateTableVisibility
  @Prop()
  private viewer
  private currentTable = ''

  private updateTableShow() {
    if (this.isTableShow || this.tableList.length !== 0) {
      this.updateTableVisibility(!this.isTableShow)
    }
  }

  @Watch('tableList')
  private onTableListChange(tableList) {
    if (tableList.length === 0) {
      this.updateTableVisibility(false)
      return
    }

    const target = tableList.find(x => x.id === this.currentTable)

    if (!target) this.currentTable = tableList[0].id
  }
}
</script>

<style lang="less">
.layer-attr-table {
  .el-tabs--border-card > .el-tabs__content {
    padding: 0;
  }
  .layer-table-data-box.data-box {
    padding: 0;
  }
}
</style>
<style lang="less" scoped>
.layer-attr-table {
  position: relative;
  .table-icon {
    cursor: pointer;
    position: absolute;
    top: -40px;
    left: 20px;
  }
}
</style>

