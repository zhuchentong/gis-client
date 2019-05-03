// 图层组
export default {
  namespaced: true,
  state: {
    groupList: [],
    businessName: ['报批地图层', '供地图层', '征地图层']
  },
  mutations: {
    /**
     * 更新图层分组数据
     * @param state 
     * @param data 
     */
    updateGroupList(state, data: any[]) {
      state.groupList = data
    }
  },
  getters: {
    /**
     * 获取groupName
     * @param state 
     */
    getGroupName(state) {
      return (groupId: string) => {
        const group = state.groupList.find(x => x.id === groupId)
        return group ? group.groupName : ""
      }
    },
    /**
     * 根据图层组名称获取图层组ID
     * @param state 
     */
    getGroupIdByName(state) {
      return (groupName: string) => {
        const group = state.groupList.find(x => x.groupName === groupName)
        return (group || {}).id
      }
    },
    /**
     * 获取管理图层图层组列表
     * @param state 
     */
    getListByManageLayers(state) {
      return state.groupList.filter(item => !state.businessName.includes(item.groupName))
    },
    /**
     * 获取业务图层组列表
     * @param state 
     */
    getBusinessByManageLayers(state) {
      return state.groupList.filter(item => state.businessName.includes(item.groupName))
    }
  }
}