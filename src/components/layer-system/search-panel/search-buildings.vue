<template>
  <section class="component search-buildings">
    <el-form v-model="model" inline label-width="120px">
      <el-form-item label="结构类型" prop="type">
        <el-input v-model="model.type"></el-input>
      </el-form-item>
      <el-form-item label="层数" prop="floors">
        <el-input v-model="model.floors"></el-input>
      </el-form-item>
      <el-form-item label="行政区" prop="region">
        <district v-model="model.region"></district>
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
    type: "",
    floors: "",
    region: ""
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
