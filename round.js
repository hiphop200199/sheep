const sheep = document.getElementById('sheep')
const sheepBlack = document.getElementById('sheep-black')
const sheepBrown = document.getElementById('sheep-brown')
const sheepGold = document.getElementById('sheep-gold')
const sheepSilver = document.getElementById('sheep-silver')
const sunny = document.getElementById('sunny')
const rainy = document.getElementById('rainy')
const lightning = document.getElementById('lightning')
const grass = document.getElementById('grass')
// colorsHash for saving references of all created circles
export const colorsHash = {};

 export class Round{
    constructor(width,height){
        this.bubbleArray = []
        this.width = width
        this.height = height
        this.num = Math.round(Math.random()*6+2)
        this.deg = 0
        this.angle = 0
        this.totalScore = 0
        this.totalTime = 60
    }
    init(ctx){
        for(let i=0;i<this.num;i++){
            this.bubbleArray.push(new SheepBubble(this))
        }
    }
    draw(ctx){
        this.bubbleArray.forEach(b=>b.draw(ctx))
    }
    hitDraw(ctx){
        this.bubbleArray.forEach(b=>b.hitDraw(ctx))
    }
    update(deg){
        this.bubbleArray.forEach(b=>b.update(deg))
    }
}

export  class Bubble{
    constructor(round){
        this.round = round
        this.width = 50
        this.height = 50
        this.x = Math.random()*(this.round.width -  this.width)
        this.y = Math.random()*(this.round.height - this.height)
        this.dirs = [1,-1]
        this.rotates = [0,1]
        this.spins = [0,1]
        this.speed = Math.random()*1.4
        this.range = Math.random()*1.2
        this.rotate =  this.rotates[Math.round(Math.random()*(this.rotates.length -1))]
        this.spin =   this.spins[Math.round(Math.random()*(this.spins.length -1))]
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
        switch(this.spin){
            case 0:
                ctx.drawImage(this.image,this.x,this.y,this.width,this.height);     
            break;
            case 1:
                ctx.save();
                ctx.translate(this.x,this.y);
                ctx.rotate(Math.PI / 180 * this.round.angle);
                ctx.drawImage(this.image, -(this.width/2),-(this.height/2),this.width,this.height);
                ctx.restore();
        }
    }
   hitDraw(ctx){
    switch(this.spin){
        case 0:
         ctx.fillStyle=this.colorKey;     
         ctx.fillRect(this.x,this.y,this.width,this.height);
        break;
        case 1:
            ctx.save();
            ctx.translate(this.x,this.y);
            ctx.rotate(Math.PI / 180 * this.round.angle);
            ctx.fillStyle=this.colorKey;     
            ctx.fillRect(-(this.width/2),-(this.height/2),this.width,this.height);
            ctx.restore();
    }
   }
    update(deg){
      
        switch(this.rotate){
            case 0:
                this.x+=this.vx 
                break;
            case 1:
                this.x+=   this.vx * Math.cos(deg)
                break;
        }
        this.y+=this.vy * Math.sin(deg)
    }

}
export class SheepBubble extends Bubble{
    constructor(round){
        super(round)
        this.image = sheep
        this.score = 2
        this.type = 'sheep'
    }
}
export class BlackSheepBubble extends Bubble{
    constructor(round){
        super(round)
        this.image = sheepBlack
          this.score = -4
        this.type = 'sheepBlack'
    }
}
export class BrownSheepBubble extends Bubble{
    constructor(round){
        super(round)
        this.image = sheepBrown
          this.score = -2
        this.type = 'sheepBrown'
    }
}
 export class GoldSheepBubble extends Bubble{
    constructor(round){
        super(round)
        this.image = sheepGold
          this.score = 6
        this.type = 'sheepGold'
    }
}
 export class SilverSheepBubble extends Bubble{
    constructor(round){
        super(round)
        this.image = sheepSilver
          this.score = 4
        this.type = 'sheepSilver'
    }
}
 export class LightningBubble extends Bubble{
    constructor(round){
        super(round)
        this.image = lightning
        this.type = 'lightning'
    }
}
 export class SunnyBubble extends Bubble{
    constructor(round){
        super(round)
        this.image = sunny
          this.time = 6
        this.type = 'sunny'
    }
}
 export class RainyBubble extends Bubble{
    constructor(round){
        super(round)
        this.image = rainy
             this.time = -6
        this.type = 'rainy'
    }
}
 export class GrassBubble extends Bubble{
    constructor(round){
        super(round)
        this.image = grass
        this.type = 'grass'
    }
}




 