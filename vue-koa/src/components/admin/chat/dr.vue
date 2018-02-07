<template>
  <div class="m-dr">
    <h1 class="title">DR实验室</h1>
    <hr>
    <div class="btn-group">
      <el-button type="success" round @click="showImg">DR显示</el-button>
    </div>
    <full-screen :isShow="isShow" :src="src" v-on:changeIsShow="toggleIsShow" ref="nstswrap"/>
    <!-- <div ref="nsts">
      <transition name="nstsimg">
        <div v-if="layerShow" id="nsts">
          <el-button @click="showImg" class="exit" type="danger" size="mini" icon="el-icon-close" round title="退出"></el-button>
          <iframe class="nsts-wrapper" :src="src" frameborder="0" id="myframe"></iframe>
        </div>
      </transition>
    </div> -->
  </div>
</template>
<script>
import FullScreen from '@/components/FullScreen.vue'
export default {
  data () {
    return {
      isShow: false,
      src: ''
    }
  },
  methods: {
    showImg () {
      this.isShow = !this.isShow
      this.src = '/static/dr/index.html?business=INSERT_TIP&paperID=2&activeID=3'
      this.$refs.nstswrap.fullScreen()
    },
    toggleIsShow (val) {
      this.isShow = val
      this.src = null
    }
  },
  components: {
    FullScreen
  }
}
</script>

<style lang="less" scoped>
  .m-dr {
    .title {
      padding: 20px;
      color: #fa541c;
      letter-spacing: 2px;
    }
    .btn-group {
      padding: 10px;
      background: url(../../../assets/logo.png)
    }
  }
  #nsts {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f5f5f5;
    .exit {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .nsts-wrapper {
      width: 100%;
      height: 100%;;
    }
  }
  .nstsimg-enter-active, .nstsimg-leave-active{
    transition: all 1s ease;
  }
  .nstsimg-enter {
    opacity: 0;
    transform: scale(.3);
  }
  .nstsimg-leave-to {
    opacity: 0;
    transform: translate3d(50%);
  }
</style>
