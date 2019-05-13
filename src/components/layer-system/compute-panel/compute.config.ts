
/**
 * 计算子项配置
 */
export const ComputItems = [
  {
    label: "土地成本分析",
    icon: "compute-cost-land",
    key: "cost-land"
  },
  {
    label: "房屋成本分析",
    icon: "compute-cost-house",
    key: "cost-house"
  },
  {
    label: "收益分析",
    icon: "compute-earnings",
    key: "compute-earning"
  }
]

import CostLand from "./cost-land.vue"
/**
 * 计算相关的组件
 */
export const ComputeComponents = {
  CostLand
}

/**
 * 计算单位
 */
export const ComputUnits = [
  {
    value: 1,
    name: "元/平方米"
  },
  {
    value: 2,
    name: "万元/亩"
  }
]