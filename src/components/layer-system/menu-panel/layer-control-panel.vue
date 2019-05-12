<template>
  <section ref="display" class="layer-control-panel">
    <transition-group name="flip-list">
      <div
        v-for="(item,index) of layerList"
        :key="item.layer.layerName"
        class="col layer-item text-left"
      >
        <div class="layer-title">{{item.layer.layerName}}</div>
        <div class="setting-text">
          <div v-if="layerList.length > 1" class="row between-span middle-span">
            <span>图层位置</span>
            <div>
              <el-button type="text" @click="raiseLayer(item)" v-show="index" icon="el-icon-top"></el-button>
              <el-button
                type="text"
                @click="lowerLayer(item)"
                v-show="index < (layerList.length - 1)"
                icon="el-icon-bottom"
              ></el-button>
            </div>
          </div>
          <div>
            <span>透明度</span>
            <el-input-number
              size="mini"
              v-model="item.option.alpha"
              :step="0.1"
              :max="1"
              :min="0"
              @change="onAlphaChange(item,$event)"
            ></el-input-number>
          </div>
        </div>
      </div>
    </transition-group>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import MapViewer from '@/components/layer-viewer/map-viewer.vue'
@Component({
  components: {}
})
export default class extends Vue {
  private layerList: any[] = []

  @Prop()
  private viewer!: MapViewer

  private activated() {
    if (this.viewer) {
      this.layerList = this.viewer.getLayerList()
    }
  }

  /**
   * 图层上移
   */
  private raiseLayer(target) {
    const layer = this.viewer.getWMSLayerByLayerId(target.layer.id)
    if (!layer) return
    const index = this.layerList.findIndex(
      x => x.providerLayers === target.providerLayers
    )
    const [target1, target2] = this.layerList.slice(index - 1, index + 1)
    this.layerList.splice(index - 1, 2, target2, target1)
    // 上移
    this.viewer.getViewer().scene.imageryLayers.raise(layer)
  }

  /**
   * 图层下移
   */
  private lowerLayer(target) {
    const layer = this.viewer.getWMSLayerByLayerId(target.layer.id)
    if (!layer) return
    const index = this.layerList.findIndex(
      x => x.providerLayers === target.providerLayers
    )
    const [target1, target2] = this.layerList.slice(index, index + 2)
    this.layerList.splice(index, 2, target2, target1)
    // 下移
    this.viewer.getViewer().scene.imageryLayers.lower(layer)
  }

  /**
   * 调整图层透明度
   */
  private onAlphaChange(target, value) {
    const layer = this.viewer.getWMSLayerByLayerId(target.layer.id)
    if (!layer) return
    layer.alpha = value
  }

  /**
   * 移动图层到顶层
   */
  private raiseToTop(target) {
    const layer = this.viewer.getWMSLayerByLayerId(target.layer.id)
    if (!layer) return
    const index = this.layerList.findIndex(
      x => x.providerLayers === target.providerLayers
    )
    const layerinfos = this.layerList.splice(index, 1)
    this.layerList.splice(0, 0, ...layerinfos)
    // 上移
    this.viewer.getViewer().scene.imageryLayers.raiseToTop(layer)
  }
}
</script>

<style lang="less" scoped>
.layer-control-panel {
  height: 100%;
  .layer-item {
    padding: 5px;
    border-bottom: 1px solid gray;
    padding-bottom: 10px;
    background: white;
    .layer-title {
      margin: 5px 1px;
      font-weight: bold;
    }
    .setting-text {
      padding-left: 10px;
      div > span {
        min-width: 60px;
        display: inline-block;
      }
    }
  }
  .flip-list-move {
    transition: transform 0.8s;
    pointer-events: none;
  }
}
</style>

