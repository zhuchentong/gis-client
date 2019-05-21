
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
    },
    /**
     * 图层关系 根据type查找
     * @param state 
     */
    getRelationByType(state) {
      return (type) => {
        return state.relations.find(x => x.type === type)
      }
    }
  }
}