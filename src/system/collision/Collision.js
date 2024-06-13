export default class Collision {
	static RectRect(r1, r2) {
		return r1.x + r1.w > r2.x
			&& r1.x < r2.x + r2.w
			&& r1.y + r1.h > r2.y
			&& r1.y < r2.y + r2.h
	}

	static getLinesPolygon(polygon) {
		return polygon.map((item, i, arr) => (i < arr.length-1) ? [item, arr[i+1]] : [item, arr[0]])
	}

	static lineIntersection(a, b) {
		let v1 = (b.x2-b.x1) * (a.y1-b.y1) - (b.y2-b.y1) * (a.x1-b.x1)
		let v2 = (b.x2-b.x1) * (a.y2-b.y1) - (b.y2-b.y1) * (a.x2-b.x1)
		let v3 = (a.x2-a.x1) * (b.y1-a.y1) - (a.y2-a.y1) * (b.x1-a.x1)
		let v4 = (a.x2-a.x1) * (b.y2-a.y1) - (a.y2-a.y1) * (b.x2-a.x1)

		return (v1 * v2 < 0) && (v3 * v4 < 0)
	}

	static PointPolygon(point, polygon) {
		let res = false

		for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
			if ((polygon[i].y > point.y) !== (polygon[j].y > point.y) && point.x < (polygon[j].x - polygon[i].x) * (point.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x) {
				res = !res
			}
		}

		return res
	}

	static PolygonPolygon(polygon1, polygon2) {

		for (let i = 0; i < polygon1.length; i++) {
			if (this.PointPolygon(polygon1[i], polygon2)) {
				return true
			}
		}

		for (let i = 0; i < polygon2.length; i++) {
			if (this.PointPolygon(polygon2[i], polygon1)) {
				return true
			}
		}

		return false
	}

	static createBulletPolygon(c1, c2, r) {
		const angle = Math.atan2(c2.y - c1.y, c2.x - c1.x)

		return [
			{ x: c1.x + Math.cos(angle + Math.PI)   * r, y: c1.y + Math.sin(angle + Math.PI) * r },
			{ x: c1.x + Math.cos(angle - Math.PI/2) * r, y: c1.y + Math.sin(angle - Math.PI/2) * r },
			{ x: c2.x + Math.cos(angle - Math.PI/2) * r, y: c2.y + Math.sin(angle - Math.PI/2) * r },
			{ x: c2.x + Math.cos(angle)             * r, y: c2.y + Math.sin(angle) * r },
			{ x: c2.x + Math.cos(angle + Math.PI/2) * r, y: c2.y + Math.sin(angle + Math.PI/2) * r },
			{ x: c1.x + Math.cos(angle + Math.PI/2) * r, y: c1.y + Math.sin(angle + Math.PI/2) * r },
		]
	}
}