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
     },

     detectRadius: function(cir, rect){
        if(cir.x + cir.radius >= rect.x && cir.x < rect.x + rect.width){
            if(cir.y + cir.radius >=rect.y && cir.y - cir.radius <= rect.y + rect.height){
                return true;
            }
        }
     }
 }

 export default Collision