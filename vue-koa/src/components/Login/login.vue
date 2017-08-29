<template>
  <div class="login">
    <img class="logo" src="../../assets/logo1.png">
    <el-row class="content">
      <el-col :xs="24" :sm="{span: 6, offset: 9}">
        <span class="title">欢迎登录</span>
        <el-row>
          <el-input v-model="account" placeholder="账号" type="text"></el-input>
          <el-input @keyup.enter.native="loginToDo" v-model="password" placeholder="密码" type="password"></el-input>
          <el-button type="primary" @click="loginToDo">登录</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        account: '',
        password: ''
      }
    },
    methods: {
      loginToDo () {
        let obj = {
          username: this.account,
          password: this.password
        }
        if (this.account === '' || this.password === '') {
          this.$message.error('用户名或密码不能为空！')
          return
        }
        this.$http.post('/user/login', obj)
          .then(res => {
            console.log(res)
            if (res.data.success) {
              this.$store.state.isLogined = true
              sessionStorage.setItem('vue-koa-token', JSON.stringify(res.data.token)) // 用sessionstorage 把 token 存下来
              this.$store.commit('SAVE_USERNAME', this.account)
              this.$router.push('/index')
            } else {
              this.$message.error(res.data.message)
              sessionStorage.setItem('vue-koa-token', null) // 将token清空
            }
          })
          .catch(err => {
            console.log(err)
            this.$message.error('请求错误！')
            sessionStorage.setItem('vue-koa-token', null) // 将token清空
          })
      }
    }
  }
</script>

<style lang="less" scoped>
.login {
  padding-top: 80px;
  text-align: center;
  .logo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
}
.content {
  padding: 16px;
  .title {
    font-size: 28px;
  }
  .el-input {
    margin: 12px 0;
  }
  button {
    width: 100%;
    margin-top: 12px;
  }
}
</style>