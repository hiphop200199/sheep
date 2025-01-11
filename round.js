const sheep = document.getElementById('sheep')
const sheepBlack = document.getElementById('sheep')
const sheepBrown = document.getElementById('sheep')
const sheepGold = document.getElementById('sheep')
const sheepSilver = document.getElementById('sheep')
const sunny = document.getElementById('sunny')
const rainy = document.getElementById('rainy')
const lightning = document.getElementById('lightning')
const grass = document.getElementById('grass')

export class Round{
    constructor(width,height){
        this.bubbleArray = []
        this.width = width
        this.height = height
        this.num = Math.round(Math.random()*6+2)
        this.deg = 0
        this.score = 0
        this.time = 60
    }
    init(ctx){
        for(let i=0;i<this.num;i++){
            this.bubbleArray.push(new SheepBubble(this))
        }
    }
    draw(ctx){
        this.bubbleArray.forEach(b=>b.draw(ctx))
    }
    update(deg){
        this.bubbleArray.forEach(b=>b.update(deg))
    }
}

export class Bubble{
    constructor(round){
        this.round = round
        this.width = 30
        this.height = 30
        this.x = Math.random()*(this.round.width -  this.width)
        this.y = Math.random()*(this.round.height - this.height)
        this.dirs = [1,-1]
        this.speed = Math.random()*5
        this.range = Math.random()*10+10
        this.vx = this.dirs[Math.round(Math.random()*(this.dirs.length -1))]*this.speed;
        this.vy =  this.dirs[Math.round(Math.random()*(this.dirs.length -1))]*this.range;
        this.colorKey = this.getRandomColor()
        colorsHash[this.colorKey] = this
    }
     getRandomColor() {
        const r = Math.round(Math.random() * 255);
        const g = Math.round(Math.random() * 255);
        const b = Math.round(Math.random() * 255);
        return `rgb(${r},${g},${b})`;
       }
    draw(ctx){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
    update(deg){
        this.x+=this.vx * Math.cos(deg)
        this.y+=this.vy * Math.sin(deg)
    }

}
export class SheepBubble extends Bubble{
    constructor(round){
        super(round)
        this.image = sheep
    }
}
export class BlackSheepBubble extends Bubble{
    constructor(){
        super(round)
        this.image = sheepBlack
    }
}
export class BrownSheepBubble extends Bubble{
    constructor(){
        super(round)
        this.image = sheepBrown
    }
}
export class GoldSheepBubble extends Bubble{
    constructor(){
        super(round)
        this.image = sheepGold
    }
}
export class SilverSheepBubble extends Bubble{
    constructor(){
        super(round)
        this.image = sheepSilver
    }
}
export class LightningBubble extends Bubble{
    constructor(){
        super(round)
        this.image = lightning
    }
}
export class SunnyBubble extends Bubble{
    constructor(){
        super(round)
        this.image = sunny
    }
}
export class RainyBubble extends Bubble{
    constructor(){
        super(round)
        this.image = rainy
    }
}
export class GrassBubble extends Bubble{
    constructor(){
        super(round)
        this.image = grass
    }
}
// colorsHash for saving references of all created circles
const colorsHash = {};



function game(timeStamp){
    ctx.clearRect(0, 0, canvas.width,canvas.height);
   round.deg+=0.05
   round.update(round.deg)
   round.draw(ctx)
   round.draw(hitCtx)
   gameFrame = requestAnimationFrame(game)
}