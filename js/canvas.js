$(document).ready(function() { 

});

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100,100,50,50);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(500,100,50,50);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(300,200,50,50);
// console.log(canvas);

// // Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa56c4";
// c.stroke();

// makeRandomCircles(50);

// Arc / Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

 function makeRandomCircles(num)
 {
    for(var i=0; i < num; i++){ 
        var x = Math.random() * window.innerWidth; 
        var y = Math.random() * window.innerHeight; 
        c.beginPath();
        c.arc(x, y, 30, 0, Math.PI * 2, false);
        c.strokeStyle = randColor();//randRGBColor();
        c.stroke();
    }
}

function randColor()
{
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    var a = 1;
    var rgba = "rgba(" + r + ", " + g + ", " + b + ", " + a +")"; 
    return rgba;
}

function randRGBColor()
{
    if(Math.random() > 0.66){
        return "red";
    }
    else if(Math.random() > 0.33){
        return "green";
    }
    else{
        return "blue";
    }
}

var mouse = {
    x: undefined,
    y:undefined
}

var maxRadius = 40;
var minRadius = 2;

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function(event){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;   
    
    init();
});

function Circle(x, y, dx, dy, radius, minRadius, color)
{
    this.x = x;
    this.y = y;   
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.radius = radius;
    this.minRadius = minRadius;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();   
        //c.fillStyle = color;
        //c.fill(); 
    }

    this.update = function(){
        if(this.x + this.radius > window.innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        
        if(this.y + this.radius > window.innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
    
        this.y += this.dy;
        this.x += this.dx;

       // interactivity
       if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50){
           if(this.radius < maxRadius){
                this.radius += 1;
           }
       } 
       else if(this.radius > this.minRadius){
            this.radius -= 1;
       } 

        this.draw();
    }
}

var circleArray = [];

function init(){
    circleArray = [];
    for(var i = 0; i < 800; i++){        
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        var radius = Math.random() * 3 + 1;
    
        circleArray.push(new Circle(x, y, dx , dy, radius, minRadius, randColor()));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, innerHeight);

    for(var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
    
}

 animate();
 init();