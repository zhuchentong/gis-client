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
        <el-table-column prop="heightOffset" label="高度偏移量(米)"></el-table-column>
        <el-table-column prop="createTime" label="添加日期" :formatter="row => $filter.dateTimeFormat(row.createTime)"></el-table-column>
        <el-table-column prop="userName" label="添加人"></el-table-column>
        <el-table-column prop="remark" label="说明" show-overflow-tooltip></el-table-column>
        <el-table-column label=" 操作">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text">修改</el-button>
            <el-button @click="deleteLayerClick(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>

    <el-dialog :title="`${layer.id?'修改':'新增'}三维图层配置`" :center="true" :visible.sync="dialog.modifyLayer" :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false">
      <modify-three-dimensional-layer :layer="layer" @close="dialog.modifyLayer = false" @success="refreshData"></modify-three-dimensional-layer>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import { Layout } from "~/core/decorator"
import { Component, Vue } from "vue-property-decorator"
import DataBox from "~/components/common/data-box.vue"
import DataForm from "~/components/common/data-form.vue"
import ModifyThreeDimensionalLayer from "~/components/manage-system/layer-manage/modify-three-dimensional-layer.vue"
import { CommonService } from '~/utils/common.service'
import { PageService } from '~/extension/services/page.service'
import { ThreeDimensionalLayerInfo } from '@/models/three-dimensional-layer-info.model'
import { ThreeDimensionalLayerService } from "~/services/three-dimensional-layer.service.ts"
import { Inject } from "typescript-ioc"
import { RequestParams } from "~/core/http"

@Layout("workspace")
@Component({
  components: {
    DataBox,
    DataForm,
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

  @Inject
  private service!: ThreeDimensionalLayerService

  /**
   * 刷新列表
   */
  private refreshData() {
    const params = new RequestParams(
      { name: this.searchLayer.name },
      { page: this.pageService })
    this.service.query(params).subscribe(d => this.dataSet = d.content)
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
      const optionParam = {
        append: [row.id]
      }
      this.service.delete(new RequestParams(null, optionParam))
        .subscribe(() => {
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
