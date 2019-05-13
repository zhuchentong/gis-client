<template>
  <section class="component cost-land">
    <el-form :model="model" label-width="120px" ref="form">
      <el-form-item label="选择单位" prop="unit">
        <el-radio-group v-model="model.unit">
          <el-radio v-for="{value,name} of units" :key="value" :label="value">{{name}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="房屋补偿费" prop="land">
        <el-input v-model="model.land" type="number" :min="0" :max="999999">
          <span slot="append">{{currentUnit.name}}</span>
        </el-input>
      </el-form-item>
      <el-form-item label="拆迁补助费" prop="removal">
        <el-input v-model="model.removal" type="number" class="inline" :min="0" :max="999999">
          <span slot="append">元/户</span>
        </el-input>
        <label class="multiply">*</label>
        <el-input v-model="model.removalHouseHolds" type="number" class="inline" :min="0" :max="999999">
          <span slot="append">户</span>
        </el-input>
      </el-form-item>
      <el-form-item label="安置补助费" prop="houseplacement">
        <el-input v-model="model.houseplacement" type="number" class="inline" :min="0" :max="999999">
          <span slot="append">元/人</span>
        </el-input>
        <label class="multiply">*</label>
        <el-input v-model="model.population" type="number" class="inline" :min="0" :max="999999">
          <span slot="append">人</span>
        </el-input>
      </el-form-item>
      <el-form-item label="奖励" prop="award">
        <el-input v-model="model.award" type="number" class="inline" :min="0" :max="999999">
          <span slot="append">元/户</span>
        </el-input>
        <label class="multiply">*</label>
        <el-input v-model="model.awardHouseHolds" type="number" class="inline" :min="0" :max="999999">
          <span slot="append">户</span>
        </el-input>
      </el-form-item>
      <el-form-item label="其他" prop="other">
        <el-input v-model="model.other" type="number" :min="0" :max="999999">
          <span slot="append">元</span>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="operate-buttons">
      <el-button @click="reset">重置</el-button>
      <el-button @click="compute">计算</el-button>
    </div>
    <el-form v-if="resultFlag" :model="result" label-width="140px" ref="result">
      <el-form-item label="估算面积">
        <div>{{result.area}}平方米</div>
        <div>{{result.area | squareMeterToMu}}亩</div>
        <div>{{result.area | squareMeterToHectare}}公顷</div>
      </el-form-item>
      <el-form-item label="估算价格">
        <div>{{result.price}}元</div>
        <div>{{result.price | toTenThousand}}万元</div>
      </el-form-item>
    </el-form>
  </section>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ComputUnits } from "~/components/layer-system/compute-panel/compute.config.ts"

@Component({
  components: {}
})
export default class CostHouse extends Vue {

  private resultFlag = false
  private readonly units = ComputUnits

  private model: any = {
    unit: 1,
    house: "",
    removal: "",
    removalHouseHolds: "",
    houseplacement: "",
    population: "",
    award: "",
    awardHouseHolds: "",
    other: ""
  }

  private result: any = {
    area: 0,
    price: 0
  }

  private get currentUnit() {
    return ComputUnits.find(x => x.value === this.model.unit)
  }

  private compute() {
    this.result.area = 3223.21
    this.result.price = 49332.33
    this.resultFlag = true
  }

  private reset() {
    let form: any = this.$refs.form
    form.resetFields()
    form = this.$refs.result
    form.resetFields()
    this.model.population = ""
    this.resultFlag = false
  }
}
</script>

<style lang="less" scoped>
.component.cost-land {
}
</style>

