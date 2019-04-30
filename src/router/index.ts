import Router from 'vue-router'

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'business-system'
    }
  ]
})
