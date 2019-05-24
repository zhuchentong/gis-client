<template>
  <section class="component check-panel" v-loading="loading">
    <el-card shadow="never">
      <div slot="header">
        <span>数据检测</span>
      </div>
      <div
        class="compute-item text-center"
        v-for="item of items"
        :key="item.key"
        @click="onItemClick(item)"
        :class="{ active: checkItem.key === item.key }"
      >
        <svg-icon :iconName="item.icon" iconSize="40"></svg-icon>
        <div>{{ item.label }}</div>
      </div>
    </el-card>

    <div v-if="dialog.hasResult" class="view-result">
      <a @click="dialog.result = true" title="查看分析结果">
        <svg-icon iconName="saved" iconSize="40"></svg-icon>
      </a>
    </div>
    <el-dialog
      title="选择外业项目"
      :center="true"
      :visible.sync="dialog.task"
      width="750px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <task-list-select @affirm="taskSelected"></task-list-select>
    </el-dialog>
    <el-dialog
      title="选择业务项目"
      :center="true"
      :visible.sync="dialog.business"
      width="750px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <business-list-select @affirm="businessSelected"></business-list-select>
    </el-dialog>
    <el-dialog
      title="临时图层上传"
      :center="true"
      :visible.sync="dialog.import"
      width="750px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <file-upload
        ref="attach-upload"
        :AllowExtension="allowExtension"
        :showFileList="false"
        @onUploadSuccess="onFileUploadSuccess"
        >上传文件</file-upload
      >
    </el-dialog>
    <el-dialog
      title="请选择检测项"
      :center="true"
      :visible.sync="dialog.layer"
      width="550px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <check-layer-select @submit="layerSelected"></check-layer-select>
    </el-dialog>
    <el-dialog
      title="检测项结果"
      :center="true"
      :visible.sync="dialog.result"
      width="750px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <check-result ref="check-result"></check-result>
    </el-dialog>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { MenuList } from '~/components/layer-system/check-panel/check-panel.config'
import MapViewer from '~/components/layer-viewer/map-viewer.vue'
import TaskListSelect from '~/components/layer-system/check-panel/task-list-select.vue'
import BusinessListSelect from '~/components/layer-system/check-panel/business-list-select.vue'
import CheckLayerSelect from '~/components/layer-system/check-panel/check-layer-selecte.vue'
import CheckResult from '~/components/layer-system/check-panel/check-result.vue'
import { DrawInteractPolyline } from '~/utils/cesium/interact'
import Cesium from 'cesium/Cesium'
import FileUpload from '~/components/common/file-upload.vue'
import { FileType } from '~/config/enum.config.ts'
import { LayerInfo } from '~/models/layer-info.model.ts'
import { TempLayers } from '~/models/temp-layers.model'
import { CesiumCommonService } from '@/utils/cesium/common.service'
import * as turf from '@turf/turf'

@Component({
  components: {
    TaskListSelect,
    BusinessListSelect,
    CheckLayerSelect,
    CheckResult,
    FileUpload
  }
})
export default class CheckPanel extends Vue {
  @Prop()
  private viewer!: MapViewer
  private items = MenuList
  private allowExtension = [FileType.compressed]
  private tempLayers = new TempLayers()

  private loading = false
  private positions: any[] = []
  private checkItem: any = {}

  // 图层code
  private layerCode = ''
  // 区域 wkt
  private wktStr: string = ""

  private dialog = {
    task: false,
    business: false,
    layer: false,
    result: false,
    hasResult: false,
    import: false
  }

  private onItemClick(item) {
    this.checkItem = item
    this.dialog.hasResult = false
    if (item.key === 'area') {
      this.drawPolygon()
    } else if (item.key === "block") {
      this.selectBlock()
    } else {
      this.dialog[item.key] = true
    }
  }

  /**
   * 区域对比 绘制区域
   */
  private async drawPolygon() {
    const drawInteractPolyline = new DrawInteractPolyline(this.viewer, {
      closed: true,
      fill: true,
      fillColor: Cesium.Color.fromAlpha(Cesium.Color.LIGHTSKYBLUE, 0.5)
    })

    const { positions } = await drawInteractPolyline.start().toPromise()

    if (!positions || positions.length < 3) {
      this.$message('请选择有效测量区域')
      return
    }

    // 生成闭合坐标范围，并转换成经纬度坐标数组
    const lcoaltion = [...positions, positions[0]].map(position => {
      const { longitude, latitude } = CesiumCommonService.cartesian3ToDegrees(position)
      return [longitude, latitude].join(' ')
    })
    // 生成坐标范围表示字符串
    const coordinates = lcoaltion.join(',')
    // 组合WKT字符串
    this.wktStr = `POLYGON ((${coordinates}))`
    this.dialog.layer = true
  }

  /**
   * 任务区域转wkt
   */
  private taskSelected(data) {
    this.dialog.task = false
    if (data && data.length > 3) {
      const lcoaltion = [...data, data[0]].map(item => [item.positionX, item.positionY].join(' '))
      const coordinates = lcoaltion.join(',')
      this.wktStr = `POLYGON ((${coordinates}))`
      this.dialog.layer = true
    } else {
      this.$message("外业巡查数据不是有效区域，请重新选择")
      return
    }
  }

  /**
   * 地块数据转wkt
   */
  private selectBlock() {
    const selectCount = this.viewer.pickEntities.values.length
    if (!selectCount) {
      this.$message("请先选择要对比的地块区域")
      this.checkItem = {}
      return
    }
    const entity = this.viewer.pickEntities.values[0]
    const polygon = entity.polygon
    if (!polygon) {
      this.$message("不是多边形不参与比较")
      return
    }
    const hierarchy = polygon.hierarchy._value as Cesium.PolygonHierarchy
    const positions = hierarchy.positions.map(CesiumCommonService.cartesian3ToDegrees)
    const lcoaltion = positions.map(v => [v.longitude, v.latitude].join(' '))
    const coordinates = lcoaltion.join(',')
    this.wktStr = `POLYGON ((${coordinates}))`
    this.dialog.layer = true
  }

  private businessSelected(data) {
    this.dialog.business = false
    this.layerCode = data.layerCode
    this.dialog.layer = true
  }

  private layerSelected(checkContent) {
    this.dialog.layer = false
    this.dialog.result = true
    this.dialog.hasResult = true
    this.$nextTick(() => {
      const checkResult = this.$refs['check-result'] as any
      checkResult.startCheck(checkContent, {
        wkt: this.wktStr,
        layer: this.layerCode
      })
    })
  }

  /**
   * 图层上传成功
   */
  private onFileUploadSuccess(id: string, data: any) {
    this.dialog.import = false
    this.layerCode = data.id
    const layerInfo = new LayerInfo()
    layerInfo.fileId = data.id
    layerInfo.layerName = data.originalName
    this.loading = true
    layerInfo.publishTempLayer().subscribe(
      () => {
        // 本地缓存存放已经发布的图层
        this.tempLayers.push(data.id, data.originalName)
        this.dialog.layer = true
        this.loading = false
      },
      () => {
        this.$message('本地图层加载失败')
        this.loading = false
      }
    )
  }
}
</script>

<style lang="less" scoped>
.component.check-panel {
  position: relative;
  height: 100%;
  .compute-item {
    padding-top: 20px;
    display: inline-block;
    height: 80px;
    width: 50%;
  }
  .active {
    color: #fc8144;
    background-color: #f3f3f3;
  }
  .view-result {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>