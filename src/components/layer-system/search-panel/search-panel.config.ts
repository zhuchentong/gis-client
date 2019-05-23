export const MenuList = [
  {
    label: "地块检索",
    key: "land",
    icon: "search-land",
    component: 'SearchLand'
  },
  {
    label: "建筑物检索",
    key: "buildings",
    icon: "search-buildings",
    component: 'SearchBuildings'
  },
  {
    label: "辅助选址",
    key: "area",
    icon: "search-area",
    component: 'SearchArea'
  }
]


import SearchArea from "~/components/layer-system/search-panel/search-area.vue"
import SearchBuildings from "~/components/layer-system/search-panel/search-buildings.vue"
import SearchLand from "~/components/layer-system/search-panel/search-land.vue"

/**
 * 检索面板用到的dialog
 */
export const SearchDialogs = {
  SearchArea,
  SearchBuildings,
  SearchLand
}


/**
 *  辅助选址 使用的图层配置
 *  子项 layerCode 需要和 LayerRelation 关联
 *  关联查找方式 1. use_type === search (数据库，便于确认数据项)
 *              2. relationType === LayerRelation.type
 */
export const SearchAreaLayerSetting = [
  {

    relationType: "12",
    showName: '土地现状', // 界面显示的搜索类型名称
    items: ['DLMC', 'ZLDWMC', 'TBDLMJ'],
    main: true // 表示主图层，用于结果做交集
  },
  {
    relationType: '02',
    showName: '建设用地管制区',
    items: ['GZQLXDM']
  },
  {
    relationType: '03',
    showName: '土地用途区',
    items: ['TDYTQLXDM']
  },
  {
    relationType: '04',
    showName: '控制性详细规划',
    items: ['用地代码']
  }
]


export const SearchBuildingSetting = {
  relationType: '15',
  layerSpace: "third-space",
  searchItems: [
    {
      name: "建筑结构",
      code: "jiegou",
      type: "range",
      filter: "equal"
    }, {
      name: "建筑层数",
      code: "cengshu",
      type: "string",
      filter: "equal"
    }, {
      name: "占地面积",
      code: "mianji",
      type: "number",
      filter: "between"
    }, {
      name: "坐落位置",
      code: "zuoluo",
      type: "string",
      filter: "like"
    }
  ]
}