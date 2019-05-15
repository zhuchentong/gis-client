<template>
  <section class="component business-analyze-base row">
    <div class="analyze-items">
      <div class="analyze-items-item" v-for="{label,value} of analyzeItems" :key="value" @click="currentKey = value" :class="{actived: value === currentKey }">{{label}}</div>
    </div>
    <data-box class="col-span">
      <template :data="data" slot="columns">
        <el-table-column label="项目名称" prop="type" :min-width="$helper.getColumnWidth(2)" show-overflow-tooltip></el-table-column>
        <el-table-column label="批复文号" prop="type" :min-width="$helper.getColumnWidth(2)" show-overflow-tooltip></el-table-column>
        <el-table-column label="项目类型" prop="type" :min-width="$helper.getColumnWidth(2)" :formatter="row => $filter.dictConvert(row.type,'FlowType')" show-overflow-tooltip></el-table-column>
        <el-table-column label="占地面积" prop="type" :min-width="$helper.getColumnWidth(2)" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">查看详情</el-button>
            <el-button type="text">加载图层</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import DataBox from "~/components/common/data-box.vue"
import { FlowInfoService } from "~/services/flow-info.service"
import { RequestParams } from "~/core/http/"
import { Inject } from "typescript-ioc"
import { PageService } from "~/extension/services/page.service"

@Component({
  components: {
    DataBox
  }
})
export default class BusinessAnalyzeBase extends Vue {

  /**
   * 创建业务基础信息配置
   */
  private analyzeItems = [
    {
      label: '报地',
      value: 'REPORT',
    },
    {
      label: '批地',
      value: 'GRANT',
    },
    {
      label: '征地',
      value: 'EXPROPRIA',
    },
    {
      label: '供地',
      value: 'SUPPLY',
    }
  ]

  private currentKey = "REPORT"

  @Prop({ default: () => [] })
  private data!: any[]

}
</script>

<style lang="less" scoped>
.component.business-analyze-base {
  height: 100%;
  .analyze-items {
    width: 80px;
    &-item {
      line-height: 30px;
      border-bottom: solid 1px #f2f2f2;
      text-align: center;
    }
    .actived {
      background-color: #e6b379;
    }
  }
}
</style>
