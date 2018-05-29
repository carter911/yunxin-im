import Vue from 'vue'
import Router from 'vue-router'
import ProjectList from '@/pages/project/list.vue'
import ProjectInfo from '@/pages/project/info.vue'
import Login from '@/pages/Login.vue'
import Notfind from '@/pages/common/notfind.vue'
import Admin from '@/pages/Admin.vue'

import NewTaskAdd from "@/components/task/NewTaskAdd.vue"
import RemindDetail from "@/components/remind/RemindDetail.vue"
import TaskDetail from  "@/components/task/TaskDetail.vue"
import remindList from "@/components/remind/RemindList.vue"
import TaskList from "@/components/task/TaskList.vue"
import NewRemindAdd from "@/components/remind/NewRemindAdd.vue"
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
      path : '/project/task/add/:id',
      name : "addNewTask",
      component : NewTaskAdd,
      meta: {auth: true}
    },

    {
      path : '/project/task/detail/:id',
      name : "taskDetail",
      component : TaskDetail,
      meta : {auth : true }
    },

    {
      path : '/project/task/task_list/:id',
      name : "taskList",
      component : TaskList,
      meta : {auth : true }
    },

    // 提醒详情
    {
      path: '/project/remind/detail/:id',
      name: 'remindDetail',
      component: RemindDetail,
      meta: { auth: true }
    },

    {
      path: '/project/remind/remind_list/:id',
      name: 'remindList',
      component: remindList,
      meta: { auth: true }
    },

    {
      path: '/project/remind/add/:id',
      name: 'newRemindAdd',
      component: NewRemindAdd,
      meta: {auth: true}
    },
    {
      path: '*',
      name: '404',
      component: Notfind
    }
  ]
})
