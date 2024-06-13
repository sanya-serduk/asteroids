import Helper from "../../Helper";

export default class ShapeHelper {
	static getCenterMassConvexPolygon(polygon) {
		if (polygon.length < 3) {
			return { x: 0, y: 0 }
		}

		let area = 0
		let centerX = 0
		let centerY = 0

		for (let i = 0; i < polygon.length; i++) {
			const x1 = polygon[i].x
			const y1 = polygon[i].y
			const x2 = polygon[(i + 1) % polygon.length].x
			const y2 = polygon[(i + 1) % polygon.length].y

			const crossProduct = (x1 * y2 - x2 * y1)
			area += crossProduct
			centerX += (x1 + x2) * crossProduct
			centerY += (y1 + y2) * crossProduct
		}

		area /= 2;
		centerX /= (6 * area);
		centerY /= (6 * area);

		return {
			x: centerX,
			y: centerY
		}
	}

	static getCenterPolygon(points) {
		const sum = points.reduce((sum, point) => {
			sum.x += point.x
			sum.y += point.y
			return sum
		}, { x:0 , y:0 })

		return {
			x: sum.x / points.length,
			y: sum.y / points.length
		}
	}

	static getFarPointPolygonCenterDistance(points) {
		const center = this.getCenterMassConvexPolygon(points)
		let farPoint = points[0]
		let dist = Helper.distance(points[0], center)
		points.forEach(point => {
			if (Helper.distance(point, center) > Helper.distance(farPoint, center)) {
				farPoint = point
				dist = Helper.distance(point, center)
			}
		})

		return dist
	}

	static getRectFromPolygonRotate(points) {
		const dist = this.getFarPointPolygonCenterDistance(points)
		return {
			x: -dist,
			y: -dist,
			w: dist * 2,
			h: dist * 2
		}
	}

	static getCircleFromPolygonRotate(points) {
		return {
			x: 0,
			y: 0,
			r: this.getFarPointPolygonCenterDistance(points)
		}
	}

	static getRectOnMoveRect(rect, moveX, moveY) {
		return {
			x: rect.x + Math.min(moveX, 0),
			y: rect.y + Math.min(moveY, 0),
			w: rect.w + Math.abs(moveX),
			h: rect.h + Math.abs(moveY)
		}
	}

	static getRectOnMoveCircle(circle, moveX, moveY) {
		const c2x = circle.x + moveX
		const c2y = circle.y + moveY
		const minX = Math.min(circle.x, c2x) - circle.r
		const minY = Math.min(circle.y, c2y) - circle.r
		const maxX = Math.max(circle.x, c2x) + circle.r
		const maxY = Math.max(circle.y, c2y) + circle.r

		return {
			x: minX,
			y: minY,
			w: maxX - minX,
			h: maxY - minY
		}
	}

	static getPolygonOnMoveCircle(circle, moveX, moveY) {
		const c1 = circle
		const c2 = {
			x: c1.x + moveX,
			y: c1.y + moveY,
		}
		const angle = Math.atan2(c2.y - c1.y, c2.x - c1.x)

		const cosTop    = Math.cos(angle)
		const cosLeft   = Math.cos(angle - Math.PI/2)
		const cosRight  = Math.cos(angle + Math.PI/2)
		const cosBottom = Math.cos(angle + Math.PI)

		const sinTop    = Math.sin(angle)
		const sinLeft   = Math.sin(angle - Math.PI/2)
		const sinRight  = Math.sin(angle + Math.PI/2)
		const sinBottom = Math.sin(angle + Math.PI)

		return [
			{ x: c1.x + cosBottom * c1.r, y: c1.y + sinBottom  * c1.r },
			{ x: c1.x + cosLeft   * c1.r, y: c1.y + sinLeft    * c1.r },
			{ x: c2.x + cosLeft   * c1.r, y: c2.y + sinLeft    * c1.r },
			{ x: c2.x + cosTop    * c1.r, y: c2.y + sinTop     * c1.r },
			{ x: c2.x + cosRight  * c1.r, y: c2.y + sinRight   * c1.r },
			{ x: c1.x + cosRight  * c1.r, y: c1.y + sinRight   * c1.r },
		]
	}
}