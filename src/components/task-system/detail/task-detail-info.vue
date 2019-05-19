<template>
  <section class="component task-detail-info">
    <div v-if="!id" class="no-data"></div>
    <div v-else>
      <el-card header="基础信息">
        <label-container :column="2">
          <label-item label="任务名称" :value="info.name"></label-item>
          <label-item
            label="外业类型"
            :value="info.type | dictConvert('PatrolType')"
          ></label-item>
          <label-item label="任务地点">
            <label v-if="!info.positionX">
              未指定任务点
            </label>
            <template v-else>
              <label>经度:{{ info.positionX.toFixed(4) }}，</label>
              <label>维度:{{ info.positionY.toFixed(4) }}</label>
            </template>
          </label-item>
          <label-item
            label="创建时间"
            :value="info.createTime | dateTimeFormat('yyyy年MM月dd日 hh:mm:ss')"
          ></label-item>
          <label-item
            label="任务备注"
            :span="2"
            :value="info.remark"
          ></label-item>
        </label-container>
      </el-card>
      <el-card header="任务计划">
        <label-container :labelWidth="90">
          <label-item label="巡查人员" :value="info.userName"></label-item>
          <label-item
            label="计划时间"
            :value="info.planTime | dateTimeFormat('yyyy年MM月dd日')"
          ></label-item>
          <label-item
            label="需要拍摄照片"
            :value="info.image | dictConvert('CommonShow')"
          ></label-item>
          <label-item
            label="需要拍摄影像"
            :value="info.video | dictConvert('CommonShow')"
          ></label-item>
          <label-item
            label="需要采集数据"
            :value="info.collectData | dictConvert('CommonShow')"
          ></label-item>
        </label-container>
      </el-card>
    </div>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { PatrolInfoService } from "~/services/patrol-info.service"
import { RequestParams } from '~/core/http'
import { Inject } from 'typescript-ioc'
@Component({
  components: {
  }
})
export default class extends Vue {

  @Prop()
  private id!: string

  @Inject
  private sevice!: PatrolInfoService

  private info: any = {}

  @Watch('id', { immediate: true })
  private onIdChange(value) {
    this.info = {}
    const params = new RequestParams({
      id: this.id
    })
    value && this.sevice.getPatrolInfoBase(params).subscribe(data => this.info = data)
  }

}
</script>


