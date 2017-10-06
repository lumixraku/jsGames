import {CANVAS_WIDTH, CANVAS_HEIGHT} from './constants.js'


var Canvas = {
    setCanvasWH: function(){
        var canvasElem = document.querySelector('#canvas')
        canvasElem.style.cssText = `width: ${CANVAS_WIDTH}px; height: ${CANVAS_HEIGHT}px; margin: 0 auto; display:block`;
        // var bodyWidth = document.body.offsetWidth;
        // var bodyHeight = document.body.offsetHeight;
        // var CANVAS_WIDTH = bodyWidth
        // var CANVAS_HEIGHT= bodyHeight

        // canvasElem.setAttribute('width', bodyWidth)
        // canvasElem.setAttribute('height', bodyHeight)
        // return {
        //     CANVAS_WIDTH,
        //     CANVAS_HEIGHT
        // }
    }
}

export default Canvas