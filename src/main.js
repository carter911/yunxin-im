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

import { formatDate } from '@/common/date.js'


Vue.use(Vuex)
var axios_instance = axios.create({
  baseURL: 'http://api.e-shigong.com/',
  transformRequest: [function (data) {
    return Qs.stringify(data)
  }],
  headers: { userid: '1585',
             platform: 'web', 
            'Content-Type': 'application/x-www-form-urlencoded' }
  headers: {
      'userid': '530',
      'platform': 'web',
      'Content-Type': 'application/x-www-form-urlencoded'
  }
})

Vue.use(VueAxios, axios_instance)
Vue.config.productionTip = false
const store = new Vuex.Store({
  state: {
    isLogin: 0,
    user_id: 0,
    deviceid: ''
  },

  mutations: {
    changeLogin (state, status) {
      state.isLogin = status
    }
  }
})

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

//定义remote标签 引入外部js文件
Vue.component('remote-script',{
  render: function (createElement) {
    var self = this;
    return createElement('script', {
        attrs: {
            type: 'text/javascript',
            src: this.src
        },

        on: {
            load: function (event) {
                self.$emit('load', event);
            },
            error: function (event) {
                self.$emit('error', event);
            },

            readystatechange: function (event) {
                if (this.readyState == 'complete') {
                    self.$emit('load', event);
                }
            }
        }
    });
},

props: {
    src: {
        type: String,
        required: true
      }
  }
})

//时间格式化
Vue.filter('formatDate', function(time) {
  let date = new Date(time * 1000)
  return formatDate(date, "yyyy-MM-dd")
})


var vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App),

})
