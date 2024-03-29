import Player from "./Player.js";
import World from "./world/World.js";
import * as tools from "./tools.js";

class Loot {
    spriteSource = "data/loot.png";
    width = 12;
    height = 12;
    
    loopWaiter = 0;

    slidingSpeed = .5;
    pickingSpeed = 1.4;
    rangeToPickUp = 20;
    targetPosition = {
        x: 0,
        y: 0
    }

    constructor(position) {
        this.sprite = new Image();
        this.sprite.src = this.spriteSource;
        this.x = position.x;
        this.y = position.y;

        this.findTargetPosition();
        this.state = "sliding";

        World.loots.push(this);
        World.allSprites.push(this);
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        }
    }

    updateState() {
        switch(this.state) {
            case "put" :
                if(tools.getDistanceFromPlayer(this.getPosition()) < this.rangeToPickUp)
                    this.state = "picked";
                break;

            case "sliding" :
                if(this.loopWaiter >= 24) {
                    this.state = "put";
                    this.loopWaiter = 0;
                }
                else {
                    tools.moveTo(this, this.targetPosition, this.slidingSpeed);
                    this.loopWaiter ++;
                }
                break;

            case "picked" :
                if(tools.getDistanceFromPlayer(this.getPosition()) < 4) { // Supprime l'instance
                    World.loots.splice(World.loots.indexOf(this), 1);
                    World.allSprites.splice(World.allSprites.indexOf(this), 1);
        
                    tools.deleteObject(this);
                }
                else {
                    tools.moveTo(this, Player.getPosition(), this.pickingSpeed);
                    this.loopWaiter ++;
                }
                break;
        }
    }

    findTargetPosition() {
        this.targetPosition.x = Math.floor(Math.random() * 100 - 50) + this.x;
        this.targetPosition.y = Math.floor(Math.random() * 100 - 50) + this.y;
    }
}

class Cobweb extends Loot {
    sX = 0;
    sY = 0;
}

export { Cobweb };