
export const MenuList = [
  {
    name: "数据统计",
    icon: "report-pie",
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
    icon: "report-line",
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
    icon: "report-pie",
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


/**
 * 季度设置
 */
export const QuarterSetting = [
  {
    code: 1,
    name: "一季度"
  },
  {
    code: 2,
    name: "二季度"
  },
  {
    code: 3,
    name: "三季度"
  },
  {
    code: 4,
    name: "四季度"
  }
]

/**
 * 根据季度查找对应中文
 * @param code 季度代码 
 */
export function queryQuarterName(code: number) {
  if (!code) return ""
  const quarterly = QuarterSetting.find(x => x.code === code)
  return quarterly ? quarterly.name : code
}

/**
 * 地灾等级颜色配置
 */
export const ChartColorByLevel = [

  {
    name:"一级",
    code :"ONE",
    color:"#19d4ae",
    sort:1
  },{
    name:"二级",
    code :"TWO",
    color:"#63c2ff",
    sort:2
  },{
    name:"三级",
    code :"THREE",
    color:"#FFA500",
    sort:3
  },{
    name:"四级",
    code :"FOUR",
    color:"#ffb980",
    sort:4
  },{
    name:"五级",
    code :"FIVE",
    color:"#fa6e86",
    sort:5
  }
  // "一级" : "#19d4ae",
  // "二级":"#63c2ff",
  // "三级":"#FFA500",
  // "四级":"#ffb980",
  // "五级":"#fa6e86",
  // "OTHER" : "#BDB76B"
]