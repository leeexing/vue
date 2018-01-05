// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import router from './router/router'

import store from './store/index'
// Vue全局使用 布局模块
import ElementUI from 'element-ui'
Vue.use(ElementUI)
// 图标
import 'font-awesome/css/font-awesome.css'

import axios from 'axios'
Vue.prototype.$http = axios // Vue.use(axios) // 没有官方文档要求需要这么使用，这么使用会报错 protocol

import 'element-ui/lib/theme-default/index.css' // 地图
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '2e0abcc359177669f4ebeb9210891452',
  plugin: ['AMap.Geolocation', 'AMap.Autocomplete',
    'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
    'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor',
    'AMap.CircleEditor']
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  data: {
    Bus: new Vue() // 用于非父子组件之间通信的通道
  }
})
