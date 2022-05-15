<template>
	<view class="gauge-container">
		<view class="title">温度类</view>
		<canvas class="canvas" canvas-id="canvas"></canvas>
		<view class="title">进度类</view>
		<canvas class="canvas" canvas-id="canvas2"></canvas>
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
			new Gauge({
				canvasId: 'canvas',
				width: 200,
				min: 16,
				max: 30,
				value: 20.5,
				unit: '℃',
				showTick: true,
				// trackColor: '#000'
			})
			new Gauge({
				canvasId: 'canvas2',
				value: 20,
				lineWidth: 20,
				progressColor: '#3a98fd',
				valueColor: '#000'
			})
		}
	}
</script>

<style>
.gauge-container {
	padding: 20rpx 40rpx;
	text-align: left;
}
.title {
	margin-bottom: 20rpx;
	color: #000;
	font-size: 32rpx;
	font-weight: 500;
}
.canvas {
	width: 200px; 
	height: 200px;
	margin: 40rpx auto;
}
</style>
