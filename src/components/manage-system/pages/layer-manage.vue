<template>
  <section class="page layer-manage row">
    <div class="layer-tree">
      <common-title :showIcon="false" title="图层分组" class="layer-tree-title">
        <template slot="append">
          <!-- 开发人员开启此功能 -->
          <el-button type="text" @click="append" v-if="visabledAddGroupFlag">添加根目录</el-button>
        </template>
      </common-title>
      <el-tree :data="treeData" node-key="id" :props="{label:'groupName'}" ref="groupTree" highlight-current @current-change="onCurrentChange" :default-expand-all="true">
        <span slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <!-- 开发人员开启此功能 -->
          <span class="node-item" v-show="visabledAddGroupFlag && currentId === data.id">
            <a @click="() => append(data)" title="增加">
              <svg-icon iconName="add-round" iconSize="13" iconColor="#13227a"></svg-icon>
            </a>
            <a @click="() => edit(node, data)" title="修改">
              <svg-icon iconName="edit-round" iconSize="13"></svg-icon>
            </a>
            <a @click="() => remove(node, data)" title="删除">
              <svg-icon iconName="delete-round" iconSize="13" iconColor="red"></svg-icon>
            </a>
          </span>
        </span>
      </el-tree>
    </div>

    <div class="layer-data-set col-span">
      <data-form :model="searchLayer" :page="pageService" @onSearch="refreshLayers">
        <template slot="inputs">
          <el-form-item label="图层名称" prop="layerName">
            <el-input v-model="searchLayer.layerName"></el-input>
          </el-form-item>
          <el-form-item label="添加日期" prop="createDate">
            <el-date-picker type="date" v-model="searchLayer.createDate"></el-date-picker>
          </el-form-item>
        </template>
      </data-form>
      <data-box :data="dataSet" :page="pageService" @onPageChange="refreshLayers">
        <template slot="buttons">
          <el-button @click="addLayerClick" :disabled="!currentId">新增图层</el-button>
        </template>
        <template slot="columns">
          <el-table-column prop="layerName" label="图层名称" show-overflow-tooltip min-width="180px"></el-table-column>
          <el-table-column prop="layerRemark" label="图层描述" show-overflow-tooltip min-width="180px"></el-table-column>
          <el-table-column prop="layerShow" label="默认显示" :formatter="row => $filter.dictConvert(row.layerShow,'CommonShow')" min-width="90px"></el-table-column>
          <el-table-column prop="createDate" label="添加日期" :formatter="row => $filter.dateFormat(row.createDate)" min-width="90px"></el-table-column>
          <!-- <el-table-column prop="operatorName" label="添加人"></el-table-column> -->
          <el-table-column label=" 操作" :min-width="$helper.getOperateWidth(1)">
            <template slot-scope="scope">
              <el-button @click="deleteLayerClick(scope.row)" type="text">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </data-box>
    </div>

    <el-dialog title="添加图层" :center="true" :visible.sync="dialog.modifyLayer" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <modify-layer :layer="layer" @close="dialog.modifyLayer = false" @success="refreshLayers"></modify-layer>
    </el-dialog>
    <el-dialog :title="`${layerGroup.id ? '维护' : '添加'}组`" :center="true" :visible.sync="dialog.modifyLayerGroup" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
      <modify-layer-group :layerGroup="layerGroup" @close="dialog.modifyLayerGroup = false" @success="refreshGroupList"></modify-layer-group>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import { Layout } from "~/core/decorator"
import { Component, Vue } from "vue-property-decorator"
import { State, Mutation, Action, namespace } from "vuex-class"
import DataBox from "~/components/common/data-box.vue"
import DataForm from "~/components/common/data-form.vue"
import ModifyLayer from "~/components/manage-system/layer-manage/modify-layer.vue"
import ModifyLayerGroup from "~/components/manage-system/layer-manage/modify-layer-group.vue"
import { LayerGroup } from "~/models/layer-group.model"
import { LayerInfo } from "~/models/layer-info.model"
import { CommonService } from '~/utils/common.service'
import { PageService } from '~/extension/services/page.service'
import { Tree } from "element-ui"

