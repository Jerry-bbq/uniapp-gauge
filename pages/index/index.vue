<template>
	<view class="content">
		<Gauge />
	</view>
</template>

<script>
	import Gauge from '@/components/jerry-gauge/index.vue'
	export default {
		components: {
			Gauge
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		height: 70vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
