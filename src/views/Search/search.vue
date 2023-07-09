<script setup lang="ts">
import {ref} from "vue";

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

const search = ref('')

const searchKeyword = () => {
	props.searchParams.keywords = search.value
	props.getServiceListData(props.searchParams)
}
</script>

<template>
	<div class="search_box">
		<el-input size="large" v-model="search" placeholder="请输入资源名称或用户名搜索">
			<template #append>
				<el-button type="primary" @click="searchKeyword">
					<el-icon class="search_icon">
						<Search/>
					</el-icon>
					搜索
				</el-button>
			</template>
		</el-input>
	</div>
</template>

<style lang="scss" scoped>
.search_box {
	width: 540px;
	
	.search_icon {
		margin-right: 8px;
	}
}
</style>