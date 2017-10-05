/*专门用于检测碰撞*/
 var Collision = {

    /**
     * obj1  obj2 都应至少有 xy 和 width height
     */
     detectRect: function(obj1, obj2){

        if(obj1.x + obj.width >= obj2.x  && obj1.x < obj2.x + obj2.width){
            if(  (obj1.y + obj.height) >= obj2.y && (obj1.y <= obj2.y + obj2.height) ){
                return true;
            }
        }
        return false;
     },

     detectRadius: function(cir, rect){
        if(rect.x <= cir.x + cir.radius   && cir.x - cir.radius <= rect.x + rect.width){

            //球正向下运动碰到paddle 上边缘
            if(cir.y < rect.y && cir.y + cir.radius >=rect.y ){
                return {
                    y:1  //返回碰撞之前的球的运动方向
                }
            }

            //球向上运动碰到paddle 下边缘
            if(cir.y >= rect.y + rect.height && cir.y - cir.radius <= rect.y + rect.height){
                return {
                    y:-1//返回碰撞之前的球的运动方向
                }
            }

            //运动碰到 paddle 的左右边缘
            if ( rect.y <= cir.y + cir.radius && cir.y - cir.radius <= rect.y + rect.height ){
                if( cir.x <=rect.x && rect.x <= cir.x + cir.radius){
                    return {
                        x:1
                    }
                }
                if( cir.x - cir.radius <= rect.x + rect.width && rect.x + rect.width <= cir.x){
                    return {
                        x: -1
                    }
                }
            }

        }



        return false;
     }
 }

 export default Collision