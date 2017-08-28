import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import AI from '@/components/Chatting/AI'

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
      path: '/ai',
      name: 'AI',
      component: AI
    }
  ]
})
