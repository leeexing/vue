<template>
  <div id="mask" :class="{show: isShowMask}" @click="closeMask">
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'mask',
    computed: {
      ...mapGetters([
        'isShowMask'
      ])
    },
    methods: {
      closeMask () {
        // this.$store.dispatch('close_mask')
      }
    }
  }
</script>

<style lang="less" scoped>
#mask {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9;
  &.show {
    display: block;
  }
}
</style>
