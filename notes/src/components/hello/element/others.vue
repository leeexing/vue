<template>
	<div class="others">
		<div class="row">
			<div class="col-md-6">
				<el-tooltip content="HR sorry" placement="top">
					<el-button>DIDI</el-button>
				</el-tooltip>
				<el-tooltip content="HR sorry" placement="right">
					<el-button>DIDI</el-button>
				</el-tooltip>
			</div>
		</div>
		<div class="divider"></div>
		<div class="row">
			<div class="col-md-6">
				<div class="block">
				  <span class="demonstration">默认 Hover 指示器触发</span>
				  <el-carousel height="150px">
				    <el-carousel-item v-for="item in 4" :key="item">
				      <h3>{{ item }}</h3>
				    </el-carousel-item>
				  </el-carousel>
				</div>
			</div>
			<div class="col-md-6">
			  <el-carousel :interval="4000" type="card" height="200px">
			    <el-carousel-item v-for="item in 6" :key="item">
			      <h3>{{ item }}</h3>
			    </el-carousel-item>
			  </el-carousel>
			</div>
		</div>
	</div>
	
</template>

<script>
export default {
	name: 'others',
	data() {
		return {

		}
	},
	methods: {
		
	},
	watch: {
		'$route'(to, from) {
		  console.log(to);
		  console.log(from);
		}
	}

}	
</script>

<style scoped lang="less">
	.others {
		padding-top: 10px;
		padding-left: 10px;
		min-height: 400px;
	}

  .el-carousel__item h3 {
    margin: 0;
    opacity: 0.75;
    text-align: center;
    color: #475669;
    font-size: 14px;
    line-height: 150px;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

  .divider {
  	height: 1px;
  	background: #aaa;
  	margin: 10px 0;
  }
</style>