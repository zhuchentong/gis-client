<template>
  <section class="component modify-layer-group">
    <el-form ref="form" :model="layerGroup" :rules="rules" label-width="120px">
      <el-form-item prop="groupName" label="名称">
        <el-input v-model="layerGroup.groupName" :maxlength="20"></el-input>
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
import { LayerGroup } from '@/models/layer-group.model'

@Component({
  components: {

  }
})
export default class ModifyLayerGroup extends Vue {

  @Prop({
    type: LayerGroup,
    default: () => new LayerGroup()
  })
  private layerGroup!: LayerGroup

  private rules = {
    groupName: { required: true, message: "请输入分组名称" }
  }

  @Emit("close")
  private emitClose() {
    const form = this.$refs.form as Form
    form.resetFields()
  }

  @Emit("success")
  private emitSuccess(data) {
    this.$message.success("操作成功")
    this.emitClose()
  }

  private commit() {
    const form = this.$refs.form as Form
    form.validate(v => {
      if (!v) return
      this.layerGroup.save().subscribe(this.emitSuccess)
    })
  }

}
</script>

<style lang="less" scoped>
</style>
