<template>
  <section class="component modify-site" v-loading="loading">
    <el-form :model="model" label-width="150px" ref="form">
      <el-form-item label="隐患点名称" prop="name">
        <el-input v-model="model.name" :maxlength="50" placeholder="请输入隐患点名称"></el-input>
      </el-form-item>
      <el-form-item label="所属行政村" prop="prefecture">
        <district v-model="model.prefecture"></district>
      </el-form-item>
      <el-form-item label="等级" prop="grade">
        <el-select v-model="model.grade">
          <el-option v-for="{code,name} of $dict.getDictData('DisasterGrade')" :key="code" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="model.status">
          <el-option v-for="{code,name} of $dict.getDictData('CommonState')" :key="code" :label="name" :value="code"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="operate-buttons">
      <el-button @click="onClose">取消</el-button>
      <el-button @click="submit">确定</el-button>
    </div>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator'
import { DangerSiteModel } from "~/models/danger-site.model"
import District from "~/components/business-common/district.vue"
import { Form } from "element-ui"
import { Inject } from 'typescript-ioc'
import { LandDisasterService } from '~/services/land-disaster.service'
import { RequestParams } from '~/core/http'

@Component({
  components: {
    District
  }
})
export default class ModifySite extends Vue {

  @Prop({ type: DangerSiteModel, default: () => new DangerSiteModel() })
  private model!: DangerSiteModel

  private rules = {
    name: { required: true, message: "请输入隐患点名称" },
    prefecture: { required: true, message: "请选择所属行政村" },
    grade: { required: true, message: "请选择地灾等级" },
    status: { required: true, message: "请选择隐患状态" }
  }

  private loading = false

  @Inject
  private service!: LandDisasterService

  @Emit('close')
  private onClose() {
    return
  }

  @Emit('success')
  private onSuccess() {
    this.loading = false
    this.$message.success("操作成功");
    (this.$refs.form as Form).resetFields()
    this.onClose()
  }

  private async submit() {
    const result: boolean = await (this.$refs.form as Form).validate().then(v => v)
    if (!result) return

    const requestParams = new RequestParams(this.model)
    const fun = this.model.id ? this.service.editLandDisaster : this.service.createLandDisaster
    this.loading = true
    fun(requestParams).subscribe(this.onSuccess, () => this.loading = false)
  }
}
</script>

<style lang="less" scoped>
</style>

