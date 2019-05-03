export default {
  /**
   * 更新字典数据
   * @param state
   * @param data
   */
  updateDictData(state, data) {
    state.dictData = data
  },
  /**
   * 更新用户token
   * @param state
   * @param token
   */
  updateUserToken(state, token) {
    if (!token) {
      state.tokenExpire = false
    }
    state.userToken = token
  },
  /**
   * 更新用户数据
   * @param state
   * @param user
   */
  updateUserData(state, user) {
    state.userData = user
  },
  /**
   * 更新用户角色信息
   * @param state
   * @param role
   */
  updateUserRole(state, role) {
    state.userRole = role
  },
  /**
   * 更新用户菜单资源
   * @param state
   * @param rescource
   */
  updateUserMenuResource(state, rescource) {
    state.menuResource = rescource
  },
  /**
   * 修改token过期标识
   * @param state
   * @param data
   */
  updateTokenExpire(state, data) {
    state.tokenExpire = data
  },
  /**
   * 更新初始化状态
   * @param state
   */
  ready(state) {
    state.ready = true
  },
  updateUnReadCount(state, num: number) {
    state.unReadMsgCount = num
  },
  /**
   * 更新相交结果的图层code
   * @param state 
   * @param layerCode 
   */
  pushIntersectLayerCode(state, layerCode) {
    if (!state.intersectLayerCode) state.intersectLayerCode = []
    state.intersectLayerCode.push(layerCode)
  },
  /**
   * 更新相交结果的图层code
   * @param state 
   * @param layerCode 
   */
  deleteIntersectLayerCode(state, layerCode) {
    const findIndex = state.intersectLayerCode.findIndex(x => x === layerCode)
    if (findIndex > -1) state.intersectLayerCode.splice(findIndex, 1)
  }

}