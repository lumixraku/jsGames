export default {
    log: console.log.bind(console),

    detectInBall: function(x, y, ball){
        if(ball.x - ball.radius <= x && x <= ball.x + ball.radius){
            if(ball.y - ball.radius <=y && y<= ball.y + ball.radius ){
                return true
            }
        }
        return false
    }
}