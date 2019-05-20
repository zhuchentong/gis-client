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

@Component({
  components: {}
})
export default class CheckLayerSelect extends Vue {
  @Inject
  private groupService!: LayerGroupService
  @Inject
  private layerService!: LayerInfoService

  private layerList: any[] = []

  private checkContentList = {
    alarmCheck: {
      values: [],
      name: '预警检测',
      component: 'precautionary',
      children: [
        {
          name: '基本农田占用检测',
          type: 'jbnt',
          code: '6534621933959839744'
        },
        {
          name: '非允许建设区检测',
          type: 'yxjsq',
          code: '6534620896976896000'
        }
      ]
    },
    dataCheck: {
      values: [],
      name: '数据分析',
      component: 'data-analyze',
      children: [
        {
          name: '土地变更现状数据分析',
          type: 'bgxz',
          key: 'LAND_CLASSIFICATION',
          code: '6533189554047692800',
        },
        {
          name: '土地用途区数据分析',
          type: 'tdytq',
          key: 'LAND_USE_AREA',
          code: '6534621158219120640'
        },
        {
          name: '控制性详细规划数据分析',
          type: 'kzxxxgh',
          key: 'REGULATORY_PLAN',
          code: '6534621635535110144'
        },
        {
          name: '建设用地管制区',
          type: 'jzydgzq',
          key: 'LAND_CONSTRUCTION',
          code: '6534620896976896000'
        }
      ]
    },
    businessCheck: {
      values: [],
      name: '业务分析',
      component: 'business-analyze',
      children: [
        {
          name: '报地数据分析',
          code: 'bd',
          key: 'REPORT',
          sort: 1
        },
        {
          name: '批地数据分析',
          code: 'pd',
          key: 'GRANT',
          sort: 2
        },
        {
          name: '征地数据分析',
          code: 'zd',
          key: 'EXPROPRIA',
          sort: 3
        },
        {
          name: '供地数据分析',
          code: 'gd',
          key: 'SUPPLY',
          sort: 4
        }
      ]
    }
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

