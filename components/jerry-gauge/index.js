class Gauge {
	constructor(ctx, opt) {
		this.ctx = ctx
		this.width = opt.width
		this.min = opt.min
		this.max = opt.max
		this.curValue = opt.value
		this.unit = opt.unit || ''
		this.showTick = opt.showTick || false
		this.valueStyle = '#FFAB91'
		this.progressStyle = '#FD7347'

		this.tickLength = this.max - this.min
		this.radius = this.width / 2

		// 轨道宽度
		this.trackLineWidth = 10
		// 半径
		this.trackRadius = this.radius - this.trackLineWidth / 2
		// 起始终止角度
		this.deg = {
			start: 135,
			end: 45
		}

		// 每个刻度的弧度,默认开口弧度为90度，360 - 90 = 270
		this.tickRad = this.degToRad(360 - this.deg.start + this.deg.end) / this.tickLength

		this.draw()
	}
	draw() {
		// 将坐标中心点移动到圆心位置
		this.ctx.translate(this.radius, this.radius)

		this.drawTrack()
		this.drawCurValue()
		this.drawProgress()
		if (this.showTick) {
			this.drawTick()
			this.drawTickText()
		}
		this.ctx.draw()
	}
	// 轨迹圆环
	drawTrack() {
		this.ctx.lineWidth = this.trackLineWidth
		this.ctx.strokeStyle = '#ddd'
		this.ctx.arc(0, 0, this.trackRadius, this.degToRad(this.deg.start), this.degToRad(this.deg.end))
		this.ctx.stroke()
	}
	// 当前值显示
	drawCurValue() {
		this.ctx.fillStyle = this.valueStyle
		this.ctx.font = "34px serif"
		this.ctx.textAlign = 'center'
		this.ctx.textBaseline = 'middle'
		this.ctx.fillText(`${this.curValue}${this.unit}`, 0, 0)
	}
	// 进度圆环
	drawProgress() {
		const curValueRad = this.getCurValueRad()
		this.ctx.beginPath()
		this.ctx.lineWidth = this.trackLineWidth
		this.ctx.strokeStyle = this.progressStyle
		// 终点角度是动态的
		this.ctx.arc(0, 0, this.trackRadius, this.degToRad(this.deg.start), curValueRad)
		this.ctx.stroke()
	}
	// 刻度线
	drawTick() {
		// 不可是使用旋转，否则文字也会旋转
		let deg = this.degToRad(this.deg.start)
		for (let i = this.min; i <= this.max; i++) {
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
		}

	}
	// 刻度值
	drawTickText() {
		let deg = this.degToRad(this.deg.start)
		for (let i = this.min; i <= this.max; i++) {
			let x = (this.radius - this.trackLineWidth - 20) * Math.cos(deg)
			let y = (this.radius - this.trackLineWidth - 20) * Math.sin(deg)
			deg += this.tickRad
			this.ctx.font = '12px serif'
			this.ctx.fillStyle = '#999'
			this.ctx.textAlign = 'center'
			// 不设置会与tick错位
			this.ctx.textBaseline = 'middle'
			this.ctx.fillText(i, x, y)
		}

	}
	// 角度转化为弧度
	degToRad(deg) {
		return deg * Math.PI / 180
	}
	// 当前值的弧度
	getCurValueRad() {
		// 超出
		if (this.curValue > this.max) {
			return (this.max - this.min) * this.tickRad + this.degToRad(this.deg.start)
		}
		return (this.curValue - this.min) * this.tickRad + this.degToRad(this.deg.start)
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
