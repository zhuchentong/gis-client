
export default {
  namespaced: true,
  state: {
    show: false,
    fileList: []
  },
  mutations: {
    setShowState(state, value) {
      state.show = value
      if (!value) {
        // 如果关闭下载列表,删除下载完成的任务
        let index = 0
        do {
          index = state.fileList.findIndex(x => x.percentage === 100)
          if (index > -1) state.fileList.splice(index, 1)
        } while (index > -1)
      }
    },
    addDownLoadInfo(state, value) {
      state.fileList.unshift(value)
      state.show = true
    },
    /**
     * 更新下载进度
     * @param state 
     * @param downLoadInfo 
     */
    updateDownLoadPercentage(state, downLoadInfo: { id: string, percentage: number }) {
      const item = state.fileList.find(x => x.id === downLoadInfo.id)
      if (!item) return
      const percentage = downLoadInfo.percentage
      if (percentage <= 1) {
        item.percentage = Math.floor(percentage * 100)
      } else {
        item.percentage = downLoadInfo.percentage
      }
    },
    deleteDownLoadInfo(state, id) {
      const index = state.fileList.findIndex(x => x.fileId === id)
      if (index > -1) {
        state.fileList.splice(index, 1)
      }
    },
    clearDownLoadTasks(state) {
      state.fileList = []
      state.show = false
    }
  },
  getters: {
    show(state) {
      return state.show
    }
  }
}