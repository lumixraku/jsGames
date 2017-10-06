import Collision from './collision.js'
import {BLOCK_WIDTH, BLOCK_HEIGHT} from './constants.js'

function Block(x, y, lives, opt){
    opt = opt || {};
    var obj = {
        x:x,
        y:y,
        lives: lives || 1,
        width: opt.width || BLOCK_WIDTH,
        height: BLOCK_HEIGHT
    }
    obj.draw = (context, img, x, y, width, height)=>{
        context.drawImage(img, 0,0, img.width, img.height, x, y, BLOCK_WIDTH, BLOCK_HEIGHT)
        // context.fillRect(x, y, BLOCK_WIDTH, BLOCK_HEIGHT)
    }
    obj.isAlive = function(){
        return obj.lives
    }
    obj.collide = function(ball){

        if(!obj.lives)return;

        if (Collision.detectRadius(ball, obj) ){
            obj.lives--
            if(obj.lives <= 0){

            }

        }
    }
    return obj;
}


export {Block};