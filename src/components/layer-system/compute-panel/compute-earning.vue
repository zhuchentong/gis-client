<template>
  <section class="component compute-earning" v-loading="loading">
    <common-title iconName="info" title="当前选择区域面积">
      <template slot="append">
        <span>{{ area.toFixed(2) }} 平方米</span>
        <span style="margin-left:10px;">{{ area | squareMeterToMu }} 亩</span>
      </template>
    </common-title>

    <el-tabs v-model="currentPanel">
      <el-tab-pane label="输入信息" name="input">
        <el-form :model="model" label-width="120px" ref="form" :rules="rules">
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
          <el-form-item label="土地用途" prop="landUseType">
            <el-select v-model="model.landUseType" class="search-worktype">
              <el-option label="住宅用地" value="住宅基准"></el-option>
              <el-option label="商业用地" value="商服基准"></el-option>
              <el-option label="工业用地" value="工业基准"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="分析结果" name="result" class="row">
        <el-card class="col-span-6" header="评估结果">
          <label-item label="预算面积">
            <div>{{ area.toFixed(2) }} 平方米</div>
            <div>{{ area | squareMeterToMu }} 亩</div>
            <div>{{ area | squareMeterToHectare }} 公顷</div>
          </label-item>
          <label-item label="评估单价">
            <div>
              {{ getCurrentMoney.sqm.toFixed(2) }}
              元/平方米
            </div>
            <div>
              {{ getCurrentMoney.mu.toFixed(4) }}
              万元/亩
            </div>
          </label-item>
          <label-item label="评估收益">
            <div>{{ result.anticipated.toFixed(2) }} 元</div>
            <div>{{ result.anticipated | toTenThousand }} 万元</div>
          </label-item>
        </el-card>
        <el-card class="col-span-6" header="预算信息">
          <div v-for="(item, index) of computerResult" :key="index">
            <label-item label="成本级别" :value="item.level"></label-item>
            <label-item label="面积">
              {{ item.area.toFixed(2) }} 平方米
            </label-item>
            <label-item label="单价">
              {{ item.price.toFixed(2) }} 元/平方米
            </label-item>
            <label-item label="金额">
              {{ item.cost | toTenThousand }} 万元
            </label-item>
          </div>
          <div class="result-content">
            <label-item label="预算总面积">
              <span>{{ result.area }} 平方米</span>
              <span style="margin-left:10px">{{ result.area | squareMeterToMu }} 亩</span>
            </label-item>
            <label-item label="预算总金额">
              {{ result.cost | toTenThousand }} 万元
            </label-item>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <div class="operate-buttons">
      <el-button @click="reset">重置</el-button>
      <el-button @click="compute">计算</el-button>
    </div>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ComputUnits } from "~/components/layer-system/compute-panel/compute.config.ts"
import { FilterService } from '~/utils/filter.service'
import { RequestParams } from "~/core/http"
import { CesiumCommonService } from '@/utils/cesium/common.service'
import { LayerInfoService } from "~/services/layer-info.service"
import { Inject } from "typescript-ioc"

@Component({
  components: {}
})
export default class ComputeEarning extends Vue {
  @Prop()
  private area!: number
  @Prop()
  private positions!: any[]
  @Inject
  private service!: LayerInfoService

  private loading = false

  private readonly units = ComputUnits
  private currentPanel = "input"
  // 万元/亩  -> 元 / 平方米
  private readonly unitByMu: number = 10000 / 15000

  private rules = {
    assessmentPrice: { required: true, message: "请输入评估单价" },
    landUseType: { required: true, message: "请选择土地用途" }
  }

  private model: any = {
    unit: 1,
    assessmentPrice: "",
    landUseType: ""
  }

  private result: any = {
    area: 0,
    cost: 0,
    anticipated: 0
  }

  private computerResult: any[] = []

  private get currentUnit() {
    return ComputUnits.find(x => x.value === this.model.unit)
  }


  private meterToMu(price) {
    return (price * 15000 / 10000)
  }

  private muToMeter(price) {
    return (price * 10000 * 0.0015)
  }

  private get getCurrentMoney() {
    const money = Number.parseFloat(this.model.assessmentPrice || 0)
    if (this.model.unit === 1) {
      return {
        sqm: money,
        mu: this.meterToMu(money)
      }
    } else {
      return {
        sqm: this.muToMeter(money),
        mu: money
      }
    }
  }


  private async compute() {
    const validateResult = await (this.$refs.form as any).validate().then(v => v).catch(() => false)
    if (!validateResult) return

    this.loading = true

    const serverResult = await this.computeArea()
    if (!serverResult) {
      this.$message("形状交互失败，请重试")
      this.loading = false
      return
    }

    // 地块总成本
    this.result.cost = this.computerResult.map(v => v.cost).reduce((s, c) => s + c)
    // 地块总面积
    this.result.area = this.computerResult.map(v => v.area).reduce((s, c) => s + c).toFixed(2)

    this.result.anticipated = this.getCurrentMoney.sqm * this.area

    this.loading = false
    this.currentPanel = "result"
  }

  private async computeArea() {
    // 坐标系数组
    const coordinates = this.positions.map(point => point.join(' ')).join(',')
    const params = new RequestParams({
      wkt: `POLYGON ((${coordinates}))`,
      layerCode: "6533273251451228160"
    })
    const result = await this.service.intersectionWkt(params).toPromise()
    if (!result) return false
    this.computerResult = JSON.parse(result.geoJson).features.map(({ properties }) => {
      return {
        price: this.muToMeter(Number.parseFloat(properties[this.model.landUseType])),
        area: properties['结果形状面积'],
        level: properties['级别'],
        get cost() {
          // 此地块成本  元 / 平方米
          return this.price * this.area
        }
      }
    })
    return true
  }

  private reset() {
    (this.$refs.form as any).resetFields()
    this.result.price = 0
    this.currentPanel = "input"
  }
}
</script>

<style lang="less" scoped>
.component.compute-earning {
  .result-content {
    border: 1px solid #bfc9c0;
    border-radius: 5px;
    padding: 5px 0;
  }
}
</style>

