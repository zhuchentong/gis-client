<template>
  <section class="component search-area">
    <el-form v-model="model" inline label-width="120px">
      <common-title :showIcon="false" title="土地现状"></common-title>
      <el-form-item label="地类名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="行政区名称" prop="region">
        <district v-model="model.region"></district>
      </el-form-item>
      <el-form-item label="地类面积" prop="area">
        <number-range v-model="model.area"></number-range>
      </el-form-item>
      <common-title :showIcon="false" title="建设用地管制区"></common-title>
      <el-form-item label="管制区类型" prop="GZQLXDM">
        <el-select v-model="model.GZQLXDM" clearable>
          <el-option v-for="{code,name} of searchRangeSetting['GZQLXDM']" :key="code" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
      <common-title :showIcon="false" title="土地用途区"></common-title>
      <el-form-item label="用途区类型" prop="TDYTQLXDM">
        <el-select v-model="model.TDYTQLXDM" clearable>
          <el-option v-for="{code,name} of searchRangeSetting['TDYTQLXDM']" :key="code" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
      <common-title :showIcon="false" title="控制性详情"></common-title>
      <el-form-item label="规划用途" prop="规划用途">
        <el-select v-model="model['规划用途']" clearable>
          <el-option v-for="{code,name} of searchRangeSetting['规划用途']" :key="code" :label="name" :value="code"></el-option>
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
import District from "~/components/business-common/district.vue"
import NumberRange from "~/components/common/number-range.vue"

@Component({
  components: {
    District,
    NumberRange
  }
})
export default class SearchArea extends Vue {

  private searchRangeSetting: any[] = require("~/assets/json/search-range-setting.json")


  private model: any = {
    name: "",
    region: "",
    area: {
      min: "",
      max: ""
    },
    TDYTQLXDM: "",
    "规划用途": "",
    GZQLXDM: ""
  }

  private reset() {
    // 
  }

  private search() {
    // 
  }

}
</script>

<style lang="less" scoped>
</style>
