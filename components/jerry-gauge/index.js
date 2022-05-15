class Gauge {
	constructor({
		canvasId,
		startAngle = 3 / 4 * Math.PI, // 135
		endAngle = 1 / 4 * Math.PI, // 45
		width = 200,
		min = 0,
		max = 100,
		value = 0,
		unit = '%',
		showTick = false,
		valueColor = '#555',
		progressColor = '#f58220',
		trackColor = '#F1F1F1',
		lineWidth = 10
	}) {
		this.ctx = uni.createCanvasContext(canvasId)
		this.startAngle = startAngle
		this.endAngle = endAngle
		this.width = width
		this.min = min
		this.max = max
		this.value = value
		this.unit = unit
		this.showTick = showTick
		this.valueColor = valueColor
		this.progressColor = progressColor
		this.trackColor = trackColor
		// track width
		this.lineWidth = lineWidth

		this.radius = this.width / 2
		this.process = min || -1
		this.tickLength = this.max - this.min
		// track radius
		this.trackRadius = this.radius - this.lineWidth / 2
		// one tick rad
		this.tickRad = (2 * Math.PI - this.startAngle + this.endAngle) / this.tickLength
		this.start()
	}
	draw() {
		// 将坐标中心点移动到圆心位置
		this.ctx.translate(this.radius, this.radius)

		this.drawTrack()
		this.drawValueText()
		this.drawProgress()
		if (this.showTick) {
			this.drawTick()
			this.drawTickText()
		}
		this.ctx.draw()
	}
	// 轨迹圆环
	drawTrack() {
		this.ctx.save()
		this.ctx.lineWidth = this.lineWidth
		// this.ctx.lineCap = 'round'
		this.ctx.strokeStyle = this.trackColor
		this.ctx.arc(0, 0, this.trackRadius, this.startAngle, this.endAngle)
		this.ctx.stroke()
		this.ctx.restore()
	}
	// 当前值显示
	drawValueText() {
		this.ctx.save()
		this.ctx.fillStyle = this.valueColor
		this.ctx.font = "34px serif"
		this.ctx.textAlign = 'center'
		this.ctx.textBaseline = 'middle'
		this.ctx.fillText(`${this.value}${this.unit}`, 0, 0)
		this.ctx.restore()
	}
	// 进度圆环
	drawProgress() {
		this.ctx.save()
		const valueRad = this.getValueRad()
		this.ctx.beginPath()
		this.ctx.lineWidth = this.lineWidth
		this.ctx.strokeStyle = this.progressColor
		// this.ctx.lineCap = 'round' // 会导致进度条加长
		this.ctx.lineJoin = 'round'
		// 终点角度是动态的
		this.ctx.arc(0, 0, this.trackRadius, this.startAngle, valueRad)
		this.ctx.stroke()
		this.ctx.restore()
	}
	// 刻度线
	drawTick() {
		// 不可是使用旋转，否则文字也会旋转
		let deg = this.startAngle
		for (let i = this.min; i <= this.max; i++) {
			this.ctx.save()
			this.ctx.lineWidth = 1
			this.ctx.strokeStyle = '#999'
			this.ctx.beginPath()
			// 刻度起点
			let x0 = (this.radius - this.lineWidth - 2) * Math.cos(deg)
			let y0 = (this.radius - this.lineWidth - 2) * Math.sin(deg)
			// 刻度终点
			var x1 = (this.radius - this.lineWidth - 8) * Math.cos(deg)
			var y1 = (this.radius - this.lineWidth - 8) * Math.sin(deg)
			this.ctx.moveTo(x0, y0)
			this.ctx.lineTo(x1, y1)
			deg += this.tickRad
			this.ctx.stroke()
			this.ctx.restore()
		}

	}
	// 刻度值
	drawTickText() {
		let deg = this.startAngle
		for (let i = this.min; i <= this.max; i++) {
			let x = (this.radius - this.lineWidth - 20) * Math.cos(deg)
			let y = (this.radius - this.lineWidth - 20) * Math.sin(deg)
			deg += this.tickRad
			this.ctx.save()
			this.ctx.font = '12px serif'
			this.ctx.fillStyle = '#999'
			this.ctx.textAlign = 'center'
			// 不设置会与tick错位
			this.ctx.textBaseline = 'middle'
			this.ctx.fillText(i, x, y)
			this.ctx.restore()
		}

	}
	// 当前值的弧度
	getValueRad() {
		// 超出
		if (this.value > this.max) {
			return (this.max - this.min) * this.tickRad + this.startAngle
		}
		return (this.process - this.min) * this.tickRad + this.startAngle
	}
	start() {
		let update = () => {
			this.process = this.process + (this.max - this.min) / 100
			if (this.process > this.value) {
				cancelAnimationFrame(update)
			} else {
				this.draw()
				requestAnimationFrame(update)
			}
		}
		requestAnimationFrame(update)
	}
	// 渐变
	// getGradient(colorList) {
	// 	// 创建渐变对象
	// 	let grd = this.ctx.createLinearGradient(0, 0, this.trackRadius, 0)
	// 	Object.keys(colorList).forEach(color => {
	// 		grd.addColorStop(color, colorList[color])
	// 	})
	// 	return grd
	// }
}


// https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
(function () {
	var lastTime = 0;
	var vendors = ['webkit', 'moz'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame =
			window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function (callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () { callback(currTime + timeToCall); },
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
}());


export default Gauge
