import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/login'
import TodoList from '@/components/TodoList/todolist'
import Topic from '@/components/topic/topicList'
import Home from '@/components/admin/firstpage'
import Userlist from '@/components/admin/userlist'
import Artical from '@/components/admin/artical'
import Category from '@/components/admin/category'
import AddNewArtical from '@/components/admin/addNewArtical'
import AMap from '@/components/admin/Map/map'
import OneIndex from '@/components/admin/One/one'
import OneEssay from '@/components/admin/One/essay'
import OneMusic from '@/components/admin/One/music'
import Music from '@/components/admin/Music/music'
import NstsTrain from '@/components/admin/Music/nsts'
import About from '@/components/admin/About/about'
import Setting from '@/components/admin/setting'
import index from '@/components/views/index'
import Admin from '@/components/views/admin'
import NSTS from '@/components/nsts/nsts-index'
import Martina from '@/components/admin/chat/martina'
import Webgl from '@/components/admin/chat/webgl'
import DR from '@/components/admin/chat/dr'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
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
      // name: 'index', //要有默认子路由，那父路由的名字name得去掉
      component: index,
      children: [
        {
          path: '/',
          name: 'Topic',
          component: Topic
        }
      ]
    },
    {
      path: '/myadmin',
      // name: 'Admin',
      component: Admin,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: 'userlist',
          name: 'userlist',
          component: Userlist
        },
        {
          path: 'artical',
          name: 'Artical',
          component: Artical
        },
        {
          path: 'category',
          name: '文章分类',
          component: Category
        },
        {
          path: 'artical/addnew',
          name: '新增文章',
          component: AddNewArtical
        },
        {
          path: 'map',
          name: '地图',
          component: AMap
        },
        {
          path: 'one',
          name: '一个',
          component: OneIndex
        },
        {
          path: 'one/essay',
          name: '一个-文章',
          component: OneEssay
        },
        {
          path: 'one/music',
          name: '一个-音乐',
          component: OneMusic
        },
        {
          path: 'music',
          name: '音乐-Music',
          component: Music
        },
        {
          path: 'nsts',
          name: '培训-课件',
          component: NstsTrain
        },
        {
          path: 'martina',
          name: '培训-聊天',
          component: Martina
        },
        {
          path: 'webgl',
          name: 'webgl试验田',
          component: Webgl
        },
        {
          path: 'dr',
          name: 'DR图像',
          component: DR
        },
        {
          path: 'setting',
          name: '相关设置',
          component: Setting
        },
        {
          path: 'about',
          name: '有关于我',
          component: About
        }
      ]
    },
    {
      path: '/nsts',
      component: NSTS
    }
  ]
})

/* router.beforeEach((to, from, next) => {
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
}) */

export default router
