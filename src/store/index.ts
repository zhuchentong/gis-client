import Vue from 'vue'
import Vuex from 'vuex'
import state from '~/store/state'
// import mutations from '~/store/mutations'
// import actions from '~/store/actions'
// import getters from '~/store/getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // 子模块
  modules: {},
  state,
  // state,
  // getters,
  // mutations,
  // actions,
  plugins: [
    // 持久化存储插件
    createPersistedState({
      key: 'vuex',
      storage: localStorage
    })
  ]
})
