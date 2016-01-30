function Mage(x, y, spritekey) {
    this.sprite = game.add.sprite(x, y, spritekey);
    this.inventory = [];
    this.weapon = null;

    this.lastDirection = 2;
    this.directions = {
      UP: 0,
      RIGHT: 1,
      DOWN: 2,
      LEFT: 3
    }

    //Animations
    this.standDownAnim = this.sprite.animations.add("standDown", [0, 0, 0, 1]);
    this.runDownAnim = this.sprite.animations.add("runDown", [2, 3]);
    this.throwDownAnim = this.sprite.animations.add("throwDown", [4]);
    this.standHorizontalAnim = this.sprite.animations.add("standHorizontal", [5, 5, 5, 6]);
    this.runHorizontalAnim = this.sprite.animations.add("runHorizontal", [7, 8]);
    this.throwHorizontalAnim = this.sprite.animations.add("throwHorizontal", [9]);
    this.standUpAnim = this.sprite.animations.add("standUp", [10, 10, 10, 11]);
    this.runUpAnim = this.sprite.animations.add("runUp", [12, 13]);
    this.throwUpAnim = this.sprite.animations.add("throwUp", [14]);

    this.baseMovementSpeed = 160; //pixels per second

    //constants
    this.maxMovementSpeedReductionCount = 10; //how many items will at most reduce hte movement speed
    this.movementSpeedReductionFactor = 0.05; //how much each carried resource reduces from base speed
}

Mage.prototype.updateAnim = function() {
    if (this.sprite.body.velocity.x == 0 &&
        this.sprite.body.velocity.y == 0) {
        switch(this.lastDirection) {
            case this.directions.UP:
                this.standUp();
                break;
            case this.directions.DOWN:
                this.standDown();
                break;
            case this.directions.LEFT:
                this.standHorizontal();
                break;
            case this.directions.RIGHT:
                this.standHorizontal();
                break;
            default:
                this.standDown();
        }
    } else {
      switch(this.lastDirection) {
          case this.directions.UP:
              this.moveUp();
              break;
          case this.directions.DOWN:
              this.moveDown();
              break;
          case this.directions.LEFT:
              this.moveHorizontal();
              break;
          case this.directions.RIGHT:
              this.moveHorizontal();
              break;
          default:
              this.standDown();
      }
    }
}

Mage.prototype.moveUp = function() {
    if (this.sprite.animations.currentAnim != this.runUpAnim) {
        this.runUpAnim.play(10, true);
    }
}

Mage.prototype.moveDown = function() {
    if (this.sprite.animations.currentAnim != this.runDownAnim) {
        this.runDownAnim.play(10, true);
    }
}

Mage.prototype.moveHorizontal = function() {
    if (this.sprite.animations.currentAnim != this.runHorizontalAnim) {
        this.runHorizontalAnim.play(10, true);
    }
}

Mage.prototype.standDown = function() {
    if (this.sprite.animations.currentAnim != this.standDownAnim) {
        this.standDownAnim.play(4, true);
    }
}

Mage.prototype.standUp = function() {
    if (this.sprite.animations.currentAnim != this.standUpAnim) {
        this.standUpAnim.play(4, true);
    }
}

Mage.prototype.standHorizontal = function() {
    if (this.sprite.animations.currentAnim != this.standHorizontalAnim) {
        this.standHorizontalAnim.play(4, true);
    }
}

Mage.prototype.pickUp = function(resource) {
    //picks up the given resource to the inventory
    this.inventory.push(resource);
}

Mage.prototype.dumpItems = function() {
    // Makes the mage drop all of their items, and returns them in an array
    var temparray = [];
    for (var i = 0; i < this.inventory.length; i++) {
        if (this.inventory[i] != null) {
            temparray.push(this.inventory[i]);
        }
    }
    this.inventory = [];
    return temparray;
}

Mage.prototype.useWeapon = function() {
    // Uses the weapon in the current slot and returns it.
    // Returns null if there is no weapon
    if (this.weapon != null) {
        this.weapon.use();
    }

    var temp = this.weapon;
    this.weapon = null;
    return temp;
}

Mage.prototype.getMovementSpeed = function() {
    var reduction = Math.max(Math.min(this.inventory.length, this.maxMovementSpeedReductionCount), 0);
    var speed = this.baseMovementSpeed*(1 - this.movementSpeedReductionFactor * reduction);
    return Math.max(20, speed);
}
