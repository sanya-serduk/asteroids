export default class Helper {
	static getRandomBoolean() {
		return Math.random() < 0.5
	}

	static getRandomInteger(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	static getRandomDecimal(min, max, num) {
		const factor = 10 ** num
		min *= factor
		max *= factor
		return Math.floor(Math.random() * (max - min + 1) + min) / factor
	}

	static getRandomArguments() {
		const args = Array.from(arguments)
		const randomIndex = Math.floor(Math.random() * args.length)
		return args[randomIndex]
	}

	static distance(a, b = { x: 0, y: 0 }) {
		return Math.hypot(a.x - b.x, a.y - b.y)
	}

	static velocity(pos, speed) {
		const dist = this.distance(pos)
		return {
			x: dist > speed ? pos.x / dist * speed : pos.x,
			y: dist > speed ? pos.y / dist * speed : pos.y,
		}
	}

	static getRandomPositionOnBordersRect({ top, right, bottom, left }) {
		if (Math.random() < 0.5) {
			return {
				x: Math.random() < 0.5 ? left : right,
				y: Math.random() * (bottom - top) + top
			}
		} else {
			return {
				x: Math.random() * (right - left) + left,
				y: Math.random() < 0.5 ? top : bottom
			}
		}
	}

	static getRandomPolygon({ min = 50, max = 150, num = 8 }) {
		const polygon = []
		const step = Math.PI * 2 / num

		for (let i = 0; i < num; i++) {
			const angle = step * i
			const r = Helper.getRandomInteger(min, max)
			polygon.push({
				x: Math.cos(angle) * r,
				y: Math.sin(angle) * r
			})
		}

		return polygon
	}

	static getPathRoundedPolygon(points, radiusAll) {
		const path2D = []
		const mewPolygon = []
		let i, x, y, len, p1, p2, p3, v1, v2, sinA, sinA90, radDirection, drawDirection, angle, halfAngle, cRadius, lenOut,radius;
		const asVec = function(p, pp, v) {
			v.x = pp.x - p.x
			v.y = pp.y - p.y
			v.len = Math.sqrt(v.x * v.x + v.y * v.y)
			v.nx = v.x / v.len
			v.ny = v.y / v.len
			v.ang = Math.atan2(v.ny, v.nx)
		}
		radius = radiusAll
		v1 = {}
		v2 = {}
		len = points.length
		p1 = points[len - 1]
		for (i = 0; i < len; i++) {
			p2 = points[(i) % len]
			p3 = points[(i + 1) % len]
			asVec(p2, p1, v1)
			asVec(p2, p3, v2)
			sinA = v1.nx * v2.ny - v1.ny * v2.nx
			sinA90 = v1.nx * v2.nx - v1.ny * -v2.ny
			angle = Math.asin(sinA < -1 ? -1 : sinA > 1 ? 1 : sinA)
			radDirection = 1
			drawDirection = false
			if (sinA90 < 0) {
				if (angle < 0) {
					angle = Math.PI + angle
				} else {
					angle = Math.PI - angle
					radDirection = -1
					drawDirection = true
				}
			} else {
				if (angle > 0) {
					radDirection = -1
					drawDirection = true
				}
			}
			if (p2.radius !== undefined) {
				radius = p2.radius
			} else {
				radius = radiusAll
			}
			halfAngle = angle / 2;
			lenOut = Math.abs(Math.cos(halfAngle) * radius / Math.sin(halfAngle))
			if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
				lenOut = Math.min(v1.len / 2, v2.len / 2)
				cRadius = Math.abs(lenOut * Math.sin(halfAngle) / Math.cos(halfAngle))
			} else {
				cRadius = radius
			}
			x = p2.x + v2.nx * lenOut
			y = p2.y + v2.ny * lenOut
			x += -v2.ny * cRadius * radDirection
			y += v2.nx * cRadius * radDirection

			const startAngle = v1.ang + Math.PI / 2 * radDirection
			const endAngle = v2.ang - Math.PI / 2 * radDirection

			//path2D.arc(x, y, cRadius, startAngle, endAngle, drawDirection)
			path2D.push({
				data: {
					x, y, cRadius, startAngle, endAngle, drawDirection
				},
				draw(path, { x, y, cRadius, startAngle, endAngle, drawDirection }) {
					path.arc(x, y, cRadius, startAngle, endAngle, drawDirection)
				}
			})

			const pStart = {
				x: x + Math.cos(startAngle) * cRadius,
				y: y + Math.sin(startAngle) * cRadius
			}

			const pEnd = {
				x: x + Math.cos(endAngle) * cRadius,
				y: y + Math.sin(endAngle) * cRadius
			}

			let angleDiff = drawDirection ? startAngle - endAngle : endAngle - startAngle

			if (angleDiff < 0) {
				angleDiff += 2 * Math.PI
			}

			const midAngle = drawDirection ? startAngle - angleDiff / 2 : startAngle + angleDiff / 2

			const pCenter = {
				x: x + Math.cos(midAngle) * cRadius,
				y: y + Math.sin(midAngle) * cRadius
			}

			mewPolygon.push(pStart)
			mewPolygon.push(pCenter)
			mewPolygon.push(pEnd)

			p1 = p2
			p2 = p3
		}
		//path2D.closePath()

		return { path2D, polygon: mewPolygon }
	}

	static get isTouchDevice() {
		return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
	}

	static fullScreen(element) {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else if (document.exitFullscreen) {
			//document.exitFullscreen();
		}
	}

	static drawRect(ctx, rect, color = '#fff') {
		ctx.save()
		ctx.strokeStyle = color
		ctx.strokeRect(rect.x, rect.y, rect.w, rect.h)
		ctx.restore()
	}

	static drawPolygon(ctx, polygon, color = '#fff') {
		ctx.save()
		ctx.beginPath()
		ctx.lineWidth = 2
		ctx.strokeStyle = color

		polygon.forEach((point, i) => {
			if (i === 0) {
				ctx.moveTo(point.x, point.y)
			}
			ctx.lineTo(point.x, point.y)
		})

		ctx.closePath()
		ctx.stroke()
		ctx.restore()
	}
}