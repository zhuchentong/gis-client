
export const DataMenu = [
  {
    label: "土地现状数据统计",
    component: "land-now"
  },
  {
    label: "土地用途区统计",
    component: "land-use"
  },
  {
    label: "管制区类型统计",
    component: "land-control"

  },
  {
    label: "控制性详细规划统计",
    component: "land-control-detail"
  }
]


export const BussinessMenu = [
  {
    label: "土地现状数据统计",
    component: "land-now"
  },
  {
    label: "土地用途区统计"
  },
  {
    label: "管制区类型统计"
  },
  {
    label: "控制性详细规划统计"
  }
]

export const TaskMenu = [
  {
    label: "土地现状数据统计",
    component: "land-now"
  },
  {
    label: "土地用途区统计"
  },
  {
    label: "管制区类型统计"
  },
  {
    label: "控制性详细规划统计"
  }
]

import LandNow from "./data-menu/land-now.vue"
import LandControl from "./data-menu/land-control.vue"
import LandUse from "./data-menu/land-use.vue"
import LandControlDetail from "./data-menu/land-control-detail.vue"

export const DataComponents = {
  LandNow,
  LandUse,
  LandControlDetail,
  LandControl
}