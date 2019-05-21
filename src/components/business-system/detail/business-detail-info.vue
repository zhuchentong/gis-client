<template>
  <section class="component business-detail-info">
    <div class="no-data" v-if="!flowId"></div>
    <div v-else>
      <el-card header="基础信息">
        <label-container :column="2">
          <label-item label="项目名称" :value="info.name"></label-item>
          <label-item
            label="项目类型"
            :value="info.type | dictConvert('FlowType')"
          ></label-item>
          <label-item label="项目面积">
            <area-detail :area="info.acreage" :unit="info.unit"></area-detail>
          </label-item>
          <label-item
            label="行政区"
            :value="info.region | districtName"
          ></label-item>
          <label-item
            label="备注信息"
            :span="2"
            :value="info.remark"
          ></label-item>
        </label-container>
      </el-card>
      <el-card header="业务关联信息">
        <label-container
          v-if="info.type !== 'REPORT' && (info.reportId || info.grantId)"
          :column="2"
        >
          <label-item
            v-if="info.reportId"
            label="报地名称"
            :value="info.reportName"
          >
            <el-popover title="报地详情" placement="right">
              <report-detail :data="reportInfo"></report-detail>
              <a
                slot="reference"
                title="点击查看报地详情"
                @click="queryReportInfo"
              >
                <i class="el-icon-info"></i>
              </a>
            </el-popover>
          </label-item>
          <label-item
            v-if="['EXPROPRIA', 'SUPPLY'].includes(info.type) && info.grantId"
            label="批地名称"
            :value="info.grantName"
          >
            <el-popover title="批地详情">
              <approve-detail :data="grantInfo"></approve-detail>
              <a
                slot="reference"
                title="点击查看批地详情"
                @click="queryGrantInfo"
              >
                <i class="el-icon-info"></i>
              </a>
            </el-popover>
          </label-item>
        </label-container>
        <div v-else style="padding-left:80px">暂无关联信息</div>
      </el-card>
      <el-card header="业务专属字段">
        <label-container :column="2">
          <!-- 报地 -->
          <div v-if="info.type === 'REPORT'">
            <label-item
              label="申报日期"
              :value="info.applyTime | dateTimeFormat('yyyy年MM月dd日')"
            ></label-item>
          </div>
          <!-- 批地 -->
          <div v-if="info.type === 'GRANT'">
            <label-item
              label="批复日期"
              :value="info.grantTime | dateTimeFormat('yyyy年MM月dd日')"
            ></label-item>
            <label-item label="批文编号" :value="info.grantCode"></label-item>
            <label-item label="报地项目" :value="info.grantName"></label-item>
            <label-item
              label="批复结果"
              :value="info.result | dictConvert('GrantResult')"
            ></label-item>
            <label-item label="批复信息" :value="info.grantRemark"></label-item>
          </div>
          <!-- 征地 -->
          <div v-if="info.type === 'EXPROPRIA'">
            <label-item
              label="征收日期"
              :value="info.levyTime | dateTimeFormat('yyyy年MM月dd日')"
            ></label-item>
            <label-item label="征地文号" :value="info.grantName"></label-item>
            <label-item label="批文编号" :value="info.grantCode"></label-item>
          </div>
          <!-- 供地 -->
          <div v-if="info.type === 'SUPPLY'">
            <label-item
              label="供地日期"
              :value="info.supplyTime | dateTimeFormat('yyyy年MM月dd日')"
            ></label-item>
            <label-item
              label="宗地编号"
              :value="info.supplyNumber"
            ></label-item>
            <label-item
              label="供地方式"
              :value="info.supplyWay | dictConvert('ProvisionType')"
            ></label-item>
            <label-item label="供地文号" :value="info.supplyCode"></label-item>
            <label-item label="批文编号" :value="info.grantCode"></label-item>
            <label-item
              label="发布公告"
              :value="info.notice | dictConvert('CommonShow')"
            ></label-item>
            <label-item
              label="土地用途"
              :value="info.nature | dictConvert('LandNature')"
            ></label-item>
            <label-item
              label="具体地址"
              :span="2"
              :value="info.address"
            ></label-item>
          </div>
        </label-container>
      </el-card>
    </div>
  </section>
</template>


<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { BusinessFlowModel } from '~/models/business-flow.model'
import { FlowInfoService } from '~/services/flow-info.service'
import { ReportInfoService } from '~/services/report-info.service'
import { GrantInfoService } from '~/services/grant-info.service.ts'
import { Inject } from 'typescript-ioc'
import { RequestParams } from '~/core/http'
import ReportDetail from '~/components/business-system/detail/report-detail.vue'
import ApproveDetail from '~/components/business-system/detail/approve-detail.vue'
import AreaDetail from "~/components/business-system/detail/area-detail.vue"

@Component({
  components: {
    ReportDetail,
    ApproveDetail,
    AreaDetail
  }
})
export default class extends Vue {
  @Prop()
  private flowId!: string

  private businessFlowModel = new BusinessFlowModel()

  @Inject
  private flowService!: FlowInfoService

  @Inject
  private reportService!: ReportInfoService

  @Inject
  private grantService!: GrantInfoService

  private info: any = {}
  private reportInfo: any = {}
  private grantInfo: any = {}

  @Watch('flowId', { immediate: true })
  private onIdChange(value) {
    if (!value) {
      this.info = {}
      this.reportInfo = {}
      this.grantInfo = {}
      return
    }
    this.flowService
      .getBusinessInfoByFlowId(new RequestParams({ flowId: value }))
      .subscribe(data => (this.info = data))
  }

  /**
   * 查询报地信息
   */
  private queryReportInfo() {
    const reportId = this.info.reportId
    if (!reportId) return
    if (this.reportInfo.id) return
    this.reportService
      .getReportById(new RequestParams(null, { append: [reportId] }))
      .subscribe(data => (this.reportInfo = data))
  }

  /**
   * 查询批地详情
   */
  private queryGrantInfo() {
    const grantId = this.info.grantId
    if (!grantId) return
    if (this.grantInfo.id) return
    this.grantService
      .getGrantInfoById(new RequestParams(null, { append: [grantId] }))
      .subscribe(data => (this.grantInfo = data))
  }
}
</script>


