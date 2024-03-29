<template>
  <section class="layer-attr-table">
    <div class="table-icon" @click="updateTableShow" title="图层属性表">
      <svg-icon
        :iconSize="24"
        :iconColor="
          isTableShow || this.tableList.length === 0 ? 'gray' : 'white'
        "
        iconName="table"
      ></svg-icon>
    </div>
    <!-- <transition name="fade"> -->
    <div v-show="isTableShow">
      <el-tabs
        type="border-card"
        v-model="currentTable"
        @tab-remove="onRemoveTab"
        closable
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
            @onRowClick="onRowClick"
            :height="245"
          >
            <template slot="columns">
              <el-table-column
                v-for="column of layerTable.columns"
                :key="column.key"
                :prop="column.key"
                :label="column.label"
                align="center"
                :formatter="
                  row => $filter.fieldCodeConvert(column.key, row[column.key])
                "
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
import appConfig from '~/config/app.config'
import WMSCapabilities from 'wms-capabilities'
import MapViewer from '~/components/layer-viewer/map-viewer.vue'

const LayerTableModule = namespace('layerTableModule')

@Component({
  components: {}
})
export default class LayerAttrTable extends Vue {
  @LayerTableModule.State private tableList!: any[]
  @LayerTableModule.State private isTableShow
  @LayerTableModule.Mutation private removeLayerAttrTable
  @LayerTableModule.Getter private getTable!: (id: string) => any
  @LayerTableModule.Mutation private updateTableVisibility
  @Prop()
  private viewer!: MapViewer

  @Prop()
  private featureId!: string

  private workspace = 'base-space'
  private currentRow: any = {}
  private currentTable = ''
  private lastTabelList
  private updateTableShow() {
    if (this.isTableShow || this.tableList.length !== 0) {
      this.updateTableVisibility(!this.isTableShow)
    }
  }

  private onRemoveTab(id) {
    this.removeLayerAttrTable(id)
  }

  private onRowClick(row) {
    const layerInfo = this.getTable(this.currentTable)
    if (!layerInfo) return
    const { layerSpace, layerCode } = layerInfo

    return fetch(
      `${appConfig.geoServer}/${
      layerSpace || this.workspace
      }/wms?service=wfs&version=2.0.0&request=GetFeature&&featureid=${
      row.featureId
      }&&query_layers=${layerSpace}:${layerCode}&&outputFormat=json`
    ).then(async data => {
      try {
        const { features } = await data.json()
        const [feature] = features
        this.viewer.pickEntities.removeAll()
        this.viewer.drawFeature(feature.geometry, true)
      } catch (ex) {
        console.log(ex)
      }
    })
  }

  @Watch('tableList.length')
  private onTableListChange(newValue, oldValue) {
    if (this.tableList.length === 0) {
      this.updateTableVisibility(false)
      return
    }

    let index = 0
    if (newValue > oldValue) {
      index = this.tableList.length - 1
    } else {
      const newList = this.tableList.map(x => x.id)
      const oldList = this.lastTabelList.map(x => x.id)
      index = oldList.findIndex(
        x => x === oldList.find(y => !newList.includes(y))
      )
      index -= oldList.length - 1 === index ? 1 : 0
    }

    this.currentTable = this.tableList[index].id
    this.lastTabelList = Object.assign([], this.tableList)
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
    & > * {
      margin-bottom: unset;
    }
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

