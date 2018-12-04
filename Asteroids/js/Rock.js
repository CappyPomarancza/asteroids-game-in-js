Rock.count = 0
Rock.all = {}

function Rock(size, x, y) {
    Rock.count++
    this.id = Rock.count
    Rock.all[this.id] = this
    //
    this.size = size !== undefined ? size : 2
    this.x = x !== undefined ? x : (VAR.rand(0, 1) ? VAR.rand(0, 3) / 10 : VAR.rand(7, 10) / 10) * VAR.W
    this.y = y !== undefined ? y : (VAR.rand(0, 1) ? VAR.rand(0, 3) / 10 : VAR.rand(7, 10) / 10) * VAR.W

    this.modX = 0.00006 * (VAR.rand(1, 10) * VAR.rand(0, 1) ? 1 : -1)
    this.modY = 0.00006 * (VAR.rand(1, 10) * VAR.rand(0, 1) ? 1 : -1)
    //
    this.points = []
    this.r = 0.2
    let a = 0
    while (a < 360) {
        a += VAR.rand(30, 45)
        this.points.push({
            x: Math.sin(Math.PI / 180 * a) * this.r,
            y: Math.cos(Math.PI / 180 * a) * this.r
        })
    }
}

Rock.prototype.draw = function () {
    this.x += this.modX * VAR.d
    this.y += this.modY * VAR.d

    if (this.x + this.r * VAR.d < 0) {
        this.x += VAR.W + (this.r * 2 * VAR.d)
    } else if (this.x - this.r * VAR.d > VAR.W) {
        this.x -= VAR.W + (this.r * 2 * VAR.d)
    }
    //
    if (this.y + this.r * VAR.d < 0) {
        this.y += VAR.H + (this.r * 2 * VAR.d)
    } else if (this.y - this.r * VAR.d > VAR.H) {
        this.y -= VAR.H + (this.r * 2 * VAR.d)
    }



    Game.ctx.beginPath()
    for (let i = 0; i < this.points.length; i++) {
        Game.ctx[i === 0 ? 'moveTo' : 'lineTo'](this.points[i].x * VAR.d + this.x, this.points[i].y * VAR.d + this.y)
    }
    Game.ctx.closePath()
    Game.ctx.stroke()
}
Rock.draw = function () {
    Rock.num = 0
    for (let r in Rock.all) {
        Rock.num++
        Rock.all[r].draw()
    }
}