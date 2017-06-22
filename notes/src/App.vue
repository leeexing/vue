<template>
  <div id="app">
    <nav class="nav">
      <router-link  to="/note">note</router-link>
      <router-link  to="/element">hello</router-link>
    </nav>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
html,#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .nav {
    display: flex;
    align-items: center;
    height: 60px;
    background: #444;
    a {
      dispaly: inline-block;
      margin-left: 10px;
      padding: 10px 15px;
      border-radius: 5px;
      background: #f90;
      color: #fff;
      text-decoration: none;
      cursor: point;
      &:hover {
        background: #000;
      }
    }
  }
  .content {
    flex: auto;
    display: flex;
    > div {
      flex: auto;
    }
  }
}
body {
  position: relative;
  margin: 0;
  padding: 0;
  border: 0;
  height: 100%;
  max-height: 100%;
}
</style>
