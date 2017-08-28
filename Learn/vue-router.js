/**
 * vue 中，组件怎么做到按需加载
 */
// 需要做的事情就是 code splitting，可以将代码分割成不同的代码块来按需加载
const Home = resolve => require(['../componets/Home'], resolve) // AMD 规范的风格

const IM = r => require.ensure([], () => r(require('../components/IM')), 'IM') // webpack 里面的 require.ensure 特殊风格

// 具体参考 vue-router 懒加载的官方文档

// 全局注册 async Component
let myAsyncComponent = resolve => {
  require(['../Hello.vue'], resolve)
}
Vue.component('Hello', myAsyncComponent)

// 局部注册 async Component，单文件组件中 script 块内容
let myAsyncComponent2 = resolve => {
  require(['../my-async-component'], resolve)
}

// Vue 扩展实例选项
export default {
  components: {
    'async-webpack-example': myAsyncComponent2
  }
}