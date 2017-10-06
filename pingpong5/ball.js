import {CANVAS_WIDTH, CANVAS_HEIGHT, moveSpeed, BALL_RADIUS} from './constants.js'
import util from './util/util.js'



function Ball(moveSpeed){
    var obj = {
        radius: 5,
        x:10,
        y:150,
        // moveSpeed: moveSpeed || 5,
        moveDirectionH: 0,// -1 向左移动  1向右移动
        moveDirectionV: 0,// -1 向上移动  1向下移动
    }

    obj.draw = (context, img, x, y)=>{
        context.drawImage(img, 0, 0, img.width, img.height, x - BALL_RADIUS, y - BALL_RADIUS, BALL_RADIUS*2, BALL_RADIUS*2)
        // context.arc(x, y, BALL_RADIUS, 0, Math.PI*2, true);
        // context.drawImage(img, x, y)
    }

    obj.moveLeft = function(){
        this.x = Math.max(0, this.x - window.moveSpeed);
        if( (this.x - this.radius) <= 0){
            this.reverseH();
        }
    };
    obj.moveRight = function(){
        this.x = Math.min(CANVAS_WIDTH - this.radius, this.x + window.moveSpeed);
        if( (this.x + this.radius) >= CANVAS_WIDTH){
            this.reverseH();
        }
    };

    obj.moveUp = function(){
        this.y = Math.max(0, this.y - window.moveSpeed);
        if( (this.y - this.radius) <= 0){
            this.reverseV();
        }
    };
    obj.moveDown = function(){
        this.y = Math.min(CANVAS_HEIGHT, this.y + window.moveSpeed);
        if( (this.y + this.radius) >= CANVAS_HEIGHT){
            this.reverseV();
        }
    };
    obj.changeV = function(direct){
        this.moveDirectionV = direct
    }
    obj.changeH = function(direct){
        this.moveDirectionH = direct
    }

    obj.reverseV = function(){
        this.moveDirectionV = -1 * this.moveDirectionV;
        // util.log(this.moveDirectionV);
    }
    obj.reverseH = function(){
        this.moveDirectionH = -1 * this.moveDirectionH;
    }
    obj.x = CANVAS_WIDTH/2 - obj.radius/2;
    obj.moveDirectionV = 1;//默认向下移动
    obj.moveDirectionH = 1;//默认向右移动
    return obj;
}


export {Ball};
