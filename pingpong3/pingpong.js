
import {Game} from "./game.js"
import debugFn from './debugmode.js'
import canvas from './canvas.js'

var log = console.log.bind(console);
window.addEventListener("DOMContentLoaded", function(){
    startGame();
});
function startGame(){
    canvas.setCanvasWH()


    var g = new Game()
    g.start();
    debugFn(g);
}

