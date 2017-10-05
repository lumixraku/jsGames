import {CANVAS_WIDTH, CANVAS_HEIGHT, moveSpeed, PADDLE_WIDTH, PADDLE_HEIGHT} from './constants.js'


/**
 * 这个函数名是一个名词 理论上说它是一个构造函数
 * 目前还不是  不用 new 就能创建一个对象了
 */
var Paddle = function(){
    var obj = {
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT,
        x:0,
        y:350,
        // moveSpeed: moveSpeed || 5,
        moveDirection: 0, ////(-1 表示 left  1表示 right)
    }
    obj.draw = (context, img, x, y)=>{
        context.drawImage(img, 0,0, img.width, img.height, x, y, PADDLE_WIDTH, PADDLE_HEIGHT)
    }
    obj.moveLeft = function(){

        //moveSpeed 要随时改变  不应该再创建的时候就定下来 而是使用一个全局的变量
        this.x = Math.max(0, this.x - window.moveSpeed);

    };
    obj.moveRight = function(){
        this.x = Math.min(CANVAS_WIDTH - this.width, this.x + window.moveSpeed);
    };
    obj.x = CANVAS_WIDTH/2 - obj.width/2;
    return obj;
}

export {Paddle};
