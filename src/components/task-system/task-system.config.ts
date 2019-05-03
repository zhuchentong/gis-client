import TaskDetailAttach from "./detail/task-detail-attach.vue"
import TaskDetailData from "./detail/task-detail-data.vue"
import TaskDetailInfo from "./detail/task-detail-info.vue"

export const MenuItems = [
  {
    label: '未巡查',
    icon: 'wait',
    status: 'PENDING_PATROL'
  },
  {
    label: '已巡查',
    icon: 'already',
    status: 'COMPLETE_PATROL'
  },
  {
    label: '已归档',
    icon: 'saved',
    status: 'ARCHIVE'
  }
]

/**
 * 详情页面tabs配置
 */
export const ContentItems = [
  {
    label: '基本信息',
    name: 'baseInfo',
    component: 'TaskDetailInfo'
  },
  {
    label: '巡查结果',
    name: 'taskResult',
    component: 'TaskDetailAttach'
  },
  {
    label: '巡查数据',
    name: 'taskData',
    component: 'TaskDetailData'
  }
]

/**
 * 详情用到的组件
 */
export const DetailComponents = {
  TaskDetailAttach,
  TaskDetailData,
  TaskDetailInfo
}
