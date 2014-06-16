var    canvas = $('canvas#bubbles')[0];
var    context;
var    colors = new Array('#bf956f', '#bf956f', '#b96b6b', '#6c6164', '#31c3d9', '#f9ca6b');
var    directions = new Array('up', 'down');
var    background;
var    windowWidth = window.innerWidth;
var    windowHeight = window.innerHeight;
var    bubbles = new Array();
canvas.style.width= windowWidth + "px";
canvas.style.height= windowHeight + "px";

if(canvas.getContext('2d')){
    context = canvas.getContext('2d');

    canvas.width = windowWidth;
    canvas.height = windowHeight;

    for(var i = 0; i < 20; i++){
        setBubble(true);
    }
}
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame
})();

animate();

window.onresize = function(event) {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    canvas.style.width= windowWidth + "px";
    canvas.style.height= windowHeight + "px";
    canvas.width = windowWidth;
    canvas.height = windowHeight;
}



function setBubble(init){
    var bubble = {
        centerX : Math.floor((Math.random() * (windowWidth - 0) + 0)),
        centerY : Math.floor((Math.random() * (windowHeight - 0) + 0)),
        radius : Math.floor((Math.random() * (400 - 10) + 10)),
        color : colors[Math.floor(Math.random() * (6))],
        speed : (Math.random() * (2)) / 300
    }
    if(init)
        bubble.direction = directions[Math.floor(Math.random() * (2))];
    else
        bubble.direction = 'up';

    if(bubble.direction == 'up')
        bubble.alpha = 0.0;
    else
        bubble.alpha = 0.9;

    bubbles.push(bubble);
}



function animate() {
    requestAnimFrame(animate);
    draw();
}

function draw() {
    context.clearRect(0,0,windowWidth,windowHeight)
        context.save();
    for(var i = 0; i < bubbles.length; i++){
        context.globalAlpha = bubbles[i].alpha;
        context.beginPath();
        context.arc(bubbles[i].centerX, bubbles[i].centerY, bubbles[i].radius, 0, 2 * Math.PI, false);
        context.fillStyle = bubbles[i].color;
        context.fill();

        if(bubbles[i].direction == 'up'){
            bubbles[i].alpha += bubbles[i].speed;
            if(bubbles[i].alpha >= 0.9)
                bubbles[i].direction = 'down'
        }
        else{
            bubbles[i].alpha -= bubbles[i].speed;
            if(bubbles[i].alpha <= 0){
                bubbles.splice(i, 1);
                setBubble(false)
            }
        }
    }
    context.restore();
}
