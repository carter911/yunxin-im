// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './pages/App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

Vue.use(ElementUI, { size: 'small' })

Vue.use(Vuex)
var axios_instance = axios.create({
  baseURL: 'http://api.e-shigong.com/',
  transformRequest: [function (data) {
    return Qs.stringify(data)
  }],
  headers: {
      'userid': '530',
      'platform': 'web',
      'Content-Type': 'application/x-www-form-urlencoded'
  }
})

Vue.use(VueAxios, axios_instance)
Vue.config.productionTip = false
// const store = new Vuex.Store({
//   state: {
//     isLogin: 0,
//     user_id: 0,
//     deviceid: ''
//   },
//   mutations: {
//     changeLogin (state, status) {
//       state.isLogin = status
//     }
//   }
// })

router.beforeEach((to, from, next) => {
  var isLogin = sessionStorage.getItem('isLogin')
  console.log(to.path)
  store.state.isLogin = isLogin
  console.log(store.state.isLogin);
  if (to.matched.some(m => m.meta.auth)) {
    if (store.state.isLogin == 1) {
      next()
    } else {
      store.state.isLogin = 0
      next({ path: '/login' })
    }
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
