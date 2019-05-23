<template>
  <section class="component search-land">
    <common-title class="select-layer" :showIcon="false" title="选择检索目标：">
      <el-select
        slot="append"
        v-model="currentLayer"
        @change="layerChange"
        clearable
        placeholder="请选择要检索的图层"
      >
        <el-option
          v-for="item of dataSet"
          :key="item.id"
          :label="item.layerName"
          :value="item.layerCode"
        ></el-option>
      </el-select>
    </common-title>
    <div v-if="!searchItems.length" class="no-data"></div>
    <el-form v-else :model="model" inline ref="form" label-width="120px">
      <el-form-item
        v-for="item of searchItems"
        :key="item.code"
        :label="item.name"
        :prop="item.code"
      >
        <el-input
          v-if="item.type === 'string'"
          v-model="model[item.code]"
          clearable
        ></el-input>
        <number-range
          v-else-if="item.type === 'number'"
          v-model="model[item.code]"
          clearable
        ></number-range>
        <el-select v-else v-model="model[item.code]" clearable>
          <el-option
            v-for="{ code, name } of searchRangeSetting[item.code]"
            :key="code"
            :label="name"
            :value="code"
          ></el-option>
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
const LayerRelationModule = namespace('layerRelationModule')

@Component({
  components: {
    NumberRange
  }
})
export default class SearchLand extends Vue {
  @LayerTableModule.Getter private getTable!: (id) => any
  @LayerTableModule.Mutation private addLayerAttrTable!: (data) => void
  @LayerTableModule.Mutation private removeLayerAttrTable!: (id) => void
  @LayerRelationModule.Getter private layerRelations!: any[]

  private currentLayer = ''
  private lastQueryTableId = ''

  private searchSetting: any[] = require('~/assets/json/search-setting.json')
  private searchRangeSetting: any[] = require('~/assets/json/search-range-setting.json')

  @Inject
  private service!: LayerInfoService

  @Prop()
  private viewer!: MapViewer

  @Prop()
  private count!: number

  private dataSet: any[] = []
  private model: any = {}
  private searchItems: any[] = []

  @Emit('success')
  private onSuccess() {
    return
  }

  @Watch('count')
  private onVisabledChange() {
    // 监听页面打开状态，更新图层列表
    this.dataSet = this.viewer
      .getLayerList()
      .map(item => item.layer)
      .filter(layer => !!this.searchSetting.find(x => x.layerCode === layer.layerCode))

    // 如果没有勾选图层，相应的查询表单也应该清除
    if (!this.dataSet.length) {
      this.currentLayer = ""
      this.layerChange()
    }
  }

  private layerChange(id?) {
    this.model = {}
    if (!id) {
      this.searchItems = []
      return
    }

    // 更新检索项
    const { searchItems } = this.searchSetting.find(x => x.layerCode === this.currentLayer)
    if (!searchItems) return
    this.searchItems = searchItems
    searchItems.forEach(({ code, type }) => {
      // 创建model
      this.$set(this.model, code, type === 'number' ? { min: '', max: '' } : '')
    })
  }

  private reset() {
    (this.$refs.form as Form).resetFields()
  }

  private submit() {
    // 创建检索数据table
    const currentItem = this.dataSet.find(x => x.layerCode === this.currentLayer)

    const tableInfo = this.getTable(currentItem.id)
    if (!tableInfo) {
      this.$message.error('未找到关联图层数据信息')
      return
    }
    const filterData = this.filterTableData(tableInfo.data)
    if (!filterData.length) {
      this.$message('未检索到数据')
      return
    }
    this.$message.success(`检索到 ${filterData.length} 条数据`)


    const attrTable = {
      id: this.lastQueryTableId + Date.now(),
      name: `${currentItem.layerName}-地块检索`,
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
          if(!min) return originData < max
          if(!max) return originData > min
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

  private mounted() {
    // 使用图层关系图层code   layerCode
    this.searchSetting = this.searchSetting.map(setting => {
      const relation = this.layerRelations.find(x => x.type === setting.relationType)
      return {
        ...relation,
        ...setting
      }
    })
    this.onVisabledChange()
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
