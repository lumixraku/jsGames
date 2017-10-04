import {CANVAS_WIDTH, CANVAS_HEIGHT, moveSpeed} from './constants.js'
import util from './util.js'


function Ball(moveSpeed){
    var obj = {
        radius: 5,
        x:10,
        y:150,
        // moveSpeed: moveSpeed || 5,
        moveDirectionH: 0,// -1 向左移动  1向右移动
        moveDirectionV: 0,// -1 向上移动  1向下移动
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
