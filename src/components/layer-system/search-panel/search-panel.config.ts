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