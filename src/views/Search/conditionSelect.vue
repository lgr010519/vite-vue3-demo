<script setup lang="ts">
import {dataOriginList, province} from "./constant.ts";
import {onMounted, ref} from "vue";
import {ArrowUp, ArrowDown} from "@element-plus/icons-vue";
import {getLadderlist, getTechnicalList} from "../../api/search.ts";

const props = defineProps({
	searchParams: {
		type: Object,
		default: {},
	},
	getServiceListData: {
		type: Function,
		default: () => {
		},
	}
})

const moreService = ref(false)
const moreSecondService = ref(false)
const moreTechnology = ref(false)
const moreDataOrigin = ref(false)
const moreProvince = ref(false)
const ladderlist = ref([])
const ladderlistChildren = ref([])
const technicalList = ref([])
const ladderId = ref('')
const secondLadderId = ref('')
const technologyId = ref('')
const dataOrigin = ref('')
const selectedProvince = ref('')

const selectService = (item) => {
	ladderId.value = item.id
	ladderlistChildren.value = item.children
	secondLadderId.value = ''
	moreSecondService.value = false
	props.searchParams.serviceTypeId = item.id
	props.getServiceListData(props.searchParams)
}

const cancelSelectService = () => {
	ladderId.value = ''
	secondLadderId.value = ''
	moreSecondService.value = false
	props.searchParams.serviceTypeId = ''
	props.searchParams.serviceTypeId2 = ''
	props.getServiceListData(props.searchParams)
}

const selectSecondService = (item) => {
	secondLadderId.value = item.id
	props.searchParams.serviceTypeId2 = item.id
	props.getServiceListData(props.searchParams)
}

const cancelSelectSecondService = () => {
	secondLadderId.value = ''
	props.searchParams.serviceTypeId2 = ''
	props.getServiceListData(props.searchParams)
}

const selectTechnology = (item) => {
	technologyId.value = item.id
	props.searchParams.technicalId = item.id
	props.getServiceListData(props.searchParams)
}

const cancelSelectTechnology = () => {
	technologyId.value = ''
	props.searchParams.technicalId = ''
	props.getServiceListData(props.searchParams)
}

const selectDataOrigin = (item) => {
	dataOrigin.value = item.dataOrigin
	props.searchParams.dataOrigin = item.dataOrigin
	props.getServiceListData(props.searchParams)
}

const cancelSelectDataOrigin = () => {
	dataOrigin.value = ''
	props.searchParams.dataOrigin = ''
	props.getServiceListData(props.searchParams)
}

const selectProvince = (item) => {
	selectedProvince.value = item
	props.searchParams.province = item
	props.getServiceListData(props.searchParams)
}

const cancelSelectProvince = () => {
	selectedProvince.value = ''
	props.searchParams.province = ''
	props.getServiceListData(props.searchParams)
}

const getLadderlistData = async () => {
	const res: any = await getLadderlist()
	if (res.code === 0) {
		ladderlist.value = res.data
	}
}

const getTechnicalListData = async () => {
	const res: any = await getTechnicalList()
	if (res.code === 0) {
		technicalList.value = res.data.list
	}
}

onMounted(() => {
	getLadderlistData()
	getTechnicalListData()
	// getServiceListData(searchParams)
})
</script>

