<template>
  <section class="component search-land">
    <common-title class="select-layer" :showIcon="false" title="选择检索目标：">
      <el-select slot="append" v-model="currentLayer" @change="layerChange" clearable placeholder="请选择要检索的图层">
        <el-option v-for="item of dataSet" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </common-title>
    <div v-if="!searchItems.length" class="no-data"></div>
    <el-form v-else :model="model" inline ref="form" label-width="120px">
      <el-form-item v-for="item of searchItems" :key="item.code" :label="item.name" :prop="item.code">
        <el-input v-if="item.type === 'string'" v-model="model[item.code]" clearable></el-input>
        <number-range v-else-if="item.type === 'number'" v-model="model[item.code]" clearable></number-range>
        <el-select v-else v-model="model[item.code]" clearable>
          <el-option v-for="{code,name} of searchRangeSetting[item.code]" :key="code" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div v-if="searchItems.length" class="operate-buttons">
      <el-button @click="reset">重置</el-button>
      <el-button @click="submit">搜索</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator'
import MapViewer from '~/components/layer-viewer/map-viewer.vue'
import NumberRange from '~/components/common/number-range.vue'
import { LayerInfoService } from '~/services/layer-info.service.ts'
import { RequestParams } from '~/core/http'
import { Inject } from 'typescript-ioc'
import { Form } from 'element-ui'
import { namespace } from 'vuex-class'

const LayerTableModule = namespace('layerTableModule')

@Component({
  components: {
    NumberRange
  }
})
export default class SearchLand extends Vue {
  @LayerTableModule.Getter private getTable!: (id) => any
  @LayerTableModule.Mutation private addLayerAttrTable!: (data) => void
  @LayerTableModule.Mutation private removeLayerAttrTable!: (id) => void

  private currentLayer = ''
  private lastQueryTableId = ''

  private searchSetting: any[] = require('~/assets/json/search-setting.json')
  private searchRangeSetting: any[] = require('~/assets/json/search-range-setting.json')

  @Inject
  private service!: LayerInfoService

  @Prop()
  private viewer!: MapViewer

  @Prop()
  private visabled!: boolean

  private dataSet: any[] = []
  private model: any = {}

  private get searchLayers() {
    return this.searchSetting.map(v => v.name)
  }

  private searchItems: any[] = []

  @Emit('success')
  private onSuccess() {
    return
  }

  private get currentSelectItem() {
    return this.dataSet.find(x => x.id === this.currentLayer)
  }

  @Watch('visabled', { immediate: true })
  private onVisabledChange(val) {
    if (val) {
      this.dataSet = this.viewer
        .getLayerList()
        .map(({ layer }) => {
          return {
            id: layer.id,
            name: layer.layerName
          }
        })
        .filter(layer => !!this.searchLayers.find(x => layer.name.includes(x)))
    }
  }

  private layerChange(id) {
    this.model = {}
    if (!id) this.searchItems = []
    if (!this.currentSelectItem) return
    // 更新检索项
    const { searchItems } = this.searchSetting.find(x =>
      this.currentSelectItem.name.includes(x.name)
    )
    if (!searchItems) return
    this.searchItems = searchItems
    searchItems.forEach(({ code, type }) => {
      // 创建model
      this.$set(this.model, code, type === 'number' ? { min: '', max: '' } : '')
    })
  }

  private reset() {
    this.currentLayer = ''
    this.layerChange('')
      ; (this.$refs.form as Form).resetFields()
  }

  private submit() {
    const tableInfo = this.getTable(this.currentLayer)
    if (!tableInfo) {
      this.$message.error('未找到关联图层数据信息')
      return
    }
    const filterData = this.filterTableData(tableInfo.data)
    if (!filterData.length || tableInfo.data.length === filterData.length) {
      this.$message('未检索到数据')
      return
    }
    this.$message.success(`检索到 ${filterData.length} 条数据`)
    // 创建检索数据table
    const attrTable = {
      id: this.lastQueryTableId + Date.now(),
      name: `${this.currentSelectItem.name}-地块检索`,
      data: filterData
    }
    this.addLayerAttrTable(attrTable)
    this.onSuccess()
  }

  // 过滤缓存数据
  private filterTableData(data) {
    let tmpData: any[] = data
    this.searchItems.forEach(({ code, type }) => {
      const queryData = this.model[code]
      if (!queryData) return
      if (type === 'number') {
        const min = queryData.min || 0
        const max = queryData.max || 0
        if (!min && !max) return
        tmpData = tmpData.filter(row => {
          const originData = row[code] as number
          return originData >= min && originData <= max
        })
      } else {
        tmpData = tmpData.filter(row =>
          ((row[code] as string) || '').includes(queryData)
        )
      }
    })
    return tmpData
  }

  private clearTable() {
    if (this.lastQueryTableId) {
      // 删除已经检索过的表
      this.removeLayerAttrTable(this.lastQueryTableId)
      this.lastQueryTableId = ''
    }
  }
}
</script>

<style lang="less" scoped>
.component.search-land {
  .select-layer {
    margin-left: 15px;
    justify-content: start;
    margin-bottom: 10px;
  }
  .no-data {
    margin-bottom: 10%;
  }
}
</style>
