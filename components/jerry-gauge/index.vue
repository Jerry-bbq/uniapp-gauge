<template>
	<view class="gauge-container">
		<view class="title">温度仪表盘</view>
		<canvas class="canvas" canvas-id="canvas"></canvas>
		<view class="title">进度条</view>
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
			var ctx = uni.createCanvasContext('canvas')
			new Gauge(ctx, {
				width: 200,
				min: 16,
				max: 30,
				value: 20.5,
				unit: '℃',
				showTick: true,
				// trackColor: '#000'
			})

			var ctx2 = uni.createCanvasContext('canvas2')
			new Gauge(ctx2, {
				value: 66.5,
				progressColor: '#3a98fd',
				valueColor: '#f58220'
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