<template>
	<div class="panel_condition">
		<div class="condition" :style="moreService?'height:auto':'height:40px'">
			<p class="condition_label">
				服务类型：
			</p>
			<div class="condition_list">
				<p :class="`condition_list_item ${ladderId===''?'selected':''}`"
				   @click="cancelSelectService">
					不限
				</p>
				<p :class="`condition_list_item ${ladderId===item.id?'selected':''}`"
				   v-for="item in ladderlist" :key="item.id"
				   @click="selectService(item)">
					{{ item.name }}
				</p>
			</div>
			<div class="condition_switch" @click="moreService=!moreService">
				<p>
					{{ moreService ? '收起' : '更多' }}
				</p>
				<el-icon v-if="moreService">
					<ArrowUp/>
				</el-icon>
				<el-icon v-else>
					<ArrowDown/>
				</el-icon>
			</div>
		</div>
		<div class="divider"></div>
		<div v-if="ladderId" class="condition" :style="moreSecondService?'height:auto':'height:40px'">
			<p class="condition_label">
				二级分类：
			</p>
			<div class="condition_list">
				<p :class="`condition_list_item ${secondLadderId===''?'selected':''}`"
				   @click="cancelSelectSecondService">
					不限
				</p>
				<p :class="`condition_list_item ${secondLadderId===item.id?'selected':''}`"
				   v-for="item in ladderlistChildren" :key="item.id"
				   @click="selectSecondService(item)">
					{{ item.name }}
				</p>
			</div>
			<div class="condition_switch" @click="moreSecondService=!moreSecondService">
				<p>
					{{ moreSecondService ? '收起' : '更多' }}
				</p>
				<el-icon v-if="moreSecondService">
					<ArrowUp/>
				</el-icon>
				<el-icon v-else>
					<ArrowDown/>
				</el-icon>
			</div>
		</div>
		<div class="divider" v-if="ladderId"></div>
		<div class="condition" :style="moreTechnology?'height:auto':'height:40px'">
			<p class="condition_label">
				技术领域：
			</p>
			<div class="condition_list">
				<p :class="`condition_list_item ${technologyId===''?'selected':''}`"
				   @click="cancelSelectTechnology">
					不限
				</p>
				<p :class="`condition_list_item ${technologyId===item.id?'selected':''}`"
				   v-for="item in technicalList" :key="item.id"
				   @click="selectTechnology(item)">
					{{ item.name }}
				</p>
			</div>
			<div class="condition_switch" @click="moreTechnology=!moreTechnology">
				<p>
					{{ moreTechnology ? '收起' : '更多' }}
				</p>
				<el-icon v-if="moreTechnology">
					<ArrowUp/>
				</el-icon>
				<el-icon v-else>
					<ArrowDown/>
				</el-icon>
			</div>
		</div>
		<div class="divider"></div>
		<div class="condition" :style="moreDataOrigin?'height:auto':'height:40px'">
			<p class="condition_label">
				数据来源：
			</p>
			<div class="condition_list">
				<p :class="`condition_list_item ${dataOrigin===''?'selected':''}`"
				   @click="cancelSelectDataOrigin">
					不限
				</p>
				<p :class="`condition_list_item ${dataOrigin===item.dataOrigin?'selected':''}`"
				   v-for="item in dataOriginList" :key="item.dataOrigin"
				   @click="selectDataOrigin(item)">
					{{ item.name }}
				</p>
			</div>
			<div class="condition_switch" @click="moreDataOrigin=!moreDataOrigin">
				<p>
					{{ moreDataOrigin ? '收起' : '更多' }}
				</p>
				<el-icon v-if="moreDataOrigin">
					<ArrowUp/>
				</el-icon>
				<el-icon v-else>
					<ArrowDown/>
				</el-icon>
			</div>
		</div>
		<div class="divider"></div>
		<div class="condition" :style="moreProvince?'height:auto':'height:40px'">
			<p class="condition_label">
				地区：
			</p>
			<div class="condition_list">
				<p :class="`condition_list_item ${selectedProvince===''?'selected':''}`"
				   @click="cancelSelectProvince">
					不限
				</p>
				<p :class="`condition_list_item ${selectedProvince===item?'selected':''}`"
				   v-for="item in province" :key="item"
				   @click="selectProvince(item)">
					{{ item }}
				</p>
			</div>
			<div class="condition_switch" @click="moreProvince=!moreProvince">
				<p>
					{{ moreProvince ? '收起' : '更多' }}
				</p>
				<el-icon v-if="moreProvince">
					<ArrowUp/>
				</el-icon>
				<el-icon v-else>
					<ArrowDown/>
				</el-icon>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
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
</style>