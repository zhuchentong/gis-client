import router from '~/router'
import { ReminderService } from '~/utils/reminder.service'

export default {
  /**
   * 更新用户登录数据
   */
  updateUserLoginData({ state, commit, dispatch }, { token, user }) {
    // 更新用户菜单资源
    commit('updateUserMenuResource', user.resourceResponses)
    // 清除下载任务列表
    commit('downloadProcessModule/clearDownLoadTasks')
    // 更新用户数据
    commit('updateUserData', {
      id: user.id,
      username: user.username,
      department: user.department
    })
    // 更新用户token
    if (token !== "") {
      commit('updateUserToken', token)
      return true
    } else {
      return false
    }
    // 连接消息推送
  },
  /**
   * 清除登录数据
   */
  clearUserLoginData({ commit }) {
    // 重置用户token
    commit('updateUserToken', '')
    // 更新用户菜单资源
    commit('updateUserMenuResource', [])
    // 重置用户数据
    commit('updateUserData', "")
    // 重置token过期标识
    commit('updateTokenExpire', false)
    // 关闭消息推送
    ReminderService.disConnect()
  }
}