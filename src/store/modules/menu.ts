// 图层组
export default {
  namespaced: true,
  state: {
    currentMenuItem: '',
  },
  mutations: {
    /**
     * 更新图层分组数据
     * @param state 
     * @param data 
     */
    updateCurrentMenuItem(state,menuItem) {
      state.currentMenuItem = menuItem
    }
  }
}