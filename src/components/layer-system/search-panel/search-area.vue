<template>
  <section class="component search-area" v-loading="loading">
    <el-form v-model="model" inline label-width="120px">
      <div v-for="setting of itemsSeting" :key="setting.layerCode">
        <common-title
          :showIcon="false"
          :title="setting.showName"
        ></common-title>
        <el-form-item
          v-for="item of setting.items"
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
      </div>
    </el-form>
    <div class="operate-buttons">
      <el-button @click="reset">重置</el-button>
      <el-button @click="search">搜索</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator'
import { namespace } from "vuex-class"
import NumberRange from '~/components/common/number-range.vue'
import { CqlBuilder } from '~/utils/cql-build.service'
import { LayerInfoService } from '~/services/layer-info.service'
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'
import MapViewer from '~/components/layer-viewer/map-viewer.vue'
import { SearchAreaLayerSetting } from "~/components/layer-system/search-panel/search-panel.config"
// import Cesium from 'cesium/Cesium'
// import { CesiumCommonService } from '~/utils/cesium/common.service'
// import { CesiumComputeService } from "~/utils/cesium/compute.service"

const LayerRelationModule = namespace('layerRelationModule')

@Component({
  components: {
    NumberRange
  }
})
export default class SearchArea extends Vue {
  @LayerRelationModule.Getter private layerRelations!: any[]

  private searchRangeSetting: any[] = require('~/assets/json/search-range-setting.json')
  private searchConfing: any[] = require('~/assets/json/search-setting.json')
  @Inject
  private service!: LayerInfoService

  @Prop()
  private viewer!: MapViewer

  private loading = false

  private searchItems: any[] = []

  private model: any = {}

  // 查询项目配置
  private itemsSeting: any[] = SearchAreaLayerSetting

  @Emit('success')
  private onSuccess() {
    this.$message.success('检索成功')
  }

  private mounted() {
    // this.viewer.getViewer().screenSpaceEventHandler.setInputAction((e: any) => {
    //   const feautre: any = this.viewer.getViewer().scene.pick(e.position)
    //   // console.log(feautre)
    //   if (!feautre) return
    //   const polygon = feautre.id.polygon
    //   if (!polygon) return
    //   const hierarchy = polygon.hierarchy as Cesium.ConstantProperty
    //   let { positions } = hierarchy.getValue()
    //   positions = positions.map(v => {
    //      const c = CesiumCommonService.cartesian3ToDegrees(v)
    //      return [c.longitude,c.latitude]
    //   })
    //   const area = CesiumComputeService.computeArea(positions)
    //   console.log(area)

    // }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    const relations = this.itemsSeting.map(setting => {
      const relation = this.layerRelations.find(x => x.type === setting.relationType) || {}
      return {
        ...setting,
        layerCode: relation.layerCode
      }
    })

    // 根据配置的搜索项，组件formItem 字段类型 以及model属性
    relations.forEach(setting => {
      const config = this.searchConfing.find(x => x.relationType === setting.relationType)
      if (!config) return
      const items = setting.items.map(v => {
        const configItem = config.searchItems.find(x => x.code === v)
        this.$set(
          this.model,
          configItem.code,
          configItem.type === 'number' ? { min: '', max: '' } : ''
        )
        return configItem
      })
      setting.items = items
    })
    this.itemsSeting = relations
  }

  private reset() {
    //
  }

  private search() {
    const params: any[] = []

    // 便利表单项目，生成查询对象
    this.itemsSeting.forEach(setting => {
      const cql = new CqlBuilder()
      // 遍历表单项，为cql 添加查询条件
      setting.items.forEach(({ code, type }) => {
        const queryData = this.model[code]
        // 没有值则不参与生成cql
        if (!queryData) return
        // 根据表单数据类型，设置条件连接词
        if (type === 'number') {
          const { min, max } = queryData
          if (!min && !max) return
          cql.addPredicater(code, 'between', [min, max])
        } else if (type === 'range') {
          cql.addPredicater(code, 'equal', queryData)
        } else {
          cql.addPredicater(code, 'like', queryData)
        }
      })
      const cqlStr = cql.build()
      if (!cqlStr) return
      params.push({
        layerCode: setting.layerCode,
        cql: cqlStr
      })
    })

    if (!params.length) {
      this.$message('请输入查询条件')
      return
    }
    this.qeury(params)
  }

  private qeury(queryList) {
    const mainLayer = this.itemsSeting.find(x => x.main && x.layerCode)
    if (!mainLayer) {
      console.error("layer_relation表配置有问题")
      this.$message.error("图层配置错误，请检查图层关系设置")
      return
    }
    const requestParams = new RequestParams({
      mainLayerCode: mainLayer.layerCode,
      layerCodes: queryList
    })
    this.loading = true
    this.service.multipleLayerComparisons(requestParams).subscribe(
      data => {
        this.loading = false
        if (!data.isSuccess) return
        this.viewer.addGeoJson(data.geoJson)
        this.onSuccess()
      },
      () => (this.loading = false)
    )
  }
}
</script>

<style lang="less" scoped>
</style>
