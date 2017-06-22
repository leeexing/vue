<template>
	<div class="notice">
		<div class="row">
			<div class="col-md-6">
				<el-button @click="open">消息</el-button>
				<el-button :plain="true" @click="open2">滴滴</el-button>
				<el-button :plain="true" @click="open3">弹框</el-button>
				<el-button plain @click="open4">通知</el-button>
			</div>
			<div class="col-md-6">
				<p>什么回事</p>
				<p>{{path}}</p>
				<p>{{$router.params}}</p>
				<p>{{$router.name}}</p>
				<p>{{$router.mode}}</p>
			</div>
		</div>
	</div>
	
</template>

<script>
export default {
	name: 'notice',
	data() {
		return {

		}
	},
	mounted() {
		console.log(this.$router)
	},
	computed: {
		path() {
			return this.$router.path || '没有数值的path';
		}
	},
	methods: {
		open() {
			this.$message('Hello World!')
		},
		open2() {
			this.$message({
				type:'success',
				message: '不好意思，我爽约了',
				showClose: true
			})
		},
		open3() {
			this.$alert('不知道怎么解释','非常抱歉',{
				confirmButtonText: '确定',
				callback: action => {
					console.log(action)
				}
			})
		},
		open4() {
			this.$notify({
				type: 'warning',
				title: '警告',
				message: '没有按时去面试，这是不对的'
			})
		}
	}

}	
</script>

<style scoped lang="less">
	.notice {
		padding-top: 10px;
		padding-left: 10px;
		min-height: 400px;
	}
</style>