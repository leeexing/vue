<template lang="html">
  <transition name="slide-top">
    <div class="login">
      <div class="title">
        <i @click="ShowAbout" class="about"></i>
        <a href="/" class="website"></a>
      </div>
      <div class="content">
        <i class="icon-chat"></i>
        <h2>请输入您的名字</h2>
        <input @keyup.enter="login" v-model.trim="name" type="text" autofocus>
      </div>
      <transition name="showAbout">
        <About v-if="showAbout" v-on:aboutShow="isAboutShow"></About>
      </transition>
    </div>
  </transition>
</template>

<script>
import About from '../About/About'
export default {
  name: 'login',
  components: {
    About
  },
  data () {
    return {
      showAbout: false,
      name: ''
    }
  },
  methods: {
    login () {
      if (this.name === '') {
        return
      }
      localStorage.name = this.name
      this.name = ''
      this.$router.push('ai')
    },
    ShowAbout () {
      this.showAbout = !this.showAbout
    },
    isAboutShow (value) {
      this.showAbout = value
    }
  },
  computed: {
    hello () {
      return this.showAbout
    }
  }
}
</script>

<style lang="less">
  .login {
    position:relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #000;
    color: #fff;
    i,a {
      width: 40px;
      height: 40px;
      display: inline-block;
      cursor: pointer;
    }
    .title {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      flex-direction: row-reverse;
      padding: 20px 30px;
      i.about {
        order: 2;
        width: 40px;
        height: 40px;
        background: url('../../assets/icons/icon-about.svg') no-repeat;
        background-size: contain;
      }
      .website {
        margin-left: 20px;
        background: url('../../assets/icons/icon-website.svg') no-repeat;
        background-size: contain;
      }
    }
    
    .content {
      i.icon-chat {
        width: 60px;
        height: 60px;
        margin-bottom: 30px;
        background: url('../../assets/icons/icon-chat.svg') no-repeat;
        background-size: contain;
      }
      h2 {
        text-align: center;
        letter-space: 1px;
      }
      input {
        width: 50%;
        margin-top: 10px;
        padding: 5px 10px;
        font-size: 2rem;
        background-color:#000;
        border: none;
        border-bottom: 1px solid #fff;
        text-align: center;
        color: #fff;
      }
    }
    
  }
</style>