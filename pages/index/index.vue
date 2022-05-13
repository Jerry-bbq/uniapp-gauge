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
</style>
