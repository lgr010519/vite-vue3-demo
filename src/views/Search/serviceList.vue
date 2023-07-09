<script setup lang="ts">
import defaultAvatarImg from "../../assets/avatar.png";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import {onMounted, ref} from "vue";

const props = defineProps({
	searchParams: {
		type: Object,
		default: {},
	},
	getServiceListData: {
		type: Function,
		default: () => {
		},
	},
	serviceList: {
		type: Array,
		default: [],
	},
	serviceListNum: {
		type: Number,
		default: 0,
	},
	pageNum: {
		type: Number,
		default: 1,
	},
	changePageNum: {
		type: Function,
		default: () => {
		},
	},
	loading: {
		type: Boolean,
		default: false,
	},
})

const pageNumber = ref(1)

const pageChange = (page: Number) => {
	props.changePageNum(page)
	pageNumber.value = page
	props.getServiceListData(props.searchParams)
}

onMounted(() => {
	props.getServiceListData(props.searchParams)
})
</script>

<template>
	<div class="result">
		<div class="result_header">
			<div class="result_header_item" style="flex:420px">
				服务名称
			</div>
			<div class="result_header_item" style="flex:440px;padding-left:80px">
				发布用户
			</div>
			<div class="result_header_item" style="flex:300px">
				服务类型
			</div>
			<div class="result_header_item" style="flex:200px">
				成功成交数
			</div>
			<div class="result_header_item" style="flex:180px">
				信用评价
			</div>
		</div>
		<div class="result_body" v-loading="props.loading">
			<div class="result_body_item item" v-for="item in serviceList" :key="item.id">
				<div class="item_col" style="flex: 1 1 420px;">
					<p class="col_text">
						{{ item.title }}
					</p>
				</div>
				<div class="item_col" style="flex: 1 1 500px;">
					<img :src="item.avatarUrl||defaultAvatarImg" alt="">
					<p class="col_text">
						{{ item.orgName }}
					</p>
				</div>
				<div class="item_col" style="flex: 1 1 300px;">
					<p class="col_text_2">
						{{ item.serviceTypeName }}
					</p>
				</div>
				<div class="item_col" style="flex: 1 1 200px;">
					<p data-v-2bf59731="" class="col_text_3">
						{{ item.totalDeal }}
					</p>
				</div>
				<div class="item_col" style="flex: 1 1 180px;">
					<p class="col_text_4">
						{{ item.avgScore }}
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="pagination">
		<el-config-provider :locale="zhCn">
			<el-pagination background layout="prev, pager, next, jumper" :total="serviceListNum"
			               :current-page="pageNumber"
			               @current-change="pageChange"
			               hide-on-single-page/>
		</el-config-provider>
	</div>
</template>

<style scoped lang="scss">
.result {
	box-sizing: border-box;
	padding: 10px 0;
	
	.result_header {
		box-sizing: border-box;
		width: 100%;
		height: 48px;
		padding: 0 20px;
		background: #f7f8f9;
		border-radius: 4px;
		display: flex;
		align-items: center;
		font-size: 14px;
		font-weight: 700;
		
		.result_header_item {
			color: #909399;
			height: 100%;
			padding: 0 20px;
			display: flex;
			align-items: center;
		}
	}
	
	.result_body {
		margin-top: 10px;
		
		.result_body_item {
			cursor: pointer;
			position: relative;
			width: 100%;
			height: 80px;
			background: #fff;
			border-radius: 4px;
			
			&:after {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				border-radius: 4px;
				border: 1px solid #dcdfe6;
				pointer-events: none;
			}
			
			&:hover:after {
				border: 1px solid #3473e6;
				box-shadow: 3px 3px 5px #eee, -3px -3px 5px #eee;
			}
			
			&:hover .item_col .col_text {
				color: #3473e6;
			}
			
			.item_col {
				height: 100%;
				align-items: center;
				padding: 0 20px;
				display: flex;
				
				& > img {
					width: 40px;
					height: 40px;
					margin-right: 20px;
				}
				
				.col_text {
					font-size: 16px;
					font-weight: 700;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
				
				.col_text_2 {
					font-size: 14px;
					color: #606266;
				}
				
				.col_text_3 {
					color: #f1b221;
					font-size: 16px;
					font-weight: 700;
				}
				
				.col_text_4 {
					color: #3473e6;
					font-size: 16px;
					font-weight: 700;
				}
			}
		}
		
		.item {
			box-sizing: border-box;
			padding: 0 20px;
			display: flex;
			margin-bottom: 10px;
		}
	}
}

.pagination {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px 0;
}
</style>