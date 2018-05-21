import Vue from 'vue'
import Router from 'vue-router'
import ProjectList from '@/pages/project/list.vue'
import ProjectInfo from '@/pages/project/info.vue'
import Login from '@/pages/common/login.vue'
import LoginOut from '@/pages/common/loginout.vue'
import Notfind from '@/pages/common/notfind.vue'
import Admin from '@/pages/Admin.vue'
import Chat from '@/pages/chat/index.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {auth: true},
      children: [
        {
          path: '',
          name: 'admin_index',
          component: ProjectList
        },
        {
          path: 'project',
          name: 'admin_project',
          component: ProjectList
        },
        {
          name: 'admin_project',
          path: 'project/:status',
          component: ProjectList
        },
        {
          name: 'admin_chat',
          path: 'chat',
          component: Chat
        }
      ]
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/loginout',
      name: 'loginout',
      component: LoginOut
    },
    {
      path: '/project/list',
      name: 'projectList',
      component: ProjectList,
      meta: {auth: true}
    },
    {
      path: '/project/info/:id',
      name: 'projectinfo',
      component: ProjectInfo,
      meta: {auth: true}
    },
    {
      path: '*',
      name: '404',
      component: Notfind
    }
  ]
})
