//變數宣告
const TIME_TO_END_ANIMATION = 4000;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const logoImage = document.getElementById("logo-image");
const BGM = new Audio('music/nature.mp3');
const dingSFX = new Audio('sfx/ding.mp3');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
BGM.volume = 0.7;
BGM.loop = true;

//mylogo
//用來生成一個個粒子
class Particle{
    constructor(effect,x,y,color) {
        this.effect=effect;
        this.x=Math.random()*this.effect.width;
        this.y=Math.random()*this.effect.height;
        this.originX =x;
        this.originY=y;
        this.color=color;
        this.size=this.effect.gap;
        this.vx=0;
        this.vy=0;
        this.ease=0.085;
    }
    draw(ctx){
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }
    update(){
        this.x+=(this.originX - this.x)*this.ease;
        this.y+=(this.originY - this.y)*this.ease;
    }
}
//用來一次同時操作所有粒子而形成效果
class Effect{
    constructor(width,height) {
        this.width=width;
        this.height=height;
        this.image = logoImage;
        this.particleArray=[];
        this.centerX = this.width * 0.5;
        this.centerY = this.height * 0.5;
        this.gap = 1;
        this.x = this.centerX - this.image.width*0.25;
        this.y = this.centerY - this.image.height*0.25;
    }
    init(ctx){
        ctx.drawImage(this.image,this.x,this.y,this.image.width*0.5,this.image.height*0.5);
        const pixels = ctx.getImageData(0,0,this.width,this.height).data;
        for(let y=0;y<this.height;y+=this.gap){
            for(let x=0;x<this.width;x+=this.gap){
                const index = (y*this.width+x)*4;
                const red = pixels[index];
                const green = pixels[index+1];
                const blue = pixels[index+2];
                const alpha = pixels[index+3];
                const color = 'rgb('+red+','+green+','+blue+')';
                if(alpha>0)this.particleArray.push(new Particle(effect,x,y,color));      
            }
        }
    }
    draw(ctx){
        this.particleArray.forEach(particle => particle.draw(ctx));
       
    }
    update(){
        this.particleArray.forEach(particle => particle.update());
    }
}
//運作開頭logo動畫
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    effect.draw(ctx);
    effect.update();
    logoAnimation = requestAnimationFrame(animate);
}
//用按鈕讓使用者控制音樂播放
function toggleBGM(event){
    if (event.cancelable) event.preventDefault();
    BGM.paused?BGM.play():BGM.pause();
}


const effect = new Effect(canvas.width,canvas.height);
effect.init(ctx);
animate();