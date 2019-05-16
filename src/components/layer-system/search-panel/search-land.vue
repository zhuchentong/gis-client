<template>
  <section class="component search-land">
    <common-title class="select-layer" :showIcon="false" title="选择检索目标：">
      <el-select slot="append" v-model="currentLayer" @change="layerChange" clearable placeholder="请选择要检索的图层">
        <el-option v-for="item of dataSet" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </common-title>
    <div v-if="!searchItems.length" class="no-data"></div>
    <el-form v-else v-model="model" inline ref="form" label-width="120px">
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
import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator"
import MapViewer from "~/components/layer-viewer/map-viewer.vue"
import NumberRange from "~/components/common/number-range.vue"
import { LayerInfoService } from "~/services/layer-info.service.ts"
import { RequestParams } from "~/core/http"
import { Inject } from "typescript-ioc"
import { Form } from "element-ui"

@Component({
  components: {
    NumberRange
  }
})
export default class SearchLand extends Vue {

  private currentLayer = ""

  private searchSetting: any[] = require("~/assets/json/search-setting.json")
  private searchRangeSetting: any[] = require("~/assets/json/search-range-setting.json")

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

  @Watch('visabled', { immediate: true })
  private onVisabledChange(val) {
    if (val) {
      this.dataSet = this.viewer.getLayerList().map(({ layer }) => {
        return {
          id: layer.id,
          name: layer.layerName
        }
      }).filter(x => this.searchLayers.includes(x.name))
    }
  }

  private layerChange(id) {
    this.model = {}
    if (!id) this.searchItems = []
    const layer = this.dataSet.find(x => x.id === this.currentLayer)
    if (!layer) return
    const setting = this.searchSetting.find(x => x.name === layer.name) || {}
    if (!this.searchItems) return
    setting.searchItems.forEach(v => {
      this.model[v.code] = v.type === "number" ? { min: "", max: "" } : ""
    })
    this.searchItems = setting.searchItems
  }

  private reset() {
    (this.$refs.form as Form).resetFields()
  }

  private submit() {
    const requestParams = new RequestParams({
      layerCode: this.currentLayer,
      cql: ""
    })
    this.service.queryMapSpotByAttr(requestParams).subscribe(data => {
      console.log(data)
      this.onSuccess()
    })
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
