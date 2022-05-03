# 仪表盘

## 自定义仪表盘

使用`canvas`自定义仪表盘，通过文件引入类`Gauge`,实例化传参来运行

![image](./static/image.png)

## 功能

- 刻度线显示
- 当前值显示
- 任意起始终止角度
- 即可当做仪表盘，也可以当做环形进度条使用
- 渐变色

没有做太多的扩展性设计，可将组件下载下来自行设置以符合不同业务的需求

## 使用案例

- 提供两个demo供参考

```vue
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
				value: 60,
				unit: '%'
			})
		}
	}
</script>
```