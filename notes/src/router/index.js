import Vue from 'vue'
import Router from 'vue-router'
import Note from '@/components/note/note'
import Hello from '@/components/hello/hello'
import Basic from '@/components/hello/element/basic'
import Input from '@/components/hello/element/input'
import Notice from '@/components/hello/element/notice'
import Others from '@/components/hello/element/others'
import ElementIndex from '@/components/elementUI/index'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Note
    },
    {
      path: '/note',
      name: 'note',
      component: Note
    },
    {
      path: '/element',
      name: 'ElementIndex',
      component: ElementIndex
    },
    {
      path: '/hello',
      name: 'hello',
      component: Hello,
      children: [
        {
          path: '/hello/basic',
          name: Basic,
          component: Basic
        },
        {
          path: '/hello/input',
          name: 'Input',
          component: Input
        },
        {
          path: '/hello/notice',
          name: 'Notice',
          component: Notice
        },
        {
          path: '/hello/others',
          name: 'Others',
          component: Others
        }
      ]
    }
  ]
})
//关键在这里，设置afterEach钩子函数
router.afterEach((to, from, next) => {
  document.title = to.name;
  console.log('$router after 钩子函数')
})

export default router;