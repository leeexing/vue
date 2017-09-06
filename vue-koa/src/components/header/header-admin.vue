<template>
  <div class="admin-header">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item class="userlogo" index="1"><img src="../../assets/logo.png" alt=""></el-menu-item>
      <el-menu-item class="userlogo" index="2">美丽の女神</el-menu-item>
      <!-- <el-menu-item index="2"><a href="#" target="_blank">不知道今天星期几</a></el-menu-item> -->
      <el-submenu class="logout" index="3">
        <template slot="title">蒙面侠</template>
        <el-menu-item index="3-1"><a href="/login">退出</a></el-menu-item>
        <el-menu-item index="3-2"><a href="/index">我的博客</a></el-menu-item>
        <el-menu-item index="3-3">其他</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      activeIndex: '1',
      activeIndex3: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1') {
        this.$store.dispatch('toggleSidenav')
      }
    }
  }
}
</script>

<style lang="less">
.admin-header {
  .userlogo {
    border: none;
    &:hover {
      border: none;
    }
    img {
      width: 40px;
    }
  }
  .logout {
    float: right;
    margin-right: 30px;
    .el-menu, .el-menu-item {
      min-width: 100%;
    }
    
  }
}
</style>