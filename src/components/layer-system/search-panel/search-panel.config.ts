export const MenuList = [
  {
    label: "地块检索",
    key: "land",
    icon: "check-area",
    component: 'SearchLand'
  },
  {
    label: "建筑物检索",
    key: "buildings",
    icon: "check-task",
    component: 'SearchBuildings'
  },
  {
    label: "辅助选址",
    key: "area",
    icon: "check-business",
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