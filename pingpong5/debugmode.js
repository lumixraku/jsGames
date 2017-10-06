import util from './util/util.js'

function debugFn (g){
    if(localStorage.getItem('debug')){

        var debug_drag = 0
        window.document.addEventListener("mousedown", function(e){
            var mx = e.offsetX;
            var my = e.offsetY;
            if (util.detectInBall(mx, my, g.ball)){
                debug_drag = 1
            }

        }, false);


        window.document.addEventListener('mousemove', function(e){
            var mx = e.offsetX;
            var my = e.offsetY;
            if(debug_drag){
                g.ball.x = mx
                g.ball.y = my
            }

        }, false)

        window.document.addEventListener('mouseup', function(){
            if(debug_drag) debug_drag = 0
        }, false)


        var lastSpeed = 0
        window.addEventListener('keydown', function(e){
            if (e.keyCode == 80){
                if(window.moveSpeed != 0){
                    lastSpeed = window.moveSpeed
                    window.moveSpeed = 0
                }else{
                    window.moveSpeed = lastSpeed
                }

            }
        })
    }

}

export default debugFn