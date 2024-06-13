import ShapeHelper from "../system/collision/shapes/ShapeHelper";
import Helper from "../system/Helper";

export default class RoundedPolygon {
	constructor(polygon, radius) {
		this.polygon = polygon
		this.path2D = new Path2D()
		this.radius = radius
		this.init()
	}

	init() {
		const { polygon, path2D } = Helper.getPathRoundedPolygon(this.polygon, this.radius)
		const center = ShapeHelper.getCenterMassConvexPolygon(polygon)

		polygon.forEach(point => {
			point.x -= center.x
			point.y -= center.y
		})

		path2D.forEach(point => {
			point.data.x -= center.x
			point.data.y -= center.y
			point.draw(this.path2D, point.data)
		})

		this.path2D.closePath()
		this.polygon = polygon
	}
}