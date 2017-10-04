
var log = console.log.bind(console);
window.addEventListener("DOMContentLoaded", function(){
    startGame();
});

var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 400;
function GetPaddle(moveSpeed){
    var obj = {
        width: 100,
        height: 10,
        x:0,
        y:350,
        moveSpeed: moveSpeed || 5,
        moveDirection: 0, ////(-1 表示 left  1表示 right)
    }
    obj.moveLeft = function(){
        this.x = Math.max(0, this.x - this.moveSpeed);

    };
    obj.moveRight = function(){
        this.x = Math.min(CANVAS_WIDTH - this.width, this.x + this.moveSpeed);
    };
    obj.x = CANVAS_WIDTH/2 - obj.width/2;
    return obj;
}

function GetBall(moveSpeed){
    var obj = {
        radius: 5,
        x:10,
        y:150,
        moveSpeed: moveSpeed || 5,
        moveDirectionH: 0,// -1 向左移动  1向右移动
        moveDirectionV: 0,// -1 向上移动  1向下移动
    }
    obj.moveLeft = function(){
        this.x = Math.max(0, this.x - this.moveSpeed);
        if( (this.x - this.radius) === 0){
            this.reverseH();
        }
    };
    obj.moveRight = function(){
        this.x = Math.min(CANVAS_WIDTH - this.radius, this.x + this.moveSpeed);
        if( (this.x + this.radius) === CANVAS_WIDTH){
            this.reverseH();
        }
    };

    obj.moveUp = function(){
        this.y = Math.max(0, this.y - this.moveSpeed);
        if( (this.y - this.radius) === 0){
            this.reverseV();
        }
    };
    obj.moveDown = function(){
        this.y = Math.min(CANVAS_HEIGHT, this.y + this.moveSpeed);
        if( (this.y + this.radius) === CANVAS_HEIGHT){
            this.reverseV();
        }
    };
    obj.reverseV = function(){
        this.moveDirectionV = -1 * this.moveDirectionV;
    }
    obj.reverseH = function(){
        this.moveDirectionH = -1 * this.moveDirectionH;
    }
    obj.x = CANVAS_WIDTH/2 - obj.radius/2;
    obj.moveDirectionV = 1;//默认向下移动
    obj.moveDirectionH = 1;//默认向右移动
    return obj;
}

function Game(){
    this.canvas = (function(){
        var ele = document.querySelector('#canvas');
        return {
            ele: ele,
            context: ele.getContext('2d'),
            height: CANVAS_HEIGHT,
            width: CANVAS_WIDTH,
        }
    })()
    this.context = this.canvas.context;


    this.timer = null;
    this.paddle = GetPaddle();
    this.ball = GetBall();

    //状态控制 //只要按下过 left  就进入 left 状态
    this.keyActions = {
        leftClick: function(){
            //37
            this.paddle.moveDirection = -1;
        }.bind(this),
        rightClick: function(){
            //39
            this.paddle.moveDirection = 1;
        }.bind(this),
    }
}
Game.prototype = {
    start: function(){
        var that = this;
        var moveTimer = function(){
            if(that.paddle.moveDirection == -1){
                that.paddle.moveLeft();
                // that.drawAgain();
            }else if(that.paddle.moveDirection == 1){
                that.paddle.moveRight();
                // that.drawAgain();
            }

            if(that.ball.moveDirectionV == 1){
                that.ball.moveDown();
            }else if(that.ball.moveDirectionV == -1){
                that.ball.moveUp();
            }
            if(that.ball.moveDirectionH === 1 ){
                that.ball.moveRight()
            }else{
                that.ball.moveLeft();
            }

            // setTimeout(moveTimer, 1000/30);
            that.drawAgain();
            that.collisionDetection();
        }
        setInterval(moveTimer, 1000/30);

        this.draw();
        this.bindEvents();
    },
    draw: function(){
        this.context.fillStyle = 'black';
        this.context.fillRect(this.paddle.x, this.paddle.y, 100, 10);

        this.context.beginPath();
        this.context.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI*2, true);
        this.context.fill();
    },
    drawAgain: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.draw();
    },

    collisionDetection: function(){

        // ball and paddle
        if ( (this.ball.y + this.ball.radius) >= this.paddle.y && (this.ball.y - this.ball.radius) <= (this.paddle.y + this.paddle.height) ) {
            if( (this.ball.x - this.ball.radius) >= this.paddle.x && (this.ball.x + this.ball.radius) <= this.paddle.x + this.paddle.width){
                console.log('peng');
                this.ball.reverseV();
            }
        }

        //
    },

    bindEvents: function(){
        var that = this;
        window.addEventListener('keydown', function(event){
            switch(event.keyCode){
                case 37:
                case 65:
                    that.keyActions['leftClick']()
                    break;
                case 39:
                case 58:
                    that.keyActions['rightClick']()
            }

        }, false)
    }


}


function startGame(){
    new Game().start();
}