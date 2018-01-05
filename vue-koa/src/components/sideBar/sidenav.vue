<template>
  <div id="sidenav">
    <!-- <div class="collapse-wrap">
      <el-button class="collapse" type="primary" size="mini" icon="d-arrow-left" @click="isCollapse = !isCollapse"></el-button>
    </div> -->
    <el-row class="tac">
      <el-col :span="24">
        <el-menu theme="dark" :default-active="$route.path" class="el-menu-vertical-demo" :collapse="collapseSideNav" router>
          <el-menu-item index="/myadmin">
            <i class="el-icon-date"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/myadmin/userlist">
            <i class="el-icon-picture"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-message"></i><span slot="title">博客管理</span></template>
            <el-menu-item index="/myadmin/artical">文章列表</el-menu-item>
            <el-menu-item index="/myadmin/category">文章分类</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-star-on"></i><span slot="title">扩展应用</span></template>
            <el-menu-item index="/myadmin/map">地图应用</el-menu-item>
            <el-menu-item index="/myadmin/one">One (一个)</el-menu-item>
            <el-menu-item index="/myadmin/music">Music (网易)</el-menu-item>
            <el-menu-item index="/myadmin/nsts">NSTS (培训)</el-menu-item>
          </el-submenu>
          <el-menu-item index="/myadmin/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
          <el-menu-item index="/myadmin/about">
            <i class="el-icon-setting"></i>
            <span slot="title">关于</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'sidebar',
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapGetters([
      'collapseSideNav'
    ])
  }
}
</script>

<style lang="less">
#sidenav {
  position: relative;
  border-top: 1px solid #f90;
  .tac, .el-col, .el-menu{
    height: 100%;
  }
  .tac a{
    color: #bfcbd9;
    text-decoration: none;
  }
  .collapse {
    position: absolute;
    top: 0;
    left: 10px;
  }
}

</style>

