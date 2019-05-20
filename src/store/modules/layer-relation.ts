
export default {
  namespaced: true,
  state: {
    relations: []
  },
  mutations: {
    updateLayerRelations(state, data: any[]) {
      state.relations = data
    }
  },
  getters: {
    /**
     * 图层关系
     * @param state 
     */
    layerRelations(state) {
      return state.relations.map(v => ({ ...v }))
    }
  }
}