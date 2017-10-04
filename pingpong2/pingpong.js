
import {Game} from "./game.js"


var log = console.log.bind(console);
window.addEventListener("DOMContentLoaded", function(){
    startGame();
});
function startGame(){
    new Game().start();
}
