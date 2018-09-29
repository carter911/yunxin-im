// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import {formatDate} from '@/common/date.js'
import App from './pages/App'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

import EasyScroll from 'easyscroll';

Vue.use(EasyScroll);

if (typeof module === 'object') {
window.jQuery = window.$ = module.exports;
};
Vue.use(preview)
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

//----------------froala editor start---------------------------------
// Require Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min')

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.css')
require('froala-editor/css/froala_style.css')
require('font-awesome/css/font-awesome.css')

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala)
//-----------------froala editor end-----------------------------------



var vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)

})
