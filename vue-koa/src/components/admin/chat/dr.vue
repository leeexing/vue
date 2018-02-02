<template>
  <div class="m-dr">
    <h1 class="title">DR实验室</h1>
    <hr>
    <div class="btn-group" ref="nsts">
      <el-button type="success" round @click="showImg">DR显示</el-button>
    </div>
    <div ref="nsts">
      <transition name="nstsimg">
        <div v-if="layerShow" id="nsts">
          <el-button @click="showImg" class="exit" type="danger" size="mini" icon="el-icon-close" round title="退出"></el-button>
          <iframe class="nsts-wrapper" :src="src" frameborder="0"></iframe>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      layerShow: false,
      src: ''
    }
  },
  mounted () {
    let that = this
    this.docNsts = this.$refs.nsts
    this.fullScreenType = (function () {
      if (that.docNsts.requestFullscreen) {
        return ['requestFullscreen', 'exitFullscreen']
      } else if (that.docNsts.msRequestFullscreen) {
        return ['msRequestFullscreen', 'msExitFullscreen']
      } else if (that.docNsts.mozRequestFullScreen) {
        return ['mozRequestFullScreen', 'mozCancelFullScreen']
      } else if (that.docNsts.webkitRequestFullScreen) {
        return ['webkitRequestFullScreen', 'webkitCancelFullScreen']
      }
    })()
    console.log(this.fullScreenType)
  },
  methods: {
    showImg () {
      this.layerShow = !this.layerShow
      if (this.layerShow) {
        this.src = '/static/dr/index.html'
        let docNsts = this.$refs.nsts
        docNsts[this.fullScreenType[0]]()
      } else {
        document[this.fullScreenType[1]]()
      }
    }
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
