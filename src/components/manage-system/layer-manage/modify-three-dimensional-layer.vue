<template>
  <section class="component modify-three-dimensional-layer">
    <el-form ref="form" :model="layer" :rules="rules" label-width="120px">
      <el-form-item prop="name" label="图层名称">
        <el-input v-model="layer.name" :maxlength="50"></el-input>
      </el-form-item>
      <el-form-item prop="heightOffset" label="高度偏移量">
        <el-input type="number" v-model="layer.heightOffset"></el-input>
      </el-form-item>
      <el-form-item prop="url" label="图层路径">
        <el-input type="textarea" v-model="layer.url" :rows="1" :maxlength="300" placeholder="请输入json文件的url地址"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="图层说明">
        <el-input type="textarea" :maxlength="200" v-model="layer.remark"></el-input>
      </el-form-item>
    </el-form>
    <div class="operate-buttons">
      <el-button @click="emitClose">取消</el-button>
      <el-button @click="commit">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator"
import { Form } from 'element-ui'
import { ThreeDimensionalLayerInfo } from '@/models/three-dimensional-layer-info.model'

@Component({
  components: {}
})
export default class ModifyThreeDimensionalLayer extends Vue {

  @Prop({
    type: ThreeDimensionalLayerInfo,
    default: () => new ThreeDimensionalLayerInfo()
  })
  private layer!: ThreeDimensionalLayerInfo

  private loading = false
  private rules = {
    name: { required: true, message: "请输入图层名称" },
    url: [
      { required: true, message: "请输入图层路径" },
      { pattern: /(http|https):\/\/[^\s]*.json$/, message: "请输入正确的url地址" }
    ],
    heightOffset: { required: true, message: "请输入高度偏移量" }
  }

  @Emit("close")
  private emitClose() {
    const form = this.$refs.form as Form
    form.resetFields()
  }

  @Emit("success")
  private emitSuccess() {
    this.$message.success("操作成功")
    this.emitClose()
  }

  private commit() {
    const form = this.$refs.form as Form
    form.validate(v => {
      if (!v) return
      this.layer.save().subscribe(this.emitSuccess, () => this.loading = false)
    })
  }
}
</script>

<style lang="less" scoped>
</style>
