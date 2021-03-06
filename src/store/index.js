import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mutations from './mutations'
import actions from './actions'
import state from './state'
import getters from  "./getters"


const store = new Vuex.Store({
  // 内存数据状态，UI可通过this.$store.state.* 获得数据
  state,

  // 唯一拥有更改内存数据的接口，不可进行异步操作
  mutations,  //this.$store.commit('方法的名称')

  // 与mutation通讯，ui层写入内存数据的接口，可异步操作
  actions,

  //相当于计算属性，也相当于filters
  getters,

  plugins: []
})

export default store
