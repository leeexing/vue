<template>
  <div id="one-music">

  </div>
</template>

<script>
import oneServer from '../../../util/server'
import BreadCrumb from '@/components/admin/breadcrumb'
export default {
  name: 'music',
  data () {
    return {
      breadinfo: [{name: '扩展应用'}, {name: '一个', path: '/myadmin/one'}, {name: 'Music'}]
    }
  },
  created () {
    async function getMusicData (ctx) {
      let data = await oneServer.getQQMusic(ctx)
      console.log(data)
    }
    getMusicData(this)
  },
  components: {
    BreadCrumb
  }
}
</script>

<style lang="less" scoped>

</style>

