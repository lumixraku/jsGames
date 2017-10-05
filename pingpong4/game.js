// import _ from './util/lodash.js'

import {
    Ball
} from './ball.js'
import {
    Paddle
} from './Paddle.js'
import {
    Block
} from './block.js'

import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT
} from './constants.js'
import controllerFn from './controller.js'
import Collision from './collision.js'
import Assets from './assets.js'
import util from './util/util.js'
import {blockPos} from './level.js'



var RUNNING = 1
var NOTSTART = 0


function Game() {
    var that = this;
    this.canvas = (function () {
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
        leftClick: function () {
            //37
            this.paddle.moveDirection = -1;
        }.bind(this),
        rightClick: function () {
            //39
            this.paddle.moveDirection = 1;
        }.bind(this),
    }

    Assets.loadPicFinishd().then(imgs => {
        //所有资源加载完后才开始
        _.set(this, 'assets.imgs', imgs)
        this.start()
    })


}
Game.prototype = {


    start: function () {
        var that = this;

        this.gameStatus = RUNNING;

        this.loadBlocks(1);
        this.bindEvents();
        var moveTimer = () => {

            if (this.gameStatus !== RUNNING) return

            if (that.paddle.moveDirection == -1) {
                that.paddle.moveLeft();

            } else if (that.paddle.moveDirection == 1) {
                that.paddle.moveRight();
            }

            if (that.ball.moveDirectionV == 1) {
                that.ball.moveDown();
            } else if (that.ball.moveDirectionV == -1) {
                that.ball.moveUp();
            }
            if (that.ball.moveDirectionH === 1) {
                that.ball.moveRight()
            } else {
                that.ball.moveLeft();
            }

            // setTimeout(moveTimer, 1000/30);
            that.updateCanvas();
            that.collisionDetection();
        }
        setInterval(moveTimer, 1000 / 30);

    },


    loadBlocks: function (l) {
        var poss = blockPos[l]
        for(let p of poss){
            var b = Block(p.pos[0], p.pos[1], p.lives)
            if(!this.blocks) this.blocks = []
            this.blocks.push(b)

        }
    },
    draw: function (imgs) {

        //paddle
        this.context.fillStyle = 'black';
        this.paddle.draw(this.context, this.assets.imgs[0], this.paddle.x, this.paddle.y)



        //ball
        this.context.beginPath();
        this.ball.draw(this.context, this.assets.imgs[1], this.ball.x, this.ball.y)
        this.context.fill();

        //block
        for(let b of this.blocks){
            b.draw(this.context, this.assets.imgs[2], b.x, b.y)
        }

    },
    updateCanvas: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
    },

    collisionDetection: function () {

        // ball and paddle
        var colliders = Collision.detectRadius(this.ball, this.paddle)
        if (colliders) {
            util.log('peng')
            if(colliders.y){
                this.ball.changeV(-1 * colliders.y);
            }
            if(colliders.x){
                this.ball.changeH(-1 * colliders.x);
            }

        }
        //ball and block
        for(let b of this.blocks){
            // debugger
            var colliders2 = Collision.detectRadius(this.ball, b)
            if(colliders2){
                util.log('block peng')

                if(colliders2.y){
                    this.ball.changeV(-1 * colliders2.y);
                }

                if(colliders2.x){
                    this.ball.changeH(-1 * colliders2.x);
                }
                break
            }

        }

    },

    bindEvents: function () {
        var that = this;
        window.addEventListener('keydown', function (event) {
            switch (event.keyCode) {
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

export default Game
