<template>
  <div id="admin">
    <div class="header">
      <admin-header></admin-header>
    </div>
    <div class="main">
      <v-sidenav></v-sidenav>
      <div class="content scroll-bar">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from '@/components/header/header-admin.vue'
import VSidenav from '@/components/sideBar/sidenav'

export default {
  name: 'admin',
  data () {
    return {}
  },
  components: {
    AdminHeader,
    VSidenav
  }
}
</script>

<style lang="less">
#admin {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .header {
    height: 60px;
  }
  .main {
    flex: auto;
    display: flex;
    #sidenav {
      width: 201px;
      flex-basis: 201px;
    }
    .content {
      flex: auto;
      overflow-y: auto;
    }
  }
}
</style>
