<template>
  <section class="component check-layer-selecte">
    <el-card v-for="checkGroup in checkContentList" :key="checkGroup.name">
      <div slot="header" class="row middle-span between-span">
        <span>{{ checkGroup.name }}</span>
        <!-- <el-checkbox :value="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
      </div>
      <div>
        <el-checkbox-group v-model="checkGroup.values">
          <el-checkbox
            class="check-item"
            :label="checkItem.code"
            :key="checkItem.code"
            v-for="checkItem in checkGroup.children"
            >{{ checkItem.name }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>
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
import { Tree } from 'element-ui'
import { zip } from 'rxjs'
import { CheckLayerSetting } from "~/components/layer-system/check-panel/check-panel.config"
import { namespace } from 'vuex-class'

const LayerRelationModule = namespace('layerRelationModule')

@Component({
  components: {}
})
export default class CheckLayerSelect extends Vue {
  @Inject
  private groupService!: LayerGroupService
  @Inject
  private layerService!: LayerInfoService
  @LayerRelationModule.Getter private getRelationByType!: (type) => any

  private layerList: any[] = []

  private checkContentList = {
    alarmCheck: {
      values: [],
      name: '预警检测',
      component: 'precautionary',
      children: [] as any[]
    },
    dataCheck: {
      values: [],
      name: '数据分析',
      component: 'data-analyze',
      children: [] as any[]
    },
    businessCheck: {
      values: [],
      name: '业务分析',
      component: 'business-analyze',
      children: [] as any[]
    }
  }

  private mounted() {

    // 预警设置
    this.checkContentList.alarmCheck.children = CheckLayerSetting.precautionary.map(
      item => {
        const relation = this.getRelationByType(item.relationType)
        item.code = relation.layerCode
        return item
      }
    )

    // 数据检测
    this.checkContentList.dataCheck.children = CheckLayerSetting.data.map(
      item => {
        const relation = this.getRelationByType(item.relationType)
        item.code = relation.layerCode
        return item
      }
    )


    // 业务设置
    this.checkContentList.businessCheck.children = CheckLayerSetting.business
  }


  private submit() {
    this.emitSubmit()
  }

  @Emit('submit')
  private emitSubmit() {
    return {
      alarmCheck: this.checkContentList.alarmCheck,
      dataCheck: this.checkContentList.dataCheck,
      businessCheck: this.checkContentList.businessCheck
    }
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

  .check-item {
    display: block;
    padding: 3px;
  }
}
</style>

