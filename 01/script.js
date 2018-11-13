
        let my_canvas = document.createElement('canvas');
        layout()
        window.addEventListener('resize', layout, false)

        let source_x = 0.5
        let source_y = 0.5
        let global_target_r = 0.4

        window.addEventListener('mousemove', onMove, false)

        document.body.appendChild(my_canvas)
        let ctx = my_canvas.getContext('2d')

        let allSquers = []
        const squersView = []

        const fps = 50

        let ease = 'easeInOutExpo'

        let lastTime = 0

        const animationLoop = (time) => {
            requestAnimationFrame(animationLoop)
            if (time - lastTime >= 1000 / fps) {
                lastTime = time

                ctx.clearRect(0, 0, my_canvas.width, my_canvas.height)
                squersView.length = 0

                global_target_r = Math.min(0.4, global_target_r + 0.01)

                for (let i = 0; i < 10; i++) {
                    allSquers.push({
                        start_x: source_x,
                        start_y: source_y,
                        target_r: global_target_r,
                        h: rand(5, 15),
                        //kąt początkowy (pod którym będzię się poruszać kwadrat)
                        start_a: rand(0, 360),
                        t: 0,
                        d: 2000,
                        start_r: 255,
                        start_g: rand(0, 240),
                        start_b: rand(0, 100)
                    })
                }

                for (let i = 0; i < allSquers.length; i++) {
                    let square = allSquers[i]

                    square.t += 1000 / fps
                    //
                    //aktualny promień rośnie od 0 do target_r
                    square.r = Easing.get(ease, 0, Math.round(square.target_r * my_canvas.height), square.t, square.d)
                    //kąt ruchu rośnie od wartości początkowej do wartości początkowej + 180 stopni
                    square.a = Easing.get(ease, square.start_a, square.start_a + 180, square.t, square.d)


                    square.x = Math.sin(Math.PI / 180 * square.a) * square.r + square.start_x * my_canvas.width
                    square.y = Math.cos(Math.PI / 180 * square.a) * square.r + square.start_y * my_canvas.height
                    // 
                    ctx.fillStyle = 'rgba(' + square.start_r + ',' + square.start_g + ',' + square.start_b + ',1)'
                    ctx.fillRect(square.x - square.h / 2, square.y - square.h / 2, square.h, square.h)
                    if (square.t <= square.d) {
                        //view squares 
                        squersView.push(square)
                    }
                }
                allSquers = squersView.concat()
            }
        }
    
        function onMove(event) {
            source_x = event.x / my_canvas.width
            source_y = event.y / my_canvas.height
            global_target_r= Math.max(0.1, global_target_r - 0.01)
        }

        function layout(event) {
            my_canvas.width = window.innerWidth;
            my_canvas.height = window.innerHeight;
        }

        function rand(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        }

