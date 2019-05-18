<template>
  <section class="component search-area" v-loading="loading">
    <el-form v-model="model" inline label-width="120px">
      <div v-for="setting of itemsSeting" :key="setting.layerCode">
        <common-title :showIcon="false" :title="setting.showName"></common-title>
        <el-form-item v-for="item of setting.items" :key="item.code" :label="item.name" :prop="item.code">
          <el-input v-if="item.type === 'string'" v-model="model[item.code]" clearable></el-input>
          <number-range v-else-if="item.type === 'number'" v-model="model[item.code]" clearable></number-range>
          <el-select v-else v-model="model[item.code]" clearable>
            <el-option v-for="{code,name} of searchRangeSetting[item.code]" :key="code" :label="name" :value="code"></el-option>
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
import { Component, Vue, Emit, Prop } from "vue-property-decorator"
import District from "~/components/business-common/district.vue"
import NumberRange from "~/components/common/number-range.vue"
import { CqlBuilder } from "~/utils/cql-build.service"
import { LayerInfoService } from "~/services/layer-info.service"
import { Inject } from "typescript-ioc"
import { RequestParams } from "~/core/http"
import MapViewer from "~/components/layer-viewer/map-viewer.vue"
import Cesium from "cesium/Cesium"

@Component({
  components: {
    District,
    NumberRange
  }
})
export default class SearchArea extends Vue {

  private searchRangeSetting: any[] = require("~/assets/json/search-range-setting.json")
  private searchConfing: any[] = require('~/assets/json/search-setting.json')
  @Inject
  private service!: LayerInfoService

  @Prop()
  private viewer!: MapViewer



  private loading = false

  private searchItems: any[] = []

  private model: any = {}

  // 查询项目配置
  private itemsSeting = [
    {
      layerCode: "6533189554047692800",
      layerName: "地类图斑",
      showName: "土地现状", // 界面显示的搜索类型名称
      items: ["DLMC", "ZLDWMC", "TBDLMJ"]
    },
    {
      layerCode: "6534620896976896000",
      layerName: "建设用地管制区",
      showName: "建设用地管制区",
      items: ["GZQLXDM"]
    },
    {
      layerCode: "6534621158219120640",
      layerName: "土地用途区",
      showName: "土地用途区",
      items: ["TDYTQLXDM"]
    },
    {
      layerCode: "6534621635535110144",
      layerName: "土地使用规划",
      showName: "控制性详细规划",
      items: ["用地代码"]
    }
  ]

  @Emit('success')
  private onSuccess() {
    this.$message.success('检索成功')
  }

  private mounted() {
    // 根据配置的搜索项，组件formItem 字段类型 以及model属性
    this.itemsSeting.forEach(setting => {
      const config = this.searchConfing.find(x => x.name === setting.layerName)
      if (!config) return
      const items = setting.items.map(v => {
        const configItem = config.searchItems.find(x => x.code === v)
        this.$set(this.model, configItem.code, configItem.type === 'number' ? { min: '', max: '' } : '')
        return configItem
      })
      setting.items = items
    })
  }

  private reset() {
    // 
  }

  private search() {
    const params: any[] = []

    // 便利表单项目，生成查询对象
    this.itemsSeting.forEach(setting => {
      const cql = new CqlBuilder();
      // 便利表单项，为cql 添加查询条件
      (setting.items as any).forEach(({ code, type }) => {
        const queryData = this.model[code]
        // 没有值则不参与生成cql
        if (!queryData) return
        // 根据表单数据类型，设置条件连接词
        if (type === 'number') {
          const { min, max } = queryData
          if (!min && !max) return
          cql.addPredicater(code, 'between', [min, max])
        } else if (type === "range") {
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
      this.$message("请输入查询条件")
      return
    }
    this.qeury(params)
  }

  private qeury(queryList) {
    const requestParams = new RequestParams({
      mainLayerCode: '6533189554047692800',
      layerCodes: queryList
    })
    this.loading = true
    this.service.multipleLayerComparisons(requestParams).subscribe(
      data => {
        this.loading = false
        if (!data.isSuccess) return
        this.addQueryResult(data.geoJson)
        this.onSuccess()
      },
      () => this.loading = false
    )
  }

  private addQueryResult(geoJsonData) {
    const option = {
      stroke: Cesium.Color.RED
    }
    const features = JSON.parse(geoJsonData)
    this.viewer.getViewer().dataSources.add(
      Cesium.GeoJsonDataSource.load(features,option)
    )
  }
}
</script>

<style lang="less" scoped>
</style>
