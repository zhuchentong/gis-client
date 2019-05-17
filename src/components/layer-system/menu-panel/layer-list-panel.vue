<template>
  <section>
    <el-tree show-checkbox ref="layerTree" node-key="id" :props="{label:'name'}" :data="layerList" :render-after-expand="false" :default-expanded-keys="expendKeys" @check-change="onCheckChange"></el-tree>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { LayerGroupService } from '~/services/layer-group.service'
import { LayerInfoService } from '~/services/layer-info.service.ts'
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'
import { CommonService } from '~/utils/common.service'
import { LayerSpace } from '~/config/business-config.ts'
import { BusinessLayerService } from '~/services/business-layer.service.ts'
import { ThreeDimensionalLayerService } from '~/services/three-dimensional-layer.service.ts'
import { BaseInfoConfig } from '~/components/business-system/business-system.config.ts'
import AppConfig from '~/config/app.config'
import { zip } from 'rxjs'
import MapViewer from '@/components/layer-viewer/map-viewer.vue'
import { Tree } from "element-ui"

@Component({
  components: {}
})
export default class extends Vue {
  @Prop()
  public viewer!: MapViewer
  @Inject
  private groupService!: LayerGroupService
  @Inject
  private layerService!: LayerInfoService
  @Inject
  private businessLayerSerivce!: BusinessLayerService
  @Inject
  private threeDimensinalService!: ThreeDimensionalLayerService

  private layerList: any[] = []
  private expendKeys: string[] = []

  private tree!: Tree

  private mounted() {
    this.generateLayerList()
    this.tree = this.$refs.layerTree as Tree
  }

  /**
   * 商城图层
   */
  private generateLayerList() {
    Promise.all([
      // 获取基础图层
      this.getLayerList(),
      this.getTilesetList()
    ]).then(([layerList, tilesetList]) => {
      // 默认展开
      layerList.forEach(x => this.expendKeys.push(x.id))

      this.layerList = [...layerList, tilesetList]
    })
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

    return gerateGroupTree()
  }

  /**
   * 三维图层
   */
  private async getTilesetList() {
    const tilesetList = await this.threeDimensinalService
      .getAllLayers(new RequestParams())
      .toPromise()

    return {
      name: '三维图层',
      type: 'group',
      children: tilesetList.map(x => ({
        name: x.name,
        data: x,
        type: 'tileset'
      }))
    }
  }

  /**
   * 图层变更检测
   */
  private onCheckChange(node, checked, indeterminate) {
    switch (node.type) {
      case 'layer':
        const name = this.getLayerName(node.id)
        const nodeData = { ...node.data, layerName: name }
        checked
          ? this.viewer.addLayer(nodeData)
          : this.viewer.removeLayer(nodeData)
        break
      case 'tileset':
        checked
          ? this.viewer.addTileset(node.data)
          : this.viewer.removeTileset(node.data.id)
        break
    }
  }

  private getLayerName(id) {
    const { level, parent, data } = this.tree.getNode(id)
    const name = (data as any).name
    if (level > 2) {
      return [(parent as any).label, '-', name].join('')
    } else {
      return name
    }
  }

  // 遥感影像
  // private getRasterLayers() {
  //   const groupInfo = {
  //     id: 'raster-0101010101',
  //     parentId: null,
  //     name: '遥感影像',
  //     type: 'raster',
  //     url: `${AppConfig.mapResouce}/raster/{z}/{x}/{y}.png`
  //   }
  //   return Promise.resolve([groupInfo])
  // }
}
</script>

<style lang="less" scoped>
</style>

