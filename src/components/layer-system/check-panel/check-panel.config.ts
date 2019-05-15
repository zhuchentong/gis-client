export const MenuList = [
  {
    label: "区域数据检测",
    key: "area",
    icon: "check-area"
  },
  {
    label: "外业数据检测",
    key: "task",
    icon: "check-task"
  },
  {
    label: "业务图层检测",
    key: "business",
    icon: "check-business"
  },
  {
    label: "导入图层检测",
    key: "import",
    icon: "check-import"
  }
]

/**
 * 结果tab配置
 */
export const ResultTabs = [
  {
    label: "预警检测",
    key: "precautionary"
  },
  {
    label: "数据检测",
    key: "data-analyze"
  },
  {
    label: "业务分析",
    key: "business-analyze"
  }
]

import BusinessAnalyze from "./check-result/business-analyze.vue"
import DataAnalyze from "./check-result/data-analyze.vue"
import Precautionary from "./check-result/precautionary.vue"

/**
 * 结果组件
 */
export const ResultComponents = {
  BusinessAnalyze,
  DataAnalyze,
  Precautionary
}