<template>
  <section class="component compute-earning" v-loading="loading">
    <common-title iconName="info" title="当前选择区域面积">
      <template slot="append">
        <area-detail :area="area"></area-detail>
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
          <el-form-item label="成交单价" prop="transactionPrice">
            <el-input
              v-model="model.transactionPrice"
              type="number"
              :min="0"
              :max="999999"
            >
              <span slot="append">{{ currentUnit.name }}</span>
            </el-input>
          </el-form-item>
          <el-form-item label="土地用途" prop="landUseType">
            <el-radio-group
              v-model="model.landUseType"
              size="mini"
              style="margin-top:0"
            >
              <el-radio-button
                v-for="key of basePriceDataSet.keys()"
                :key="key"
                :label="key"
                >{{ key }}</el-radio-button
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="基准地价" class="base-price">
            <div v-if="!model.landUseType">
              请选择土地用途
            </div>
            <label-container v-else :labelWidth="40" :column="1">
              <label-item
                v-for="item of basePrice"
                :key="item.level"
                :label="item.level"
              >
                <span>{{ item.priceSqm }} 元/平方米</span>
                <span style="margin-left:15px;"
                  >{{ item.priceMu }} 万元/亩</span
                >
              </label-item>
            </label-container>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="分析结果" name="result" class="row">
        <el-card header="预算信息" class="result-card">
          <div v-for="(item, index) of computerResult" :key="index">
            <label-item label="成本级别" :value="item.level"></label-item>
            <label-item label="面积">
              <area-detail :area="item.area"></area-detail>
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
              <area-detail :area="result.area"></area-detail>
            </label-item>
            <label-item label="预算总金额">
              {{ result.cost | toTenThousand }} 万元
            </label-item>
          </div>
        </el-card>
        <el-card header="评估结果" class="result-card">
          <label-item label="评估单价">
            <div>
              {{ getCurrentMoney(model.assessmentPrice).sqm.toFixed(2) }}
              元/平方米
            </div>
            <div>
              {{ getCurrentMoney(model.assessmentPrice).mu.toFixed(4) }}
              万元/亩
            </div>
          </label-item>
          <label-item label="评估总价">
            <div>{{ result.anticipated.toFixed(2) }} 元</div>
            <div>{{ result.anticipated | toTenThousand }} 万元</div>
          </label-item>
          <label-item label="成交单价">
            <div>
              {{ getCurrentMoney(model.transactionPrice).sqm.toFixed(2) }}
              元/平方米
            </div>
            <div>
              {{ getCurrentMoney(model.transactionPrice).mu.toFixed(4) }}
              万元/亩
            </div>
          </label-item>
          <label-item label="成交总价">
            <div>{{ result.knockdown.toFixed(2) }} 元</div>
            <div>{{ result.knockdown | toTenThousand }} 万元</div>
          </label-item>
          <!-- 收益 -->
          <div class="result-content">
            <label-item label="评估收益">
              {{ result.anticipatedMoney | toTenThousand }} 万元
            </label-item>
            <label-item label="成交收益">
              {{ result.knockdownMoney | toTenThousand }} 万元
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
import { ComputUnits, ComputerLayerSetting } from "~/components/layer-system/compute-panel/compute.config.ts"
import { FilterService } from '~/utils/filter.service'
import { RequestParams } from "~/core/http"
import { CesiumCommonService } from '@/utils/cesium/common.service'
import { LayerInfoService } from "~/services/layer-info.service"
import { Inject } from "typescript-ioc"
import { namespace } from 'vuex-class'
import AreaDetail from "~/components/business-system/detail/area-detail.vue"

const LayerRelationModule = namespace('layerRelationModule')

@Component({
  components: {
    AreaDetail
  }
})
export default class ComputeEarning extends Vue {
  @LayerRelationModule.Getter private getRelationByType!: (type) => any
  @Prop()
  private area!: number
  @Prop()
  private positions!: any[]
  @Inject
  private service!: LayerInfoService

  private loading = false

  private layerInfo: any = null

  private readonly units = ComputUnits
  private currentPanel = "input"
  // 万元/亩  -> 元 / 平方米
  private readonly unitByMu: number = 10000 / 15000

  private rules = {
    landUseType: { required: true, message: "请选择土地用途" }
  }

  private model: any = {
    unit: 1,
    assessmentPrice: "",
    landUseType: "",
    transactionPrice: ""
  }

  private basePriceDataSet = new Map<string, any[]>([
    ["住宅基准", []],
    ["商服基准", []],
    ["工业基准", []],
  ])

  private result: any = {
    area: 0,
    cost: 0,
    anticipated: 0,
    knockdown: 0,
    get anticipatedMoney() {
      if (this.anticipated === 0) return 0
      return this.anticipated - this.cost
    },
    get knockdownMoney() {
      if (this.knockdown === 0) return 0
      return this.knockdown - this.cost
    }
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

  private getCurrentMoney(price) {
    const money = Number.parseFloat(price || 0)
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

  private get basePrice() {
    return this.basePriceDataSet.get(this.model.landUseType) || []
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


    if (this.computerResult.length) {
      // 地块总成本
      this.result.cost = this.computerResult.map(v => v.cost).reduce((s, c) => s + c)
      // 地块总面积
      this.result.area = this.computerResult.map(v => v.area).reduce((s, c) => s + c)
    } else {
      this.$message("所选区域在基础地价筛选条件中没有产生交集")
    }
    this.result.anticipated = this.getCurrentMoney(this.model.assessmentPrice).sqm * this.area
    this.result.knockdown = this.getCurrentMoney(this.model.transactionPrice).sqm * this.area

    this.loading = false
    this.currentPanel = "result"
  }

  private async computeArea() {
    // 坐标系数组
    const coordinates = this.positions.map(point => point.join(' ')).join(',')
    const params = new RequestParams({
      wkt: `POLYGON ((${coordinates}))`,
      layerCode: this.layerInfo.layerCode
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

  private mounted() {
    const relation = this.getRelationByType(ComputerLayerSetting.relationType)
    this.layerInfo = {
      ...relation,
      ...ComputerLayerSetting
    }
    // 获取基础价格
    this.service.queryMapSpotByAttr(new RequestParams({
      layerCode: relation.layerCode
    })).subscribe(data => {
      const attrs = data.map(v => v.attr)
      this.basePriceDataSet.forEach((value, key) => {
        value = attrs.map(row => {
          return {
            level: row['级别'],
            priceSqm: this.muToMeter(row[key]).toFixed(2),
            priceMu: Number.parseFloat(row[key]).toFixed(4)
          }
        })
        this.basePriceDataSet.set(key, value)
      })
    })
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
  .result-card {
    width: 49%;
  }
  .result-card + .result-card {
    margin-left: 5px;
  }
}
</style>

<style lang="less">
.component.compute-earning {
  .base-price {
    .el-form-item__content {
      font-size: 12px;
    }
  }
}
</style>

