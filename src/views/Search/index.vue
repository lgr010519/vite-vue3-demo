<script setup lang="ts">
import Header from "../../components/Header.vue";
import {reactive, ref} from "vue";
import {getServiceList} from "../../api/search.ts";
import Search from "./search.vue";
import ConditionSelect from "./conditionSelect.vue";
import ServiceData from "./serviceList.vue";

const active = ref(1)
const serviceList = ref([])
const serviceListNum = ref(0)
const pageNum = ref(1)
const pageSize = ref(10)
const searchParams = reactive({
	pageNum,
	pageSize,
	keywords: '',
	serviceTypeId: '',
	serviceTypeId2: '',
	technicalId: '',
	province: '',
	dataOrigin: '',
	logicStatus: 1
})
const loading = ref(false)

const toggleTab = (tab) => {
	active.value = tab
}

const changePageNum = (page) => {
	pageNum.value = page
}

const getServiceListData = async (params) => {
	loading.value = true
	const res: any = await getServiceList(params)
	if (res.code === 0) {
		serviceList.value = res.data.list
		serviceListNum.value = res.data.total
		loading.value = false
	}
}
</script>

<template>
	<div class="search_layout">
		<Header></Header>
		<div class="resource_search">
			<div class="page panel">
				<div class="panel_header">
					<div class="title_box">
						<img src="../../assets/home.png" alt="">
						<p class="header_label">
							资源大厅
						</p>
					</div>
					<search :searchParams="searchParams" :getServiceListData="getServiceListData"></search>
				</div>
				<div class="panel_tabs">
					<div :class="`tabs_item ${active===1?'active':''}`" @click="toggleTab(1)">
						<p :class="`${active===1?'active':''}`">服务</p>
					</div>
					<div :class="`tabs_item ${active===2?'active':''}`" @click="toggleTab(2)">
						<p :class="`${active===2?'active':''}`">需求</p>
					</div>
					<div :class="`tabs_item ${active===3?'active':''}`" @click="toggleTab(3)">
						<p :class="`${active===3?'active':''}`">科创资源</p>
					</div>
				</div>
				<div class="panel_main">
					<condition-select :searchParams="searchParams"
					                  :getServiceListData="getServiceListData"></condition-select>
					<service-data :searchParams="searchParams" :getServiceListData="getServiceListData"
					              :serviceList="serviceList" :serviceListNum="serviceListNum"
					              :changePageNum="changePageNum" :loading="loading"></service-data>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.search_layout {
	width: 100%;
	min-width: 1240px;
	
	.resource_search {
		width: 100%;
		background-color: #f6f7f8;
		padding: 30px 0;
		
		.panel {
			padding: 30px;
			background: #fff;
			box-shadow: 0 0 6px rgba(0, 0, 0, .06);
			border-radius: 4px;
			overflow: auto;
			box-sizing: border-box;
			
			.panel_header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 40px;
				margin-bottom: 20px;
				
				.title_box {
					display: flex;
					height: 22px;
					align-items: center;
					
					& > img {
						margin-right: 16px;
					}
					
					& > p {
						font-size: 16px;
						font-weight: 700;
						line-height: 22px;
						color: #303133;
					}
				}
			}
			
			.panel_tabs {
				display: flex;
				align-items: center;
				width: 100%;
				height: 48px;
				padding: 0 30px;
				margin-bottom: 10px;
				background: #f7f8f9;
				border-radius: 4px;
				box-sizing: border-box;
				
				.tabs_item {
					box-sizing: border-box;
					position: relative;
					cursor: pointer;
					line-height: 20px;
					padding: 14px 6px;
					color: #303133;
					
					& > p {
						font-size: 14px;
						font-weight: 700;
						
						&.active,
						&:after {
							color: #3473e6;
						}
					}
					
					&:not(:last-child) {
						margin-right: 120px;
					}
					
					&:after {
						content: "";
						position: absolute;
						left: 50%;
						bottom: 22px;
						transform: translateX(-50%);
						width: 0;
						height: 2px;
						background-color: #3473e6;
						border-radius: 2px;
						transition: all .3s ease;
					}
				}
				
				.tabs_item.active:after,
				.tabs_item:hover:after {
					width: 100%;
					color: #3473e6;
				}
			}
			
			.panel_main {
				min-height: 100px;
				
				.panel_condition {
					box-sizing: border-box;
					width: 100%;
					padding: 0 20px;
					margin-bottom: 30px;
					background: #fff;
					border: 1px solid #dcdfe6;
					border-radius: 4px;
					
					.condition {
						display: flex;
						overflow: hidden;
						margin-bottom: 10px;
						box-sizing: border-box;
						
						.condition_label {
							width: 110px;
							line-height: 30px;
							padding-left: 10px;
							margin-top: 10px;
							color: #909399;
							font-size: 14px;
						}
						
						.condition_list {
							flex: 1;
							display: flex;
							align-items: center;
							flex-wrap: wrap;
							margin-right: 74px;
							
							.condition_list_item {
								cursor: pointer;
								line-height: 20px;
								padding: 5px 10px;
								margin-right: 10px;
								margin-top: 10px;
								margin-bottom: 0;
								border-radius: 2px;
								color: #303133;
								font-size: 14px;
								
								&:hover {
									color: #fff;
									background-color: #3473e6;
								}
							}
							
							.selected {
								color: #fff;
								background-color: #3473e6;
							}
						}
						
						.condition_switch {
							display: flex;
							justify-content: space-around;
							align-items: center;
							cursor: pointer;
							width: 48px;
							height: 30px;
							margin-top: 10px;
							color: #3473e6;
							font-size: 14px;
						}
					}
					
					.divider {
						width: 100%;
						height: 1px;
						border-top: 1px dashed #dcdfe6;
					}
				}
			}
		}
	}
}

:deep(.el-input-group__append) {
	background-color: #3473e6;
	color: #fff;
	width: 50px;
}
</style>