export default {
  server: process.env.VUE_APP_SERVER,
  attch: process.env.VUE_APP_ATTACH,
  geoServer: process.env.VUE_APP_GEO_SERVER,
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
