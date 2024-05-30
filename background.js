const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numbers = '0123456789';
const numberArray = [];

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.5;
        this.dx = (Math.random() - 0.5) * 2;
        this.dy = (Math.random() - 0.5) * 2;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }
    
    update() {
        this.x += this.dx;
        this.y += this.dy;
        
        if (this.x < 0 || this.x > canvas.width) this.dx = -this.dx;
        if (this.y < 0 || this.y > canvas.height) this.dy = -this.dy;
        
        this.draw();
    }
}

for (let i = 0; i < 100; i++) {
    stars.push(new Star());
}

class Number {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.value = numbers[Math.floor(Math.random() * numbers.length)];
        this.fontSize = Math.random() * 20 + 10;
        this.dy = Math.random() * 2 + 1;
    }
    
    draw() {
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillStyle = 'white';
        ctx.fillText(this.value, this.x, this.y);
    }
    
    update() {
        this.y += this.dy;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
        
        this.draw();
    }
}

for (let i = 0; i < 50; i++) {
    numberArray.push(new Number());
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => star.update());
    numberArray.forEach(number => number.update());
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
