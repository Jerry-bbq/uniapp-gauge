<template>
	<view class="gauge-container">
		<canvas style="width: 200px; height: 200px;" canvas-id="canvas" id="canvas"></canvas>

		<canvas style="width: 200px; height: 200px;" canvas-id="canvas2" id="canvas2"></canvas>
	</view>
</template>

<script>
	import Gauge from './index.js'
	export default {
		name: "gauge",
		data() {
			return {

			};
		},
		mounted() {
			var ctx = uni.createCanvasContext('canvas')
			new Gauge(ctx, {
				width: 200,
				min: 16,
				max: 30,
				value: 20.5,
				unit: '℃',
				showTick: true
			})

			var ctx2 = uni.createCanvasContext('canvas2')
			new Gauge(ctx2, {
				width: 200,
				min: 0,
				max: 100,
				value: 100,
				unit: '%'
			})
		}
	}
</script>

<style>

</style>
