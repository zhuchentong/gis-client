export default {
  server: process.env.VUE_APP_SERVER, // 后端服务地址
  attch: process.env.VUE_APP_ATTACH,  // 存放附件地址
  geoServer: process.env.VUE_APP_GEO_SERVER, // geoserver地址
  mapResouce: process.env.VUE_APP_MAP_RESOUCE,  // 地图其他资源 3dtileset raster terrain
  rabbitmq: {
    socket: process.env.VUE_APP_RABBITMQ_SOCKET,
    vhost: process.env.VUE_APP_RABBITMQ_VHOST,
    username: process.env.VUE_APP_RABBITMQ_USERNAME,
    password: process.env.VUE_APP_RABBITMQ_PASSWORD,
    exchange: process.env.VUE_APP_RABBITMQ_EXCHANGE
  },
  debug: process.env.NODE_ENV === 'development',
  timeout: process.env.VUE_APP_TIMEOUT,
  root: process.env.WORK_DIR
}
