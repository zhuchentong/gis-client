// 图层组
export default {
  namespaced: true,
  state: {
    currentMenu: {},
  },
  mutations: {
    /**
     * 更新图层分组数据
     * @param state 
     * @param data 
     */
    updateCurrentMenu(state, menuItem) {
      state.currentMenu = menuItem
    }
  },
  getters: {
    currentMenuKey(state) {
      return state.currentMenu.key
    },
    currentComponentName(state) {
      return state.currentMenu.compentName
    }
  }
}