
export const MenuList = [
  {
    name: "数据统计",
    icon:"report-pie",
    items: [
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
  },
  {
    name: "业务统计",
    icon:"report-line",
    items: [
      {
        label: "报地统计",
        component: "report-land"
      },
      {
        label: "批地统计",
        component: "grant-land"
      },
      {
        label: "征地统计",
        component: "acquisition-land"
      },
      {
        label: "供地统计",
        component: "supply-land"
      }
    ]
  },
  {
    name: "外业统计",
    icon:"report-pie",
    items: [
      {
        label: "外业任务数统计",
        component: "task-number"
      },
      {
        label: "外业任务类型统计",
        component: "task-type"
      },
      {
        label: "地灾分布统计",
        component: "land-disaster-distribution"
      }
    ]
  }
]

import LandNow from "./data-menu/land-now.vue"
import LandControl from "./data-menu/land-control.vue"
import LandUse from "./data-menu/land-use.vue"
import LandControlDetail from "./data-menu/land-control-detail.vue"
import ReportLand from "./data-menu/report-land.vue"
import GrantLand from "./data-menu/grant-land.vue"
import AcquisitionLand from "./data-menu/acquisition-land.vue"
import SupplyLand from "./data-menu/supply-land.vue"
import TaskType from "./data-menu/task-type.vue"
import TaskNumber from "./data-menu/task-number.vue"
import LandDisasterDistribution from "./data-menu/land-disaster-distribution.vue"

export const DataComponents = {
  LandNow,
  LandUse,
  LandControlDetail,
  LandControl
}
export const BussinessComponents = {
  ReportLand,
  GrantLand,
  AcquisitionLand,
  SupplyLand
}
export const TaskComponents = {
  TaskType,
  TaskNumber,
  LandDisasterDistribution
} 