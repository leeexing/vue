<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './assets/main.css'
import Login from './components/Login/Login.vue'
import AI from './components/Chatting/AI.vue'
export default {
  name: 'app',
  components: {
    Login,
    AI
  },
  beforeCreate () {
    console.log('Powered by leeing')
  },
  created () {
    localStorage.addr = '北京'
  }
}
</script>

<style lang="less">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f90;
  width: 600px;
}
</style>
