<template>
  <div class="content">
    <header-vue></header-vue>
    <div class="topic-wrap">
      <el-row>
        <el-col :span="7">
          <div class="userinfo">
            <img class="user-logo" src="../assets/logo1.png" alt="作者">
            <p class="username">{{username}}</p>
            <p class="hobby">{{hobbies}}</p>
            <p class="github">
              <a href="https://github.com/leeexing">
              <i class="iconfont icon-github" title="leeing's github"></i>
              </a>
            </p>
            <ul>
              <li class="category" v-for="item in categories" :key="item.id">
                {{item}}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16" :offset="1">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
    <footer>
      <p>Copyright © | LEEING 2017</p>
      <p>Created by <span class="author">vue-koa-blog</span></p>
    </footer>
  </div>
</template>

<script>
  import HeaderVue from '@/components/header/header.vue'
  import TopicVue from '@/components/topic/topicList.vue'
  import Mock from 'mockjs'
  export default {
    name: 'index',
    data () {
      return {
        username: 'lee',
        hobbies: 'love song, love bike',
        categories: ['Vue', 'Koa', 'Mongodb', 'Webpack', 'js设计模式', '七夕情人节']
      }
    },
    created () {
      console.log('随机产生一个地名 - ' + Mock.mock('@county'))
    },
    mounted () {
      let username = JSON.parse(sessionStorage.getItem('vue-koa-token')).name
      if (username) {
        this.username = username
      }
    },
    components: {
      HeaderVue,
      TopicVue
    }
  }
</script>

<style lang="less">
.content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 80px auto 0;
  .topic-wrap {
    margin-bottom: 30px;
  }
}
.userinfo {
  margin-top: 20px;
  text-align: center;
  p {
    padding-top: 10px;
  }
  .user-logo {
    width: 200px;
    border-radius: 50%;
  }
  .username {
    font-size: 24px;
    color: #666;
  }
  .github {
    i {
      color: #aaa;
      font-size: 24px;
    }
  }
  .hobby {
    font-size: 18px;
    color: #999;
  }
  ul {
    margin-top: 20px;
  }
  .category {
    display: inline-block;
    margin: 5px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 18px;
    color: #aaa;
    cursor: pointer;
    &:hover {
      border-color: #f90;
      color: #f90;
      transition: all ease 0.3s;
    }
  }
}
footer {
  flex-basis: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    padding: 5px 0;
    color: #aaa;
    font-size: 18px;
  }
  p:nth-child(2) {
    font-size: 16px;
    span {
      color: #666;
    }
  }
}
</style>
