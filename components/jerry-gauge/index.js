class Gauge {
	constructor(ctx, opt) {
		this.ctx = ctx
		this.width = opt.width || 200
		this.min = opt.min || 0
		this.max = opt.max || 100
		this.value = opt.value || 0
		this.unit = opt.unit || '%'
		this.showTick = opt.showTick || false
		this.valueColor = opt.valueColor || '#555'
		this.progressColor = opt.progressColor || '#f58220'
		this.trackColor = opt.trackColor || '#F1F1F1'

		this.radius = this.width / 2
		this.process = opt.min || -1
		this.tickLength = this.max - this.min
		// 轨道宽度
		this.trackLineWidth = 10
		// 轨道半径
		this.trackRadius = this.radius - this.trackLineWidth / 2
		// 起始终止角度
		this.deg = {
			start: 135,
			end: 45
		}
		// 每个刻度的弧度,默认开口弧度为90度，360 - 90 = 270
		this.tickRad = this.degToRad(360 - this.deg.start + this.deg.end) / this.tickLength
		this.start()
	}
	start() {
		let update = () => {
			this.process++
			if (this.process > this.value) {
				window.cancelAnimationFrame(update)
			} else {
				this.draw()
				window.requestAnimationFrame(update)
			}
		}
		window.requestAnimationFrame(update)
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
		this.ctx.lineWidth = this.trackLineWidth
		// this.ctx.lineCap = 'round'
		this.ctx.strokeStyle = this.trackColor
		this.ctx.arc(0, 0, this.trackRadius, this.degToRad(this.deg.start), this.degToRad(this.deg.end))
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
		this.ctx.lineWidth = this.trackLineWidth
		this.ctx.strokeStyle = this.progressColor
		// this.ctx.lineCap = 'round' // 会导致进度条加长
		// 终点角度是动态的
		this.ctx.arc(0, 0, this.trackRadius, this.degToRad(this.deg.start), valueRad)
		this.ctx.stroke()
		this.ctx.restore()
	}
	// 刻度线
	drawTick() {
		// 不可是使用旋转，否则文字也会旋转
		let deg = this.degToRad(this.deg.start)
		for (let i = this.min; i <= this.max; i++) {
			this.ctx.save()
			this.ctx.lineWidth = 1
			this.ctx.strokeStyle = '#999'
			this.ctx.beginPath()
			// 刻度起点
			let x0 = (this.radius - this.trackLineWidth - 2) * Math.cos(deg)
			let y0 = (this.radius - this.trackLineWidth - 2) * Math.sin(deg)
			// 刻度终点
			var x1 = (this.radius - this.trackLineWidth - 8) * Math.cos(deg)
			var y1 = (this.radius - this.trackLineWidth - 8) * Math.sin(deg)
			this.ctx.moveTo(x0, y0)
			this.ctx.lineTo(x1, y1)
			deg += this.tickRad
			this.ctx.stroke()
			this.ctx.restore()
		}

	}
	// 刻度值
	drawTickText() {
		let deg = this.degToRad(this.deg.start)
		for (let i = this.min; i <= this.max; i++) {
			let x = (this.radius - this.trackLineWidth - 20) * Math.cos(deg)
			let y = (this.radius - this.trackLineWidth - 20) * Math.sin(deg)
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
	// 角度转化为弧度
	degToRad(deg) {
		return deg * Math.PI / 180
	}
	// 当前值的弧度
	getValueRad() {
		// 超出
		if (this.value > this.max) {
			return (this.max - this.min) * this.tickRad + this.degToRad(this.deg.start)
		}
		return (this.process - this.min) * this.tickRad + this.degToRad(this.deg.start)
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

export default Gauge
