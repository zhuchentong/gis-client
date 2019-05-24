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
  },
  {
    label: "地块数据检测",
    key: "block",
    icon: "shp-buffer"
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

export const CheckLayerSetting = {
  // 预警检测
  precautionary: [
    {
      name: '基本农田占用检测',
      type: 'jbnt',
      relationType: '09',
      code: ""
    },
    {
      name: '非允许建设区检测',
      type: 'yxjsq',
      relationType: '02',
      code: ""
    }
  ],
  data: [
    {
      // 地类图斑
      name: '土地变更现状数据分析',
      type: 'bgxz',
      key: 'LAND_CLASSIFICATION',
      relationType: '12',
      code: "",
      sort: 1
    },
    {
      name: '土地用途区数据分析',
      type: 'tdytq',
      key: 'LAND_USE_AREA',
      relationType: '03',
      code: "",
      sort: 2
    },
    {
      name: '控制性详细规划数据分析',
      type: 'kzxxxgh',
      key: 'REGULATORY_PLAN',
      relationType: '04',
      code: "",
      sort: 3
    },
    {
      name: '建设用地管制区',
      type: 'jzydgzq',
      key: 'LAND_CONSTRUCTION',
      relationType: '02',
      code: "",
      sort: 4
    }
  ],
  business: [
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