const LayerGroupModule = namespace('layerGroupModule')

@Layout("workspace")
@Component({
  components: {
    DataBox,
    DataForm,
    ModifyLayer,
    ModifyLayerGroup
  }
})
export default class LayerManage extends Vue {
  @LayerGroupModule.Mutation private updateGroupList!: (data) => void
  private pageService = new PageService()

  // 开发人员可以开启此功能操作图层列表
  private visabledAddGroupFlag = false

  private layerGroup = new LayerGroup()
  private layer = new LayerInfo()
  private searchLayer = new LayerInfo()
  private groupList = []

  private dialog = {
    modifyLayer: false,
    modifyLayerGroup: false
  }
  private dataSet: any[] = []
  private currentId: string = ""


  /**
   * 添加图层组
   */
  private append(data) {
    this.layerGroup.id = ""
    this.layerGroup.parentId = data ? data.id : ""
    this.dialog.modifyLayerGroup = true
  }

  /**
   * 删除分组
   */
  private remove(node, data) {
    this.$confirm(`确定要删除图层组【${data.groupName}】吗？`, '提示').then(() => {
      this.layerGroup.id = data.id
      this.layerGroup.delete().subscribe(d => {
        this.groupList = d
        this.currentId = ""
        this.refreshGroupList()
      })
    }).catch()
  }

  /**
   * 修改分组
   */
  private edit(node, data: any) {
    this.layerGroup.id = data.id
    this.layerGroup.groupName = data.groupName
    this.layerGroup.parentId = data.parentId
    this.dialog.modifyLayerGroup = true
  }

  /**
   * 刷新树数据
   */
  private refreshGroupList() {
    this.layerGroup.getGroupList().subscribe(data => {
      if (!this.visabledAddGroupFlag) {
        // 非管理员，模式不显示第三方图层空间
        this.groupList = data.filter(x => x.id !== LayerInfo.thirdSpace)
      } else {
        this.groupList = data
      }
      this.updateGroupList(this.groupList)
      //  默认选中节点
      this.$nextTick(() => {
        const roots = this.groupList.filter((x: any) => !x.parentId)
        if (roots.length) {
          this.currentId = (roots[0] as any).id;
          (this.$refs.groupTree as Tree).setCurrentKey(this.currentId)
          this.refreshLayers()
        }
      })
    })
  }

  /**
   * 刷新列表
   */
  private refreshLayers() {
    if (!this.currentId) return
    this.searchLayer.groupId = this.currentId
    this.searchLayer.query(this.pageService).subscribe(d => this.dataSet = d.content)
  }

  /**
   * 当前树节点发生改变
   */
  private onCurrentChange(data) {
    this.currentId = data.id
    this.refreshLayers()
  }

  private addLayerClick() {
    this.layer = new LayerInfo()
    this.layer.groupId = this.currentId
    this.dialog.modifyLayer = true
  }


  /**
   * 删除图层
   */
  private deleteLayerClick(row: LayerInfo) {
    this.$confirm(`是否删除【${row.layerName}】?`).then(() => {
      this.layer.id = row.id
      this.layer.groupId = row.groupId
      this.layer.delete().subscribe(() => {
        this.$message.success("操作成功")
        this.refreshLayers()
      })
    }).catch()
  }

  /**
   * 获取树形结果数据
   */
  public get treeData() {
    const option = {
      keyName: "id",
      parentKeyName: "parentId"
    }
    return CommonService.generateTreeData(this.groupList, option)
  }

  private mounted() {
    this.refreshGroupList()
  }
}
</script>

<style lang="less" scoped>
.page.layer-manage {
  .layer-tree {
    flex-basis: 220px;
  }
  .layer-tree-title {
    padding: 20px 10px;
  }
  .node-item {
    vertical-align: text-top;
    display: inline-block;
    margin-left: 10px;
    > a {
      margin-left: 6px;
    }
  }
}
</style>

<style lang="less">
.page.layer-manage {
  .layer-tree,
  .el-tree {
    background-color: #f9f8f4;
  }
}
</style>
