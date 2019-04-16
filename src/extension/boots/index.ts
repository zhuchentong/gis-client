import http from './http'

export * from './launch'

export const boot = () => {
  // 初始化网络配置
  http()
}
