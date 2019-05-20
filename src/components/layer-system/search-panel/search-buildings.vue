<template>
  <section class="component search-buildings">
    <el-form :model="model" inline ref="form" label-width="120px">
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
    <div class="operate-buttons">
      <el-button @click="reset">重置</el-button>
      <el-button @click="search">搜索</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator"
import MapViewer from "~/components/layer-viewer/map-viewer.vue"
import { CqlBuilder } from "~/utils/cql-build.service"
import { namespace } from "vuex-class"
import { SearchBuildingSetting } from "~/components/layer-system/search-panel/search-panel.config"
import { LayerInfoService } from "~/services/layer-info.service"
import { RequestParams } from "~/core/http"

const LayerRelationModule = namespace('layerRelationModule')

@Component({
  components: {
  }
})
export default class SearchBuildings extends Vue {
  @LayerRelationModule.Getter private layerRelations!: any[]
  @Prop()
  private viewer!: MapViewer

  private model: any = {}
  private layerInfo: any = null

  // layerInfo
  private buildingLayerInfo: any = {}
  // formItems setting
  private searchItems = SearchBuildingSetting.searchItems

  // formItem 数据源
  private searchRangeSetting = {
    "建筑结构": [
      {
        code: "钢混",
        name: "钢混"
      }
    ]
  }

  private created() {
    this.searchItems.forEach(({ code, type }) => {
      this.$set(this.model, code, type === 'number' ? { min: '', max: '' } : '')
    })
  }

  private mounted() {
    // 查找关系， 设置图层
    const service = new LayerInfoService()
    service.getLayerInfoList(new RequestParams({ layerSpace: SearchBuildingSetting.layerSpace }))
      .subscribe(data => {
        const relation = this.layerRelations.find(x => x.type === SearchBuildingSetting.relationType)
        this.buildingLayerInfo = data.find(x => x.layerCode === relation.layerCode)
      })
  }


  private reset() {
    (this.$refs.form as any).resetFields()
    this.viewer.removeLayer(this.buildingLayerInfo)
  }

  private search() {
    this.viewer.removeLayer(this.buildingLayerInfo)
    const cqlBuilder = new CqlBuilder()

    this.searchItems.forEach(({ code, type, filter }) => {
      const queryData = this.model[code]
      if (!queryData) return
      if (type === 'number') {
        const min = queryData.min || 0
        const max = queryData.max || 0
        if (!min && !max) return
        cqlBuilder.addPredicater(code, filter, [min, max])
      } else {
        cqlBuilder.addPredicater(code, filter, queryData)
      }
    })
    this.layerInfo = this.viewer.addLayer(this.buildingLayerInfo, cqlBuilder.build())
  }

}
</script>

<style lang="less" scoped>
</style>
