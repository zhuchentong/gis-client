<template>
  <section class="page layer-three-dimensional-manage">
    <data-form :model="searchLayer" :page="pageService" @onSearch="refreshData">
      <template slot="inputs">
        <el-form-item label="图层名称" prop="name">
          <el-input v-model="searchLayer.name"></el-input>
        </el-form-item>
      </template>
    </data-form>
    <data-box :data="dataSet" :page="pageService" @onPageChange="refreshData">
      <template slot="buttons">
        <el-button @click="addLayerClick">新增图层</el-button>
      </template>
      <template slot="columns">
        <el-table-column prop="name" label="图层名称"></el-table-column>
        <el-table-column prop="url" label="图层路径" show-overflow-tooltip></el-table-column>
        <el-table-column prop="heightOffset" label="高度偏移量"></el-table-column>
        <el-table-column prop="createTime" label="添加日期" :formatter="row => $filter.dateTimeFormat(row.createTime)"></el-table-column>
        <el-table-column prop="operatorName" label="添加人"></el-table-column>
        <el-table-column prop="remark" label="说明" show-overflow-tooltip></el-table-column>
        <el-table-column label=" 操作">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text">修改</el-button>
            <el-button @click="deleteLayerClick(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>

    <el-dialog :title="`${layer.id?'修改':'新增'}3D图层配置`" :center="true" :visible.sync="dialog.modifyLayer" :show-close="false">
      <modify-three-dimensional-layer :layer="layer" @close="dialog.modifyLayer = false" @success="refreshData"></modify-three-dimensional-layer>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import { Layout } from "~/core/decorator"
import { Component, Vue } from "vue-property-decorator"
import { State, Mutation, Action, namespace } from "vuex-class"
import DataBox from "~/components/common/data-box.vue"
import SvgIcon from "~/components/common/svg-icon.vue"
import DataForm from "~/components/common/data-form.vue"
import ModifyThreeDimensionalLayer from "~/components/manage-system/layer-manage/modify-three-dimensional-layer.vue"
import { LayerGroup } from "~/models/layer-group.model"
import { LayerInfo } from "~/models/layer-info.model"
import { CommonService } from '~/utils/common.service'
import { PageService } from '~/extension/services/page.service'
import { ThreeDimensionalLayerInfo } from '@/models/three-dimensional-layer-info.model'

@Layout("workspace")
@Component({
  components: {
    DataBox,
    DataForm,
    SvgIcon,
    ModifyThreeDimensionalLayer
  }
})
export default class LayerManage extends Vue {
  private pageService = new PageService()

  private layer = new ThreeDimensionalLayerInfo()
  private searchLayer = new ThreeDimensionalLayerInfo()

  private dialog = {
    modifyLayer: false
  }
  private dataSet: any[] = []


  /**
   * 刷新列表
   */
  private refreshData() {
    this.searchLayer.query(this.pageService).subscribe(d => this.dataSet = d.content)
  }


  private addLayerClick() {
    this.layer = new ThreeDimensionalLayerInfo()
    this.dialog.modifyLayer = true
  }

  private editClick(row: any) {
    this.layer = new ThreeDimensionalLayerInfo()
    CommonService.revertData(this.layer, row)
    this.dialog.modifyLayer = true
  }


  /**
   * 删除图层
   */
  private deleteLayerClick(row: any) {
    this.$confirm(`是否删除【${row.name}】?`).then(() => {
      this.layer.id = row.id
      this.layer.delete().subscribe(() => {
        this.$message.success("操作成功")
        this.refreshData()
      })
    }).catch()
  }


  private mounted() {
    this.refreshData()
  }
}
</script>

<style lang="less" scoped>
</style>
