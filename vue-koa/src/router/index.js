import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/login'
import TodoList from '@/components/TodoList/todolist'

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
    }
  ]
})
