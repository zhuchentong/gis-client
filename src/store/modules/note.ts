
export default {
  namespaced: true,
  state: {
    isNoteChanged: Boolean
  },
  mutations: {
    updateIsNoteChanged(state, data) {
      state.isNoteChanged = data
    }
  },
  getters: {
  }
}