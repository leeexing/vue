<template>
<div class="components-layout-demo-basic"> 
  <v-layout>
      <v-header class="ant-layout-header">
        <img
        src="http://cdn2.jianshu.io/assets/web/nav-logo-4c7bbafe27adc892f3046e6978459bac.png" alt="简书">
      </v-header>
      <v-layout>
          <v-sider style="background: #f90;">
              hehehehehehe
          </v-sider>
          <v-layout style="padding:0 24px 24px">
              <v-breadcrumb style="margin:12px 0">
                  <v-breadcrumb-item>Home</v-breadcrumb-item>
                  <v-breadcrumb-item href="">List</v-breadcrumb-item>
                  <v-breadcrumb-item href="">App</v-breadcrumb-item>
              </v-breadcrumb>
              <v-content style="background: #fff; padding: 24px; margin: 0; min-height: 280px">Content</v-content>
          </v-layout>
      </v-layout>
  </v-layout>
</div>
</template>

<style scoped>
#components-layout-demo-top-side .logo {
  width: 120px;
  height: 31px;
  background: #333;
  border-radius: 6px;
  margin: 16px 28px 16px 0;
  float: left;
}
.components-layout-demo-basic {
  text-align: center;
  margin: 2rem;
}
.components-layout-demo-basic .ant-layout-header,
.components-layout-demo-basic .ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
.components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5; 
}
.components-layout-demo-basic .ant-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
}
.components-layout-demo-basic .ant-layout-content {
  background: rgba(16, 142, 233, 1);
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}
</style>
<script>
  
</script>