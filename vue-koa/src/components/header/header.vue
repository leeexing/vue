<template>
  <div class="header">
    <h3>{{blogName}}</h3>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        blogName: "LEEING's Blog"
      }
    }
  }
</script>

<style lang="less">
  .header {
    position: fixed;
    top:0;
    left: 0;
    display: flex;
    align-items: center;
    height: 80px;
    width: 100%;
    padding: 0 30px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    z-index: 9;
    h3 {
      color: #f90;
      font-size: 24px;
      font-weight: 600;
    }
  }
</style>