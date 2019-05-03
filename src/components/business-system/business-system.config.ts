import BusinessDetailInfo from './detail/business-detail-info.vue'
import BusinessDetailAttach from './detail/business-detail-attach.vue'
import BusinessDetailLayer from './detail/business-detail-layer.vue'
import BusinessDetailApprove from './detail/business-detail-approve.vue'
// 新建业务用到的组件
import ReportLand from './add-new/report-land.vue'
import ApproveLand from './add-new/approve-land.vue'
import LevaLand from './add-new/leva-land.vue'
import ProvideLand from './add-new/provide-land.vue'

export const MenuItems = [
  {
    label: '新建箱',
    icon: 'wait',
    status: 'FOUND',
    title: '已经提交业务,还未进行审批的数据'
  },
  {
    label: '打回箱',
    icon: 'return',
    status: 'REPULSE',
    title: '审批不通过的业务'
  },
  {
    label: '待办箱',
    icon: 'businiess-wait',
    status: 'PENDING_APPROVAL',
    title: '需要您进行审批的业务'
  },
  {
    label: '已办箱',
    icon: 'already',
    status: 'COMPLETE_APPROVAL',
    title: '流程全部完成的业务'
  },
  {
    label: '归档箱',
    icon: 'saved',
    status: 'FINSH',
    title: '曾经处理完成,并且已归档的业务'
  }
]

/**
 * 详情页面tabs配置
 */
export const ContentItems = [
  {
    label: '基础信息',
    name: 'baseInfo',
    component: 'BusinessDetailInfo'
  },
  {
    label: '审批流程',
    name: 'approveInfo',
    component: 'BusinessDetailApprove'
  },
  {
    label: '材料附件',
    name: 'attachInfo',
    component: 'BusinessDetailAttach'
  },
  {
    label: '图层数据',
    name: 'layerInfo',
    component: 'BusinessDetailLayer'
  }
]

/**
 * 创建业务基础信息配置
 */
export const BaseInfoConfig = [
  {
    label: '报地',
    value: 'REPORT',
    component: 'ReportLand'
  },
  {
    label: '批地',
    value: 'GRANT',
    component: 'ApproveLand'
  },
  {
    label: '征地',
    value: 'EXPROPRIA',
    component: 'LevaLand'
  },
  {
    label: '供地',
    value: 'SUPPLY',
    component: 'ProvideLand'
  }
]

/**
 * 详情用到的组件
 */
export const DetailComponents = {
  BusinessDetailInfo,
  BusinessDetailAttach,
  BusinessDetailLayer,
  BusinessDetailApprove
}

/**
 * 新建业务 子业务模块
 */
export const NewBusinessComponents = {
  ReportLand,
  ApproveLand,
  LevaLand,
  ProvideLand
}
