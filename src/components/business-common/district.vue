<template>
  <el-cascader v-model="prefecture" :options="districtTreeData" change-on-select clearable></el-cascader>
</template>

<script lang="ts">
import { Component, Vue, Emit, Model, Prop } from "vue-property-decorator"
import { namespace } from "vuex-class"
const DistrictModule = namespace("districtModule")

@Component({
  components: {}
})
export default class District extends Vue {
  @DistrictModule.Getter private districtTreeData
  @DistrictModule.Getter private getParents
  private mPrefectures: string[] = []

  @Model('district-change')
  private district!: string

  @Emit('district-change')
  private emitDistrictChange(value) {
    return
  }

  private set prefecture(value) {
    const length = value.length
    this.emitDistrictChange(length ? value[length - 1] : "")
  }

  private get prefecture() {
    return this.getParents(this.district)
  }

}
</script>

<style lang="less" scoped>
</style>
