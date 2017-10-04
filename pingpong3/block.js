import Collision from './collision.js'

function Block(x, y, opt){
    opt = opt || {};
    var obj = {
        x:x,
        y:y,
        lives: opt.lives || 1,
        width: opt.width || 100,
        height: 20
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


export default Block;