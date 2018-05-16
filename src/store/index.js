import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

export default new vuex.Store(
    {
    state: {
        isLogin: 0
    },
    mutations: {
        changeLogin(status) {
            this.$store.state.isLogin = status
        }
    }
}
)