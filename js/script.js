// Initialising the canvas
var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

// Initial canvas size
canvas.width = window.innerWidth;
canvas.height = document.documentElement.scrollHeight; 


canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = -1;  

var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ' + '01'; 
letters = letters.split('');


var fontSize = 10,
    columns = Math.floor(canvas.width / fontSize); 


var drops = [];
for (var i = 0; i < columns; i++) {
  drops[i] = {
    position: Math.random() * canvas.height,  
    speed: Math.random() * 3 + 1,  
    resetProbability: Math.random() * 0.1 + 0.85 
  };
}

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';  
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)]; 
    
    ctx.fillStyle = '#ffffff';  // Green color
    ctx.fillText(text, i * fontSize, drops[i].position * fontSize);
    
    drops[i].position += drops[i].speed;
    
    if (drops[i].position * fontSize > canvas.height && Math.random() > drops[i].resetProbability) {
      drops[i].position = 0;
    }
  }
}

setInterval(draw, 33);


window.addEventListener('resize', function() {
    canvas.width = window.innerWidth; 
    canvas.height = document.documentElement.scrollHeight; 
    columns = Math.floor(canvas.width / fontSize); 
    drops = [];  
    for (var i = 0; i < columns; i++) {
        drops[i] = { position: Math.random() * canvas.height, speed: Math.random() * 3 + 1, resetProbability: Math.random() * 0.1 + 0.85 };
    }
});
