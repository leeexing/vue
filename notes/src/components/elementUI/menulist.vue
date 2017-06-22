<template>
  <div class="menu-list">
    <ul>
      <li>
        <div class="travel">
          <router-link to="/hello/basic">
            <i class="el-icon-edit"></i>
            <span class="text">基本</span>
          </router-link>
        </div>
      </li>
      <li>
        <div class="travel">
          <router-link to="/hello/input">
            <i class="el-icon-share"></i>
            <span class="text">FORM表单</span>
          </router-link>
        </div>
      </li>
      <li>
        <div class="travel">
          <router-link to="/hello/others">
            <i class="el-icon-delete"></i>
            <span class="text">其他</span>
          </router-link>
        </div>
      </li>
      <li>
        <div class="travel">
          <router-link to="/hello/notice">
            <i class="el-icon-check"></i>
            <span class="text">警告</span>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
//import Icon from 'vue-awesome/components/Icon'

export default {
  
}
</script>
<style lang="less">
a,
a:hover {
  color: #666;
  text-decoration: none;
}

.menu-list li {
  padding: 0 16px;
  list-style: none;
  div {
    display: block;
    padding: 17px 0;
    text-decoration: none;
    text-align: left;
    .text {
      padding-left: 10px;
    }
  }
  a:hover {
    color: #f90;
  }
}

.fa-icon,
.text {
  vertical-align: middle;
}
</style>