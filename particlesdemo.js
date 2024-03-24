//color canvas demo

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
const maxParticles = 1000;
let hue = 0;


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x : 100,
    y : 100,
};

canvas.addEventListener('click', function(event){
   mouse.x = event.x;
   mouse.y = event.y;

    for(let i = 0; i < 50; i++){
        particlesArray.push(new Particle())
    }

});

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

    for(let i = 0; i < 2; i++){
    particlesArray.push(new Particle())
    }
});



class Particle{
    constructor(){
        this.x      = mouse.x;
        this.y      = mouse.y;
        this.size   = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue}, 100%, 50%)`;
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) { this.size -= 0.01 }
    }

    draw(){
        //ctx.fillStyle = 'white';
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}


function handleParticles(){
    for( let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();


        for(let j = i; j < particlesArray.length; j++){
            //pythagorean theorem
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

            //draw line between particles
            if (dist < 100){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = 0.2//particlesArray[i].size / 10;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }

        if(particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1);
            i--;
        }
        if(particlesArray.length > maxParticles){

            particlesArray.splice(0, particlesArray.length - maxParticles)
        }
    }
}


function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = 'rgba(0,0,0,0.02)';
    //ctx.fillRect(0,0, canvas.width, canvas.height);
    handleParticles();
    hue+=2;
    console.log(particlesArray.length)
    requestAnimationFrame(animate);
}
animate();
