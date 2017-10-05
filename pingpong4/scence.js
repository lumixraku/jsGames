import {CANVAS_WIDTH, CANVAS_HEIGHT} from './constants.js'
var scence= {
    welcome: function(context, g){
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        var img = g.assets.imgs.welcome
        context.drawImage(img, 0, 0, img.width, img.height, Math.abs(CANVAS_WIDTH - img.width)/2, Math.abs(CANVAS_HEIGHT - img.height)/2, img.width, img.height)
    },

    dead: function(context, g){
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        var img = g.assets.imgs.dead
        context.drawImage(img, 0, 0, img.width, img.height, Math.abs(CANVAS_WIDTH - img.width)/2, Math.abs(CANVAS_HEIGHT - img.height)/2, img.width, img.height)
    },

    finish: function(context, g){
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        var img = g.assets.imgs.finish
        context.drawImage(img, 0, 0, img.width, img.height, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        // context.drawImage(img, 0,0, img.width, img.height, x, y, PADDLE_WIDTH, PADDLE_HEIGHT)
    },

    paddle: function(context, paddle, assets){
        paddle.draw(context, assets.paddle, paddle.x, paddle.y)
    },

    ball: function(context, ball, assets){
        ball.draw(context, assets.ball, ball.x, ball.y)
    },

    block: function(context, b, assets){
        b.draw(context, assets.block, b.x, b.y)
    }

}

export {scence}