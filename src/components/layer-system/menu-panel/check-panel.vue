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
        :class="{'active': checkItem.key === item.key}"
      >
        <svg-icon :iconName="item.icon" iconSize="40"></svg-icon>
        <div>{{item.label}}</div>
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
      title="选择业务项目"
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
      >上传文件</file-upload>
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
  // 临时图层
  private tempLayerCode = ''

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

    this.positions = positions
    this.dialog.layer = true
  }

  private taskSelected(data) {
    this.dialog.task = false
    this.positions = data
    this.dialog.layer = true
  }

  private businessSelected(data) {
    this.dialog.business = false
    this.dialog.layer = true
  }

  private layerSelected(checkContent) {
    this.dialog.layer = false
    this.dialog.result = true
    this.dialog.hasResult = true
    this.$nextTick(() => {
      const checkResult = this.$refs['check-result'] as any
      checkResult.startCheck(checkContent, {
        positions: this.positions
      })
    })
  }

  /**
   * 图层上传成功
   */
  private onFileUploadSuccess(id: string, data: any) {
    this.dialog.import = false
    this.tempLayerCode = data.id
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