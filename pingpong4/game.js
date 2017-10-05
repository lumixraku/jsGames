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
    scence
} from './scence.js'


import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT
} from './constants.js'


import controllerFn from './controller.js'
import Collision from './collision.js'
import assets from './assets.js'
import util from './util/util.js'
import {blockPos} from './level.js'


//gameStatus
var RUNNING = 1
var NOTSTART = 0
var FINISH = 5
var DEAD = 4

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

    this.timer = null;
    this.paddle = Paddle();
    this.ball = Ball();
    this.bindEvents();


    //状态控制 //只要按下过 left  就进入 left 状态
    this.keyActions = {
        leftClick: function () {
            //37
            if(this.gameStatus !== DEAD){
                this.paddle.moveDirection = -1;
            }
        }.bind(this),
        rightClick: function () {
            //39
            if(this.gameStatus != DEAD){
                this.paddle.moveDirection = 1;

            }
        }.bind(this),
        anyKeyPress: function(){
            if(this.gameStatus != RUNNING  && this.gameStatus != DEAD){
                this.start()
            }

        }.bind(this)
    }
    controllerFn();
    assets.loadPicFinishd().then(imgs => {
        //所有资源加载完后才开始
        _.set(this, 'assets.imgs', imgs)
        scence.welcome(this.context, this);
    })


}
Game.prototype = {

    start: function () {
        var that = this;

        this.gameStatus = RUNNING;
        this.level = 1;
        this.loadBlocks(this.level);

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
            that.loadLevel();
        }
        setInterval(moveTimer, 1000 / 30);

    },
    loadLevel: function(){

        //专用于计算目前所有 block 的生命值的 用户判断是否载入下一关
        var countArrTmp = [...this.blocks]
        var countall = 0;
        for(let a of countArrTmp){
            countall = countall + a.lives
        }
        if(countall === 0){
            this.level++;
            this.loadBlocks(this.level)
        }
    },

    loadBlocks: function (l) {
        if(blockPos.length <= l){
            // console.log('tongguan')
            scence.finish(this.context, this)
            this.gameStatus = FINISH
            return
        }

        var poss = blockPos[l]
        for(let p of poss){
            var b = Block(p.pos[0], p.pos[1], p.lives)
            if(!this.blocks) this.blocks = []
            this.blocks.push(b)

        }
    },
    draw: function (imgs) {
        // this.context.beginPath();

        //paddle
        this.context.fillStyle = 'black';
        scence.paddle(this.context, this.paddle, this.assets.imgs)

        //ball
        scence.ball(this.context, this.ball, this.assets.imgs)

        //block
        for(let b of this.blocks){
            if(b.lives >0 ){
                scence.block(this.context, b, this.assets.imgs)
            }
        }
        // this.context.fill();

    },
    updateCanvas: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if(this.gameStatus !== FINISH && this.gameStatus !== DEAD){
            this.draw();
        }
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

            if(b.lives > 0){

                var coll_rs2 = Collision.detectRadius(this.ball, b)
                if(coll_rs2){
                    util.log('block peng')
                    b.lives --
                    if(coll_rs2.y){
                        this.ball.changeV(-1 * coll_rs2.y);
                    }

                    if(coll_rs2.x){
                        this.ball.changeH(-1 * coll_rs2.x);
                    }
                    break
                }
            }

        }

        // ballAndBottom
        if(this.ball.y + this.ball.radius >= CANVAS_HEIGHT){
            scence.dead(this.context, this)
            this.gameStatus = DEAD
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
                    break
                default:
                    that.keyActions['anyKeyPress']()
            }

        }, false)
    }
}

export default Game
