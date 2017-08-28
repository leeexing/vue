<template>
  <div>
    <el-row class="content">
      <el-col :xs="24" :sm="{span: 6, offset: 9}">
        <span class="title">欢迎登录</span>
        <el-row>
          <el-input v-model="account" placeholder="账号" type="text"></el-input>
          <el-input v-model="password" placeholder="密码" type="password"></el-input>
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
        this.$http.post('/admin/login', obj)
          .then(res => {
            console.log(res)
            if (res.data.success) {
              this.$store.state.isLogined = true
              this.$store.commit('SAVE_USERNAME', this.account)
              this.$router.push('/todolist')
            } else {
              this.$message.error(res.data.message)
            }
          })
          .catch(err => {
            console.log(err)
            this.$message.error('请求错误！')
          })
      }
    }
  }
</script>

<style lang="less" scoped>
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