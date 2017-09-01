<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> 
    <el-breadcrumb-item v-for="item in breadinfo" :key="item.id">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumb',
  props: ['breadinfo']
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  padding: 20px 10px;
  font-size: 22px;
  border-bottom: 1px solid #ddd;
}
</style>

