<template>
  <section class="component check-layer-selecte">
    <el-tree class="tree" show-checkbox ref="layerTree" node-key="id" :props="{label:'name'}" :data="layerList" default-expand-all></el-tree>
    <div class="operate-buttons">
      <el-button @click="submit">确定</el-button>
    </div>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { LayerGroupService } from '~/services/layer-group.service'
import { LayerInfoService } from '~/services/layer-info.service.ts'
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'
import { LayerSpace } from '~/config/business-config.ts'
import { Tree } from "element-ui"
import { zip } from "rxjs"

@Component({
  components: {}
})
export default class CheckLayerSelect extends Vue {

  @Inject
  private groupService!: LayerGroupService
  @Inject
  private layerService!: LayerInfoService

  private layerList: any[] = []

  private mounted() {
    this.getLayerList()
  }


  /**
   * 生成基础图层
   */
  private async getLayerList() {
    // 获取图层目录
    // 获取图层列表
    const [groupList, layerList] = await zip(
      this.groupService.getLayerGroupList(new RequestParams()),
      this.layerService.getLayerInfoList(
        new RequestParams({ layerSpace: LayerSpace.base })
      )
    ).toPromise()

    // 关联图层数据
    layerList.forEach(layer => {
      // 设置图层数据
      const item = {
        id: layer.id,
        name: layer.layerName,
        data: layer,
        type: 'layer'
      }

      const group = groupList.find(x => x.id === layer.groupId)

      if (!group.children) {
        group.children = [item]
      } else {
        group.children.push(item)
      }
    })

    const gerateGroupTree = (id?) => {
      // 设置目录名称
      const children = groupList
        .filter(x => (id ? x.parentId === id : !x.parentId))
        .map(x => ({
          id: x.id,
          name: x.groupName,
          type: 'group',
          children: gerateGroupTree(x.id) || x.children
        }))

      if (children && children.length) {
        return children
      }
    }

    this.layerList = gerateGroupTree()
  }

  private submit() {
    const layerTree = this.$refs.layerTree as Tree
    const layers: string[] = layerTree.getCheckedKeys(true)
    if (!layers.length) {
      this.$message("请选择要对比的图层")
      return
    }
    this.onAffirm(layers)
  }


  @Emit('affirm')
  private onAffirm(data) {
    return data
  }


}
</script>

<style lang="less" scoped>
.component.check-layer-selecte {
  height: 520px;
  .tree {
    height: 460px;
    overflow: auto;
  }
}
</style>

