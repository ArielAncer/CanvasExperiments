
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c =  canvas.getContext('2d');

// c.fillStyle = c.strokeStyle;
// c.fill();

function randColor(){
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    
    return "rgb(" + r + "," + g + "," + b  + ")"
}

var triangleArray = [];

for(var i = 0; i < 100; i++){
    triangleArray.push(new Triangle(Math.random() * (window.innerWidth - 100), Math.random() * (window.innerHeight - 200) + 100,100, randColor()));
}

function Triangle(x, y, size, color){
    this.x = x;
    this.dx = 8;
    this.dy = 8;
    this.y = y;
    this.size = size;

this.draw = function(){
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineTo(this.x + size, this.y);
    c.lineTo(this.x + size/2,this.y - size);
    c.lineTo(this.x, this.y);
    c.strokeStyle = color;
    c.stroke();
}

this.update = function(){

    if(this.x + this.size > window.innerWidth || this.x < 0){
        this.dx = -this.dx;
    }
    
    if(this.y + (this.size/4) > window.innerHeight || this.y - this.size < 0){
        this.dy = -this.dy;
    }

    this.x +=  this.dx;
    this.y +=  this.dy;

    this.draw();

}

}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    for(var i = 0; i < 100; i++){
        triangleArray[i].update();
    }
}

animate();

// var x = 200;
// var y = 200;
// var size = 100;

//  for(var i = 0 ; i < 100; i++){
//      c.clearRect(0,0,window.innerWidth,window.innerHeight);
// var i = 10;

// c.beginPath();
// c.moveTo(x+i, y-i);
// c.lineTo(x-i + size, y+i);
// c.lineTo(x+i + size/2,y+i - size);
// c.lineTo(x+i, y-i);
// c.strokeStyle = "White";
// c.stroke();

//  }