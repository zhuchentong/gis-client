
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
/**
 * 控制性详细规划颜色配置
 */
export const ChartColorByControl = {
"住宅用地":"#ffff01",
"服务设施用地":"#ffbf7f",
"行政办公用地":"#ff00ff",
"图书馆展览用地":"#ff3f00",
"文化活动用地":"#ff9f7f",
"中小学用地":"#ffbf7f",
"医院用地":"#ff7f7e",
"社会福利用地":"#dc6e89",
"文物古迹用地":"#b80000",
"零售商业用地":"#fe0040",
"批发市场用地":"#dd3601",
"餐饮用地":"#de0000",
"旅馆用地":"#b7002e",
"金融保险用地":"#de006f",
"一类工业用地":"#b98a5c",
"二类工业用地":"#b88a00",
"一类物流仓储用地":"#9f7eff",
"交通枢纽用地":"#c8c8c8",
"交通场站用地":"#808080",
"公共设施用地":"#008ab8",
"公园绿地":"#00ff3f",
"防护绿地":"#00b800",
"广场用地":"#beff7f",
"水域":"#003fff",
"社会停车场用地":"#808080",
"公共交通场站用地":"#808080",
"环卫用地":"#0066cc",
"供燃气用地":"#99ccff",
"通信用地":"#99ccff",
"加油加气站用地":"#993300",
"医疗卫生用地":"#ff8080",

}
/**
 * 管制区类型颜色配置
 */
export const ChartColorByControlType={
  "允许建设区":"#dc647d",
  "限制/有条件建设区":"#ffd27d",
  "限制建设用地区":"#a5ff73",
  "禁止建设区":"#3cb446"
}

/**
 * 土地用途区颜色设置
 */
export const ChartColorByLandUse={
  "城镇建设用地区":"#dc6478",
  "村镇建设用地区":"#f58c8c",
  "独立工矿用地区":"#d2a078",
  "基本农田保护区":"#fcff33",
  "林业用地区":"#78db78",
  "牧业用地区":"#d3ff73",
  "风景旅游用地区":"#0088ff",
  "自然与文化遗产保护区":"#14e600",
  "生态环境安全控制区":"#286e19",
  "其他用地":"#ffffff",
  "一般农用地区":"#ffffbe"
}

/**
 * 土地现状颜色设置
 */
export const ChartColorByLandNow={
  "耕地":"#f4ff7d",
  "水域及水利设施用地":"#73e1e1",
  "园地":"#afff96",
  "林地":"#78dc78",
  "草地":"#d2ff73",
  "城镇村及工矿用地":"#d2a078",
  "其它土地":"#73e1e1",
  "交通运输地":"#fa9632",

  "城市":"#dc6478",
  "建制镇":"#dc6478",
  "村庄":"#e68ca0",
  "风景名胜及特殊用地":"#e67882",
  "除盐田外的采矿用地":"#e67882",

  "沟渠":"#0078c8",
  "农村道路":"#aa5550",
  "铁路用地":"#b2aab0",
  "公路用地":"#aa5550",
  "机场用地":"#eb8282",
  "港口码头":"#eb8282",
  "管道运输用地":"#eb8282",

  "水田":"#ffff64",
  "水浇地":"#ffff96",
  "旱地":"#ffffc8",

  "水库水面":"#96f0ff",
  "坑塘水面":"#a0cdf0",
  "水工建筑用地":"#e68264",
  "河流水面":"#96f0ff",
  "湖泊水面":"#96f0ff",
  "沿海滩涂":"#d7ffff",
  "内陆滩涂":"#d7ffff",
  "冰川及永久积雪":"#87cdf0",

  "果园":"#f5d228",
  "茶园":"#ffc850",
  "其它园地":"#fab914",

  "有林地":"#288c00",
  "灌木林地":"#55b464",
  "其它林地":"#8cd782",

  "天然牧草地":"#aabe1e",
  "人工牧草地":"#96d232",
  "其它草地中荒草地部分":"#c8dc64"
}

