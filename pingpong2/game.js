import {Ball} from './ball.js'
import {Paddle} from './Paddle.js'
import {controllerFn} from './controller.js'
import Collision from './collision.js'
import {CANVAS_WIDTH, CANVAS_HEIGHT} from './constants.js'
import util from './util.js'


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

    controllerFn();

    this.timer = null;
    this.paddle = Paddle();
    this.ball = Ball();

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

            }else if(that.paddle.moveDirection == 1){
                that.paddle.moveRight();

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
            that.updateCanvas();
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
    updateCanvas: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.draw();
    },

    collisionDetection: function(){

        // ball and paddle
        if (Collision.detectRadius(this.ball, this.paddle)){
            util.log('peng')
            this.ball.reverseV();
        }
        // if ( (this.ball.y + this.ball.radius) >= this.paddle.y && (this.ball.y - this.ball.radius) <= (this.paddle.y + this.paddle.height) ) {
        //     if( (this.ball.x - this.ball.radius) >= this.paddle.x && (this.ball.x + this.ball.radius) <= this.paddle.x + this.paddle.width){
        //         console.log('peng');
        //         this.ball.reverseV();
        //     }
        // }

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

export {Game}
