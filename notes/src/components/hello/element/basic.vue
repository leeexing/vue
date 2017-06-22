<template>
  <div>
  	<div class="row header">
  		<div class="col-md-4">
  			<el-button @click="visible = true">按钮</el-button>
			<el-dialog v-model="visible" title="Hello world">
				<p>欢迎使用 Element</p>
			</el-dialog>
  			<el-button type="success" @click="findRouter">成功按钮</el-button>
  		</div>
  		<div class="col-md-4">
  			<el-button type="warning" @click="pushHistory">跳到others</el-button>
  			<el-button type="danger" size="small">危险按钮</el-button>
  			<el-button type="info" @click="replaceHistory">直接替换路由</el-button>
  		</div>
  		<div class="col-md-4">
  			<el-button :plain="true" type="danger" @click="go">模拟返回</el-button>
  			<el-button :plain="true" type="info" icon="search">搜索</el-button>
  		</div>
  	</div>
  	
  	<el-row :gutter="20">
  	  <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
  	  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  	</el-row>
  	<el-row :gutter="20">
  	  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  	  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  	  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  	  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  	</el-row>
  	<el-row :gutter="20">
  	  <el-col :span="4">
  	  	<div class="grid-content bg-purple">
  	  		<i class="el-icon-star-off"></i>
  	  	</div>
  	  </el-col>
  	  <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
  	  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  	</el-row>

	

  </div>
</template>
<script>
export default {
  name: 'btn',
  data () {
  	return {
  		visible: false
  	}
  },
  methods: {
    findRouter() {
      console.log(this.$router)
    },
    pushHistory() {
      this.$alert('js方法push路由，跳转到 other页面',{
      confirmButtonText: '确定',
        callback: () => {
          this.$router.push({name:'Others',params:{name:'lixing'}})
        }
      })
    },
    replaceHistory() {
      this.$alert('replace 路由。点击浏览器的返回按钮，直接返回', {
        confirmButtonText: '确定',
        callback: () => {
          this.$router.replace({name:'Others',params:{name:'lixing'}})
        }
      })
    },
    go() {
      this.$router.go(-1);
    }
  },
  watch: {
    '$route'(to, from) {
      console.log(to);
      console.log(from);
    }
  }
}
</script>
<style scoped>
.header {
	margin-bottom: 30px;
	padding: 0 10px;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  i {
  	vertical-align: middle;
  }
</style>