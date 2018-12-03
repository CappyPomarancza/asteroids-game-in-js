Rock.count = 0
Rock.all = {}

function Rock(size, x, y){
Rock.count++
this.id = Rock.count
Rock.all[this.id] = this
//
this.size = size !==undefined ? size : 2
this.x = x!==undefined ? x :  (VAR.rand(0,1) ? VAR.rand(0,3)/10 : VAR.rand(7,10)/10) * VAR.W
this.y = y!==undefined ? y :  (VAR.rand(0,1) ? VAR.rand(0,3)/10 : VAR.rand(7,10)/10) * VAR.W

this.modX = 0.0005 * (VAR.rand(1,10)* VAR.rand(0,1) ? 1 : -1 )
this.modY = 0.0005 * (VAR.rand(1,10)* VAR.rand(0,1) ? 1 : -1 )
//
this.points = []
this.r = 0.2
let a = 0 
while(a< 360) {
    a += VAR.rand(30,45)
    this.points.push({
        x: Math.sin(Math.PI/180 *a)* this.r, 
        y: Math.cos(Math.PI/180 *a)* this.r 
    }) 

}

}