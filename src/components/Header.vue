<script setup lang="ts">

</script>

<template>
	<div class="layout_header">
		<div class="page layout_header_main">
			<div class="left_box">
				<a href="/" class="left_title">
					<img src="../assets/logo.png" alt="">
					<h1>共创云</h1>
				</a>
				<div class="mid_nav">
					<a href="/">服务产品</a>
					<a href="/">科创需求</a>
					<a href="/">专利论文</a>
					<a href="/">交易大数据</a>
				</div>
			</div>
			<div class="right_login_box">
				<div class="login_box">
					<el-button type="primary">登录</el-button>
					<el-button>注册</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.layout_header {
	width: 100%;
	height: 50px;
	background-color: #fff;
	
	.layout_header_main {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		
		.left_box {
			display: flex;
			align-items: center;
			
			.left_title {
				display: flex;
				align-items: center;
				margin-right: 50px;
				
				& > img {
					width: 30px;
					height: 30px;
					object-fit: cover;
					margin-right: 10px;
				}
				
				& > h1 {
					font-size: 16px;
					font-weight: 700;
					line-height: 22px;
					color: #3473e6;
				}
			}
			
			.mid_nav {
				display: flex;
				align-items: center;
				
				& > a {
					font-size: 14px;
					font-weight: 500;
					line-height: 20px;
					color: #606266;
					cursor: pointer;
				}
				
				& > a + a {
					margin-left: 24px;
				}
			}
		}
		
		.right_login_box{
			display: flex;
			align-items: center;
			
			.login_box{
			
			}
		}
	}
}
</style>