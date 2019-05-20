<template>
  <section class="component precautionary">
    <el-card v-if="getCheckType('jbnt')" v-loading="!fieldResult">
      <div slot="header" class="row middle-span between-span">
        <label>基本农田占用检测</label>
        <i v-if="fieldResult && fieldResult.alarm" class="el-icon-warning alarm"
          >压占基本农田，疑似违法用地，请核实！</i
        >
        <i v-else class="el-icon-success">未检测到基本农田占用</i>
      </div>
      <label-container
        :column="1"
        :labelWidth="120"
        v-if="fieldResult && fieldResult.data"
      >
        <label-item
          :label="item.label"
          v-for="item of fieldResult.data"
          :key="item.label"
        >
          <label-container :column="2" :labelWidth="120">
            <label-item label="压盖面积">{{ item.area }}平方米</label-item>
            <label-item label="所占比例"
              >{{ (item.radio * 100).toFixed(2) }}%
            </label-item>
          </label-container>
        </label-item>
      </label-container>
    </el-card>
    <el-card v-if="getCheckType('yxjsq')" v-loading="!buildResult">
      <div slot="header" class="row middle-span between-span">
        <label>非允许建设区检测</label>
        <i v-if="buildResult && buildResult.alarm" class="el-icon-warning alarm"
          >压占非允许建设区，疑似违法用地，请核实！</i
        >
        <i v-else class="el-icon-success">未检测到非允许建设区占用</i>
      </div>
      <label-container
        :column="1"
        :labelWidth="120"
        v-if="buildResult && buildResult.data"
      >
        <label-item
          :label="item.label"
          v-for="item of buildResult.data"
          :key="item.label"
        >
          <label-container :column="2" :labelWidth="120">
            <label-item label="压盖面积">{{ item.area }}平方米</label-item>
            <label-item label="所占比例"
              >{{ (item.radio * 100).toFixed(2) }}%
            </label-item>
          </label-container>
        </label-item>
      </label-container>
    </el-card>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { CesiumCommonService } from '@/utils/cesium/common.service'
import { Inject } from 'typescript-ioc'
import { DetectionService } from '~/services/detection.service'
import { RequestParams } from '../../../../core/http'
import { CqlBuilder } from '~/utils/cql-build.service'
import { List } from 'linqts'
import Cesium from "cesium/Cesium"

@Component({
  components: {}
})
export default class Precautionary extends Vue {
  @Prop({
    default: []
  })
  public content

  @Prop()
  public range

  @Inject
  private service!: DetectionService

  // 基本农田检测结果
  private fieldResult: any = null
  // 建设区检测结果
  private buildResult: any = null

  // 基本农田检测列表
  private readonly fieldList = [
    {
      label: '基本农田保护区',
      type: 'TDYTQLXDM',
      value: '010',
      alarm: true
    },
    {
      label: '一般农用地',
      type: 'TDYTQLXDM',
      value: '020'
    }
  ]

  // 建设管制区检测列表
  private readonly buildList = [
    {
      label: '允许建设区',
      type: 'GZQLXDM',
      value: '010'
    },
    {
      label: '有条件建设区',
      type: 'GZQLXDM',
      value: '020',
      alarm: true
    },
    {
      label: '限制建设用地区',
      type: 'GZQLXDM',
      value: '030',
      alarm: true
    },
    {
      label: '禁止建设区',
      type: 'GZQLXDM',
      value: '040',
      alarm: true
    }
  ]

  private mounted() {
    this.startCheck()
  }

  @Watch('content')
  private onChecnChange() {
    this.startCheck()
  }

  private getCheckType(type) {
    return this.content && this.content.some(x => x.type === type)
  }

  /**
   * 开始检测
   */
  private startCheck() {
    this.buildResult = null
    this.fieldResult = null

    // 检测方法配置
    const funSetting = {
      jbnt: this.startFieldCheck,
      yxjsq: this.startBuildCheck
    }


    this.content.forEach(x => {
      const fun = funSetting[x.type]
      fun && fun(x)
      // switch (x.type) {
      //   case 'jbnt':
      //     this.startFieldCheck(x)
      //     break
      //   case 'yxjsq':
      //     this.startBuildCheck(x)
      //     break
      // }
    })
  }

  /**
   * 开始农田占用检测
   */
  private async startFieldCheck({ code }) {
    // 获取检测范围
    const { wkt, layer } = this.range
    // 设置检测条件
    const cql = `"TDYTQLXDM" = '010' or "TDYTQLXDM" = '020'`
    // 检测结果
    let result
    // 获取检测数据
    if (wkt) {
      result = await this.getRangeCheck(code, wkt, cql)
    } else {
      result = await this.getLayerCheck(code, layer, cql)
    }
    if (result && result.length) {
      const alarm = this.getResultAlarm(this.fieldList, result)
      const data = this.getResultData(this.fieldList, result)
      this.fieldResult = {
        alarm,
        data
      }
    } else {
      this.fieldResult = {}
    }
  }

  private async startBuildCheck({ code }) {
    // 获取检测范围
    const { wkt, layer } = this.range
    // 检测结果
    let result
    // 获取检测数据
    if (wkt) {
      result = await this.getRangeCheck(code, wkt)
    } else {
      result = await this.getLayerCheck(code, layer)
    }
    if (result && result.length) {
      const alarm = this.getResultAlarm(this.buildList, result)
      const data = this.getResultData(this.buildList, result)
      this.buildResult = {
        alarm,
        data
      }
    } else {
      this.buildResult = {}
    }
  }

  private getResultData(list, result) {
    return list
      .map(item => ({
        label: item.label,
        data: result
          .map(x => x.attr)
          .filter(x => x[item.type] === item.value)
          .map(x => ({
            area: x['结果形状面积'],
            total: x['对比图层总面积']
          }))
      }))
      .map(item => ({
        label: item.label,
        area: new List(item.data).Sum((x: any) => x.area).toFixed(2),
        radio: new List(item.data).Sum((x: any) => x.area / x.total)
      }))
  }

  /**
   * 获取预警状态
   */
  private getResultAlarm(list, result) {
    return list
      .filter(item => item.alarm)
      .some((x: any) => result.find(y => y.attr[x.type] === x.value))
  }

  /**
   * 进行区域检测 使用WKT 区域对比
   */
  private getRangeCheck(mainLayerCode, wktStr, cql?) {
    // 获取对比数据
    return this.service
      .getDetectionWkt(
        new RequestParams({
          wkt: wktStr,
          layerCode: mainLayerCode,
          cql
        })
      )
      .toPromise()
  }

  /**
   * 区域对比  使用图层对比
   */
  private getLayerCheck(mainLayerCode, checkLayerCode, cql?) {
    return this.service.getDetectionLayerCode(
      new RequestParams({
        layerCode1: checkLayerCode,
        layerCode2: mainLayerCode,
        cql
      })
    ).toPromise()
  }
}
</script>

<style lang="less" scoped>
.component.precautionary {
  .alarm {
    color: red;
  }
}
</style>

