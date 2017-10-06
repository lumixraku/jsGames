export default function controllerFn(){
    window.moveSpeed = 5;




    var speedSlider = document.querySelector('#input-speed');
    speedSlider.addEventListener('input', function(e){
        var target = e.target;
        var val = target.value;
        window.moveSpeed = +val;
    })
}