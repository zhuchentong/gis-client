
export default {
  namespaced: true,
  state: {
    // 图片窗口状态
    imgDialog: false,
    // 视频窗口状态
    videoDialog: false,
    // 图片信息
    imgInfo: {},
    // 视频信息
    videoInfo: {}
  },
  mutations: {
    updateImgInfo(state, info: { url: string, title: string }) {
      state.imgInfo = info
      state.imgDialog = true
    },
    updateVideoInfo(state, info: { url: string, title: string }) {
      state.videoInfo = info
      state.videoDialog = true
    },
    udpateimgState(state, flag) {
      state.imgDialog = flag
    },
    updatevideoState(state, flag) {
      state.videoDialog = flag
    },
    resetState(state) {
      state.imgInfo = {}
      state.imgDialog = false
      state.videoInfo = {}
      state.videoDialog = false
    }
  }
}