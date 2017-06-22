<template>
  <div class="element">
    <transition enter-active-class="animated fadeInLeft"  leave-active-class="animated fadeOutRight">
      <div v-show="usersidebar" class="sidebar-container">
        <div class="user">
          <i class="el-icon-information"></i>
          <span>{{telephone}}</span>
        </div>
        <h4 class="info">学习使用 vue 中的 element-UI 组件。有点类似 bootstrap吧。可以快速上手</h4>
        <menu-list></menu-list>
        <!-- <other-service></other-service> -->
      </div>
    </transition>
  
    <!-- <common-mask  @click.native="close_usersidebar"></common-mask> -->

  </div>
</template>
<script>
import menuList from './menulist.vue'
export default {
  name: 'index',
  data() {
    return {
      telephone: '123456789',
      usersidebar: true
    }
  },
  components:{
    menuList
  }
}
</script>
<style lang="less">
.element {
  background: rgba(0,0,0,.2);
}

.info {
  padding: 10px;
  text-align: center;
  color: #333;
}

.fa-icon {
  vertical-align: middle;
  margin-right: 10px;
}

.mint-cell:last-child {
  background: none;
}

.sidebar-container {
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 35%;
  height: 100%;
  box-shadow: 4px 0 18px 6px rgba(0, 0, 0, .12);
  background-color: #fff;
  z-index: 999;
  animation-duration: .5s;
}

.sidebar-container .user {
  color: #666;
  text-align: center;
  margin: 30px 0 40px;
  span {
      font-size: 24px;
  }
}
</style>