<template>
  <section class="component search-buildings">
    <el-form v-model="model" inline label-width="120px">
      <el-form-item label="建筑结构" prop="建筑结构">
        <el-input v-model="model['建筑结构']"></el-input>
      </el-form-item>
      <el-form-item label="建筑层数" prop="建筑层数">
        <el-input v-model="model['建筑层数']"></el-input>
      </el-form-item>
      <el-form-item label="坐落位置" prop="坐落位置">
        <district v-model="model['坐落位置']"></district>
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

@Component({
  components: {
    District
  }
})
export default class SearchBuildings extends Vue {

  private model: any = {
    '建筑结构': "",
    '建筑层数': "",
    '坐落位置': ""
  }

  private buildingType = ["钢混"]

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
