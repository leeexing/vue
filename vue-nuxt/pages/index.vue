<template>
  <!-- <logo/> -->
  <div class="components-layout-demo-basic"> 
    <v-layout>
        <v-header>Header</v-header>
        <v-layout>
            <v-sider>Sider</v-sider>
            <v-content>Content</v-content>
        </v-layout>
        <v-footer>Footer</v-footer>
    </v-layout>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style scoped>
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
