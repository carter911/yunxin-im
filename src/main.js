// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import App from './pages/App'

Vue.use(ElementUI, { size: 'small' })

Vue.use(Vuex)
var axios_instance = axios.create({
  baseURL: 'http://test.e-shigong.com/',
  transformRequest: [function (data) {
    return Qs.stringify(data)
  }],
  headers: {
      'userid': '0',
      'platform': 'web',
      'Content-Type': 'application/x-www-form-urlencoded'
  }
})

Vue.use(VueAxios, axios_instance)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {

    // if (store.state.isLogin == 1) {
    //   next()
    // } else {
    //   store.state.isLogin = 0
    //   next({ path: '/login' })
    // }
    next()
  } else {
    next()
  }
})

var vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
