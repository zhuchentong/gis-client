<template>
  <section class="component cost-land">
    <common-title iconName="info" title="当前选择区域面积">
      <template slot="append">
        <span>{{ area.toFixed(2) }} 平方米</span>
        <span style="margin-left:10px;">{{ area | squareMeterToMu }} 亩</span>
      </template>
    </common-title>

    <el-tabs v-model="currentPanel">
      <el-tab-pane label="输入信息" name="input">
        <el-form :model="model" label-width="110px" ref="form">
          <el-form-item label="选择单位" prop="unit">
            <el-radio-group v-model="model.unit">
              <el-radio
                v-for="{ value, name } of units"
                :key="value"
                :label="value"
                >{{ name }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="土地补偿费" prop="land">
            <el-input v-model="model.land" type="number" :min="0" :max="999999">
              <span slot="append">{{ currentUnit.name }}</span>
            </el-input>
          </el-form-item>
          <el-form-item label="安置补助费" prop="farmPlacement">
            <el-input
              v-model="model.farmPlacement"
              type="number"
              class="inline"
              :min="0"
              :max="999999"
            >
              <span slot="append">元/人</span>
            </el-input>
            <label class="multiply">*</label>
            <el-input
              v-model="model.population"
              type="number"
              class="inline"
              :min="0"
              :max="999999"
            >
              <span slot="append">人</span>
            </el-input>
          </el-form-item>
          <el-form-item label="地上附着物及青苗补偿费" prop="tree">
            <el-input v-model="model.tree" type="number" :min="0" :max="999999">
              <span slot="append">元</span>
            </el-input>
          </el-form-item>
          <el-form-item label="社会保障金" prop="safeguard">
            <el-input
              v-model="model.safeguard"
              type="number"
              :min="0"
              :max="999999"
            >
              <span slot="append">元</span>
            </el-input>
          </el-form-item>
          <el-form-item label="其他" prop="other">
            <el-input
              v-model="model.other"
              type="number"
              :min="0"
              :max="999999"
            >
              <span slot="append">元</span>
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="计算结果" name="result">
        <el-form
          :model="result"
          label-width="110px"
          ref="result"
          class="result"
        >
          <el-form-item label="估算面积">
            <div>{{ result.area.toFixed(2) }}平方米</div>
            <div>{{ result.area | squareMeterToMu }}亩</div>
            <div>{{ result.area | squareMeterToHectare }}公顷</div>
          </el-form-item>
          <el-form-item label="估算价格">
            <div>{{ result.price.toFixed(2) }}元</div>
            <div>{{ result.price | toTenThousand }}万元</div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <div class="operate-buttons">
      <el-button @click="reset">重置</el-button>
      <el-button @click="compute">计算</el-button>
    </div>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ComputUnits } from "~/components/layer-system/compute-panel/compute.config.ts"
import { FilterService } from '~/utils/filter.service'

@Component({
  components: {}
})
export default class CostLand extends Vue {

  @Prop()
  private area!: number

  private resultFlag = false
  private readonly units = ComputUnits
  private currentPanel = "input"

  private model: any = {
    unit: 1,
    land: "",
    farmPlacement: "",
    population: "",
    tree: "",
    safeguard: "",
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
    let result = 0
    result += (this.model.farmPlacement || 0) * (this.model.population || 0)
    result += Number.parseFloat((this.model.tree || 0))
    result += Number.parseFloat((this.model.safeguard || 0))
    result += Number.parseFloat((this.model.other || 0))

    if (this.model.unit === 1) {
      result += (this.model.land || 0) * this.area
    } else {
      result += (this.model.land || 0) * Number.parseFloat(FilterService.squareMeterToMu(this.area)) * 10000
    }

    this.result.area = this.area
    this.result.price = result
    this.currentPanel = "result"
  }

  private reset() {
    (this.$refs.form as any).resetFields()
    this.result.price = 0
    this.model.population = ""
    this.currentPanel = "input"
  }
}
</script>
