import { CommonService } from "~/utils/common.service"

export default {
  namespaced: true,
  state: {
    districtList: []
  },
  mutations: {
    updateDistrictData(state, data) {
      state.districtList = data
    }
  },
  getters: {
    /**
     * 获取行政区划树
     * @param state 
     */
    districtTreeData(state) {
      const option = {
        keyName: 'id',
        parentKeyName: "parentId"
      }
      const source = state.districtList.map(v => {
        return {
          label: v.districtName,
          value: v.id,
          id: v.id,
          parentId: v.parentId
        }
      })
      return CommonService.generateTreeData(source, option)
    },
    getParents(state) {
      return (id: string) => {
        const ids = [id]
        let parent: any = state.districtList.find(x => x.id === id)
        while (parent) {
          ids.unshift(parent.id)
          parent = state.districtList.find(x => x.id === parent.parentId)
        }
        return ids
      }
    },
    getDistrictName(state) {
      return (id: string) => {
        const data = state.districtList.find(x => x.id === id)
        return (data || {}).districtName
      }
    }
  }
}