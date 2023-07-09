<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
	<div>
		<el-button type="primary" @click="router.push('/search')">点击跳转/search</el-button>
	</div>
</template>

<style scoped>

</style>
