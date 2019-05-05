<template>
  <!-- 征地 -->
  <el-form :model="model" :rules="rules" label-width="120px" ref="form" inline class="component leva-land">
    <el-form-item label="征地文号" prop="code">
      <el-input v-model="model.code" :maxlength="50" placeholder="请输入征地文号"></el-input>
    </el-form-item>
    <el-form-item label="征收日期" prop="levyTime">
      <el-date-picker v-model="model.levyTime" placeholder="请选择征收日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="批文编号" prop="grantCode">
      <el-autocomplete v-model="grantInfo" value-key="code" placeholder="输入3个字符开始搜索" :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" @select="handleSelect"></el-autocomplete>
    </el-form-item>
    <el-form-item label="批地项目" prop="grantName">
      <el-input v-model="model.grantName" :maxlength="50" disabled placeholder="请输入批文编号查询">
        <el-popover slot="append" v-if="model.grantId" title="批地详情" placement="left-start" trigger="click">
          <approve-detail :data="approveInfo"></approve-detail>
          <a slot="reference" title="点击查看批地详情">
            <i class="el-icon-info"></i>
          </a>
        </el-popover>
      </el-input>
    </el-form-item>
  </el-form>
</template>

 <style lang="less">
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Form } from "element-ui"
import { CreateBusinessModel } from "~/models/create-business.model"
import ApproveDetail from "~/components/business-system/detail/approve-detail.vue"

@Component({
  components: {
    ApproveDetail
  }
})
export default class extends Vue {

  private businessModel = new CreateBusinessModel()

  private approveInfo: any = {}
  private model = {
    code: "",
    levyTime: new Date(),
    grantCode: "",
    grantId: "",
    grantName: ""
  }

  private rules = {
    code: { required: true, message: "请输入征地文号" },
    conturn: { required: true, message: "请输入信息" },
    useInfo: { required: true, message: "请输入信息" },
    grantCode: [
      { required: true, message: "请输入批地编号" },
      { validator: this.validateGrantId }
    ]
  }

  public validate() {
    return (this.$refs.form as Form).validate()
  }

  public getData() {
    return { ...this.model, levyTime: this.$filter.dateFormat(this.model.levyTime) }
  }

  public reset() {
    (this.$refs.form as Form).resetFields()
  }

  private get grantInfo() {
    return this.model.grantCode
  }
  private set grantInfo(value) {
    this.model.grantCode = value
    if (!value) this.model.grantId = ""
  }

  private validateGrantId(rule, value, callback) {
    if (!value || !this.model.grantId) {
      callback(new Error("请选择批地项目"))
    } else {
      callback()
    }
  }

  private handleSelect(item) {
    this.model.grantCode = item.code
    this.model.grantId = item.id
    this.model.grantName = item.name
    this.approveInfo = item
  }

  private querySearchAsync(queryStr, callback) {
    this.model.grantId = ""
    this.approveInfo = {}
    if (queryStr.length < 3) callback([])
    this.businessModel.getGrantInfoByCode(queryStr).subscribe(callback)
  }
}
</script>

<style lang="less" scoped>
.component.leva-land {
  .grant-view-button {
    padding: auto 0;
  }
}
</style>


