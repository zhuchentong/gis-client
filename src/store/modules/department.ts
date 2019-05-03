import { CommonService } from "~/utils/common.service"

export default {
  namespaced: true,
  state: {
    departmentList: []
  },
  mutations: {
    updateDeptData(state, data) {
      state.departmentList = data
    }
  },
  getters: {
    deptTreeData(state) {
      const option = {
        keyName: 'id',
        parentKeyName: "parentId"
      }
      const source = state.departmentList.map(v => ({ ...v }))
      return CommonService.generateTreeData(source, option)
    },
    getParents(state) {
      return (id: string) => {
        const ids = [id]
        let parent: any = state.departmentList.find(x => x.id === id)
        while (parent) {
          ids.unshift(parent.id)
          parent = state.departmentList.find(x => x.id === parent.parentId)
        }
        return ids
      }
    }
  }
}