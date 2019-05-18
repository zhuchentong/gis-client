<template>
  <section class="component compute-earning">
    <common-title iconName="info" title="当前选择区域面积">
      <template slot="append">
        <span>{{ area.toFixed(2) }} 平方米</span>
        <span style="margin-left:10px;">{{ area | squareMeterToMu }} 亩</span>
      </template>
    </common-title>

    <el-tabs v-model="currentPanel">
      <el-tab-pane label="输入信息" name="input">
        <el-form :model="model" label-width="120px" ref="form">
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
          <el-form-item label="评估单价" prop="assessmentPrice">
            <el-input
              v-model="model.assessmentPrice"
              type="number"
              :min="0"
              :max="999999"
            >
              <span slot="append">{{ currentUnit.name }}</span>
            </el-input>
          </el-form-item>
          <el-form-item label="基准地价" prop="landPrice">
            <el-input
              v-model="model.landPrice"
              type="number"
              :min="0"
              :max="999999"
            >
              <span slot="append">{{ currentUnit.name }}</span>
            </el-input>
          </el-form-item>
          <el-form-item label="土地用途" prop="landUseType">
            <el-select v-model="model.landUseType" class="search-worktype">
              <el-option
                v-for="{ code, name } of $dict.getDictData('LandNature')"
                :key="code"
                :label="name"
                :value="code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="计算结果" name="result">
        <el-form :model="result" label-width="120px">
          <el-form-item label="估算面积">
            <div>{{ result.area }} 平方米</div>
            <div>{{ result.area | squareMeterToMu }} 亩</div>
            <div>{{ result.area | squareMeterToHectare }} 公顷</div>
          </el-form-item>
          <el-form-item label="预计收益">
            <div>{{ result.anticipated }} 元</div>
            <div>{{ result.anticipated | toTenThousand }} 万元</div>
          </el-form-item>
          <el-form-item label="评估收益">
            <div>{{ result.assessment }} 元</div>
            <div>{{ result.assessment | toTenThousand }} 万元</div>
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
import { RequestParams } from "~/core/http"
import { CesiumCommonService } from '@/utils/cesium/common.service'

@Component({
  components: {}
})
export default class ComputeEarning extends Vue {
  @Prop()
  private area!: number

  @Prop()
  private polygon!: any[]

  private readonly units = ComputUnits
  private currentPanel = "input"

  private model: any = {
    unit: 1,
    assessmentPrice: "",
    landPrice: "",
    landUseType: "",
  }

  private result: any = {
    area: 0,
    anticipated: 0,
    assessment: 0
  }

  private get currentUnit() {
    return ComputUnits.find(x => x.value === this.model.unit)
  }

  private compute() {
    let result = 0

    // 坐标系数组
    const coordinate = this.polygon.map(x => {
      const point = CesiumCommonService.cartesian3ToDegrees(x)
      return `${point.longitude} ${point.latitude}`
    }).join(',')

    const params = new RequestParams({
      wkt: `POLYGON ((${coordinate}))`,
      layerCode: ""
    })

    if (this.model.unit === 1) {
      result += (this.model.assessmentPrice || 0) * this.area
      result += (this.model.landPrice || 0) * this.area
    } else {
      result += (this.model.assessmentPrice || 0) * Number.parseFloat(FilterService.squareMeterToMu(this.model.assessmentPrice)) * 10000
      result += (this.model.landPrice || 0) * Number.parseFloat(FilterService.squareMeterToMu(this.model.landPrice)) * 10000
    }

    this.result.area = this.area
    this.result.price = result
    this.currentPanel = "result"
  }

  private reset() {
    (this.$refs.form as any).resetFields()
    this.result.price = 0
    this.currentPanel = "input"
  }
}
</script>
