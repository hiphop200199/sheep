import * as r from "./round.js";
//變數宣告
const TIME_TO_END_ANIMATION = 4000;
const TIME_TO_START_GAME = 2000;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const hitCanvas = document.getElementById("hit-canvas");
const hitCtx = hitCanvas.getContext("2d",{ willReadFrequently: true });
console.log( hitCtx.getContextAttributes());


const logoImage = document.getElementById("logo-image");
const BGM = new Audio("music/nature.mp3");
const dingSFX = new Audio("sfx/ding.mp3");
const popSFX = new Audio("sfx/pop.mp3");
const whistleSFX = new Audio("sfx/whistle.mp3");
const BGMcontrol = document.getElementById("BGM-control");
let page = document.getElementById("page");
let start = document.getElementById("start");
let entryComponents = document.querySelectorAll(".entry-components");
let scoreTitle = document.getElementById("score-title");
let timeTitle = document.getElementById("time-title");
let logoAnimation;
let gameAnimation;
let round;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
hitCanvas.width = window.innerWidth;
hitCanvas.height = window.innerHeight;
BGM.volume = 0.5;
BGM.loop = true;

let timer = 0
let timeSpawnNewBubble = 1000
let lastTime = 0 

//mylogo
//用來生成一個個粒子
class Particle {
  constructor(effect, x, y, color) {
    this.effect = effect;
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.originX = x;
    this.originY = y;
    this.color = color;
    this.size = this.effect.gap;
    this.vx = 0;
    this.vy = 0;
    this.ease = 0.085;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  update() {
    this.x += (this.originX - this.x) * this.ease;
    this.y += (this.originY - this.y) * this.ease;
  }
}
//用來一次同時操作所有粒子而形成效果
class Effect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.image = logoImage;
    this.particleArray = [];
    this.centerX = this.width * 0.5;
    this.centerY = this.height * 0.5;
    this.gap = 1;
    this.x = this.centerX - this.image.width * 0.25;
    this.y = this.centerY - this.image.height * 0.25;
  }
  init(ctx) {
    ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.image.width * 0.5,
      this.image.height * 0.5
    );
    const pixels = ctx.getImageData(0, 0, this.width, this.height).data;
    for (let y = 0; y < this.height; y += this.gap) {
      for (let x = 0; x < this.width; x += this.gap) {
        const index = (y * this.width + x) * 4;
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const alpha = pixels[index + 3];
        const color = "rgb(" + red + "," + green + "," + blue + ")";
        if (alpha > 0)
          this.particleArray.push(new Particle(effect, x, y, color));
      }
    }
  }
  draw(ctx) {
    this.particleArray.forEach((particle) => particle.draw(ctx));
  }
  update() {
    this.particleArray.forEach((particle) => particle.update());
  }
}
//運作開頭logo動畫
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.draw(ctx);
  effect.update();
  logoAnimation = requestAnimationFrame(animate);
}
//結束動畫並進場
function cancelAnimationAndShowIndexPage() {
  setTimeout(function () {
    cancelAnimationFrame(logoAnimation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    page.style.display = "flex";
  }, TIME_TO_END_ANIMATION);
}
//用按鈕讓使用者控制音樂播放
function toggleBGM(event) {
  if (event.cancelable) event.preventDefault();
  BGM.paused ? BGM.play() : BGM.pause();
}
 function game(timeStamp){
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0, 0, canvas.width,canvas.height);
    hitCtx.clearRect(0,0,canvas.width,canvas.height);
  
    if(timer >=timeSpawnNewBubble){
        console.log(round.time);
        if(round.time==0){
            cancelAnimationFrame(gameAnimation)
            ctx.clearRect(0, 0, canvas.width, canvas.height);
           hitCtx.clearRect(0, 0, canvas.width, canvas.height);
           BGM.pause()
            whistleSFX.play()
           return
        }
     
        let rand = Math.random()
        if(rand < 0.01) round.bubbleArray.push(new r.LightningBubble(round))
        else if(rand >=0.01 && rand < 0.05) round.bubbleArray.push(new r.BlackSheepBubble(round))
        else if(rand >=0.05 && rand < 0.10) round.bubbleArray.push(new r.BrownSheepBubble(round))
        else if(rand >=0.10 && rand < 0.12) round.bubbleArray.push(new r.SunnyBubble(round))
        else if(rand >=0.12 && rand < 0.14) round.bubbleArray.push(new r.RainyBubble(round))
        else if(rand >=0.14 && rand < 0.74) round.bubbleArray.push(new r.SheepBubble(round))
        else if(rand >=0.74 && rand < 0.84) round.bubbleArray.push(new r.SilverSheepBubble(round))
        else if(rand >=0.84 && rand < 0.9) round.bubbleArray.push(new r.GoldSheepBubble(round))
        else round.bubbleArray.push(new r.GrassBubble(round))
    round.time--
  
        timer = 0
        
    }else{
        timer+=deltaTime
   
        
    }
    round.bubbleArray.forEach((b,i )=> {
        if(b.x > round.width || b.x < 0 || b.y > round.height || b.y <0){
            delete r.colorsHash[b.colorKey]
            round.bubbleArray.splice(i,1)
        }
    });
   round.deg+=0.03
   round.angle++
   round.update(round.deg)
   round.draw(ctx)
   round.hitDraw(hitCtx)
   gameAnimation = requestAnimationFrame(game)
}
canvas.addEventListener('click',function(e){
    const mousePos = {
        x:e.clientX - canvas.offsetLeft,
        y:e.clientY - canvas.offsetTop
    }
    const pixel = hitCtx.getImageData(mousePos.x,mousePos.y,1,1);
    const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    const shape = r.colorsHash[color];
    console.log(shape);
    
    if(shape){
        popSFX.pause()
        popSFX.currentTime =0
        popSFX.play()
    }
})
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    hitCanvas.width = window.innerWidth;
    hitCanvas.height = window.innerHeight;
})
BGMcontrol.addEventListener("click", toggleBGM);
start.addEventListener("click", function () {
  dingSFX.pause();
  dingSFX.currentTime = 0;
  dingSFX.play();
  setTimeout(() => {
    entryComponents.forEach((e) => {
      e.classList.add("hide");
    });
    scoreTitle.classList.remove("hide");
    timeTitle.classList.remove("hide");
    BGMcontrol.classList.remove("hide");
    BGM.play();
    round = new r.Round(canvas.width, canvas.height);
    round.init(ctx);
   game(0)
  }, TIME_TO_START_GAME);
});

const effect = new Effect(canvas.width, canvas.height);
effect.init(ctx);
animate();
cancelAnimationAndShowIndexPage();
