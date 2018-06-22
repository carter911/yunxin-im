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
import { formatDate } from '@/common/date.js'
import App from './pages/App'
import cookie from './utils/cookie'

Vue.use(ElementUI, { size: 'small' })
Vue.use(Vuex)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    let userInfo = JSON.parse(localStorage.getItem('userinfo'))
    if(userInfo.userId>0){
      localStorage.setItem('currentMenu',to.name)
      next()
    }else{
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

// 时间格式化
Vue.filter('formatDate', function (time) {
  if (time == undefined || time == null || time == 0 ) return "";
  let date = new Date(time * 1000)
  return formatDate(date, "yyyy-MM-dd")
})

var vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)

})
