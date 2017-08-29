import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/login'
import TodoList from '@/components/TodoList/todolist'
import index from '@/views/index'
import Topic from '@/components/topic/topicList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/todolist',
      name: 'Todolist',
      component: TodoList
    },
    {
      path: '/index',
      name: 'Index',
      component: index,
      children: [
        {
          path: '/',
          name: 'Topic',
          component: Topic
        }
      ]
    }
  ]
})

/* const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/todolist',
      name: 'Todolist',
      component: TodoList
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('vue-koa-token')
  if (to.path === '/') { // 如果是跳转到登录页
    if (token !== null && token !== 'null') {
      next('todolist') // 如果有token 就转向todolist，不反悔登录页
    }
    next() // 否则跳转回登录页
  } else {
    if (token !== null && token !== 'null') {
      Vue.prototype.$http.default.headers.common['Authorization'] = 'Bearer ' + token
      next() // 如果有token就正常跳转
    } else {
      next('/') // 否则跳转回登录页
    }
  }
})

export default router */
