<template>
  <section class="component create-new-task">
    <el-form :model="baseModel" :rules="baseRules" inline label-width="130px" ref="baseForm">
      <el-form-item label="任务名称" prop="name">
        <el-input v-model="baseModel.name" :maxlength="50" clearable></el-input>
      </el-form-item>
      <el-form-item label="外业类型" prop="type">
        <el-select v-model="baseModel.type" clearable>
          <el-option v-for="{code,name} of $dict.getDictData('PatrolType')" :key="code" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="巡查人员" prop="userId">
        <user-select v-model="baseModel.userId"></user-select>
      </el-form-item>
      <el-form-item label="巡查时间" prop="planTime">
        <el-date-picker v-model="baseModel.planTime"></el-date-picker>
      </el-form-item>
      <el-form-item label="任务地点" prop="cartographic">
        <el-input readonly :value="siteValue" class="inline-full-textarea">
          <a slot="append" title="点击选择任务地点" @click="dialog.selectPoint = true">
            <i class="el-icon-location"></i>
          </a>
        </el-input>
      </el-form-item>
      <el-form-item label="需要拍摄照片" prop="image">
        <el-select v-model="baseModel.image">
          <el-option v-for="{code,name} of $dict.getDictData('CommonShow')" :key="code" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="需要拍摄影像" prop="video">
        <el-select v-model="baseModel.video">
          <el-option v-for="{code,name} of $dict.getDictData('CommonShow')" :key="code" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="需要采集数据" prop="collectData">
        <el-select v-model="baseModel.collectData">
          <el-option v-for="{code,name} of $dict.getDictData('CommonShow')" :key="code" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务备注" prop="remark">
        <el-input type="textarea" :rows="1" :maxlength="250" v-model="baseModel.remark" class="inline-full-textarea"></el-input>
      </el-form-item>
    </el-form>
    <div class="operate-buttons">
      <el-button @click="onClose">取消</el-button>
      <el-button @click="onSubmit">提交</el-button>
    </div>

    <el-dialog title="选择巡查点" :center="true" :visible.sync="dialog.selectPoint" width="850px" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
      <select-point v-model="baseModel.cartographic" @submit="dialog.selectPoint = false"></select-point>
    </el-dialog>
  </section>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch, Emit } from 'vue-property-decorator'
import District from "~/components/business-common/district.vue"
import { PatrolInfoModel } from "~/models/patrol-info.model"
import UserSelect from "~/components/business-common/user-select.vue"
import { PatrolInfoService } from "~/services/patrol-info.service"
import { RequestParams } from '~/core/http'
import { Inject } from "typescript-ioc"
import MapViewer from "~/components/layer-viewer/map-viewer.vue"
import { CesiumInteractService } from "~/utils/cesium/interact.service.ts"
import SelectPoint from "~/components/layer-viewer/select-point.vue"

@Component({
  components: {
    District,
    UserSelect,
    SelectPoint
  }
})
export default class extends Vue {
  // 基础信息
  private baseModel = new PatrolInfoModel()

  @Inject
  private service!: PatrolInfoService

  private dialog = { selectPoint: false }

  private baseRules = {
    name: { required: true, message: "请输入项目名称" },
    type: { required: true, message: "请选择项目类型" },
    userId: { required: true, message: "请选择巡查人员" },
    planTime: { required: true, message: "请选择巡查时间" },
    cartographic: { required: true, message: "请选择巡查地点" },
  }

  @Emit('close')
  private onClose() {
    const c: any = this.$refs.baseForm
    c.resetFields()
  }

  @Emit('success')
  private onSuccess() {
    this.$message.success(`创建任务成功`)
    this.onClose()
  }

  private get siteValue() {
    if (!this.baseModel.positionX) return ''
    return `${this.baseModel.positionX.toFixed(4)},${this.baseModel.positionY.toFixed(4)}`
  }


  /**
   * 提交操作
   */
  private async onSubmit() {
    const tmpComponent: any = this.$refs.baseForm
    const result = await tmpComponent.validate().then(v => v).catch(v => false)
    if (!result) return

    const params = {
      ...this.baseModel,
      planTime: this.$filter.dateFormat(this.baseModel.planTime)
    }
    this.service.createPatrolInfo(new RequestParams(params))
      .subscribe(this.onSuccess)

  }
}
</script>


<style lang="less">
.component.create-new-task {
  .el-form .el-form-item .el-form-item__content .inline-full-textarea {
    width: 500px;
  }
}
</style>

