// 图层组
export default {
  namespaced: true,
  state: {
    currentMenu: 'layer-list-panel'
  },
  mutations: {
    /**
     * 更新图层分组数据
     * @param state
     * @param data
     */
    updateCurrentMenu(state, key) {
      state.currentMenu = key
    }
  }
}
