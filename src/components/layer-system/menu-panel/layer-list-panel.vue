<template>
  <section>
    <el-tree show-checkbox ref="layerTree" node-key="id" :props="{label:'name'}" :data="layerList" :render-after-expand="false" :default-expanded-keys="expendKeys">
    </el-tree>
  </section>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { LayerGroupService } from "~/services/layer-group.service"
import { LayerInfoService } from "~/services/layer-info.service.ts"
import { Inject } from "typescript-ioc"
import { RequestParams } from "~/core/http"
import { CommonService } from "~/utils/common.service"
import { LayerSpace } from "~/config/business-config.ts"
import { BusinessLayerService } from "~/services/business-layer.service.ts"
import { ThreeDimensionalLayerService } from "~/services/three-dimensional-layer.service.ts"
import { BaseInfoConfig } from "~/components/business-system/business-system.config.ts"
import AppConfig from "~/config/app.config"

@Component({
  components: {}
})
export default class LayerListPanel extends Vue {

  @Inject
  private groupService!: LayerGroupService
  @Inject
  private layerService!: LayerInfoService
  @Inject
  private businessLayerSerivce!: BusinessLayerService
  @Inject
  private threeDimensinalService!: ThreeDimensionalLayerService

  private layerList: any[] = []


  private mounted() {
    // this.generateBaseLayers().then(data => this.layerList = data)
    Promise.all([this.generateBaseLayers(), this.queryThreeDimensionalLayers(), this.getRasterLayers()])
      .then(data => this.layerList = [...data])

  }



  private queryLayerGroups() {
    return new Promise((resolve, reject) => {
      this.groupService.getLayerGroupList(new RequestParams(null)).subscribe(resolve, reject)
    })
  }

  private queryBaseLayers() {
    const params = new RequestParams({ layerSpace: LayerSpace.base })
    return new Promise((resolve, reject) => {
      this.layerService.getLayerInfoList(new RequestParams(null)).subscribe(resolve, reject)
    })
  }

  // 生成基础图层
  private async generateBaseLayers() {
    const [groupList, baseLayers] = await Promise.all([this.queryLayerGroups(), this.queryBaseLayers()]).then(datas => datas)

    const groupOption = {
      keyName: 'id',
      parentKeyName: 'parentId'
    }

    const groupTree = CommonService.generateTreeData(groupList, groupOption)

    // 生成图层文件叶子节点
    const getChildrenLayer = (groupId) => {
      return (baseLayers as any[]).filter(x => x.groupId === groupId).map(v => {
        return {
          id: v.id,
          parentId: groupId,
          type: 'shp',
          name: v.layerName,
          layerCode: v.layerCode,
          layerSpace: v.layerSpace
        }
      })
    }

    // 生成图层组
    const setGroupItemInfo = (group) => {
      group.name = group.groupName
      group.type = 'group'
      if (group.children) {
        group.children.forEach(setGroupItemInfo)
      }
      group.children = [getChildrenLayer(group.id), ...group.children || []]
    }

    return groupTree
  }

  // 三维图层
  private queryThreeDimensionalLayers() {
    return new Promise((resolve, reject) => {
      this.threeDimensinalService.getAllLayers(new RequestParams(null)).subscribe(data => {
        const children = data.map(v => {
          return {
            id: v.id,
            parentId: 'layer-3d-0101010101',
            name: v.name,
            heightOffset: v.heightOffset,
            url: v.url,
            type: "tileset"
          }
        })

        const groupInfo = {
          id: 'layer-3d-0101010101',
          parentId: null,
          name: "三维图层",
          type: "group",
          children
        }
        resolve([groupInfo])
      }, reject)
    })
  }

  // 遥感影像
  private getRasterLayers() {
    const groupInfo = {
      id: 'raster-0101010101',
      parentId: null,
      name: "遥感影像",
      type: "raster",
      url: `${AppConfig.mapResouce}/raster/{z}/{x}/{y}.png`
    }
    return Promise.resolve([groupInfo])
  }


}
</script>

<style lang="less" scoped>
</style>

