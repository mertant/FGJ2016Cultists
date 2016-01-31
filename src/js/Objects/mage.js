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

    this.isStunned = false;
    this.stunLength = 2; //seconds

    this.stunStars = [];
    this.stunStarAngle =  0;
    this.numStunStars = 5;

    this.itemSprites = [];
    this.oldX = [];
    this.oldY = [];
    this.invisibleTailLength = 300;
    for (var i = 0; i < this.invisibleTailLength; i++){
        this.oldX.push(0);
        this.oldY.push(0);
        }

    this.miniItemUpdateCounterMax = 1;
    this.miniItemUpdateCounter = this.miniItemUpdateCounterMax;


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

    // add little following yoshi things
    var miniSprite;
    switch (resource.sprite.key) {
            case 'sulphur':
            miniSprite = 'minisulfur';
            break;
            case 'kana':
            miniSprite = 'minichicken';
            break;
            case 'mercury':
            miniSprite = 'minimercury';
            break;
            case 'skull':
            miniSprite = 'miniskull';
            break;
    }

    var miniItem = game.add.sprite(this.sprite.body.x+16,this.sprite.body.y+24, miniSprite);
    this.itemSprites.push(miniItem);
    this.oldX.unshift(this.sprite.body.x+16);
    this.oldY.unshift(this.sprite.body.y+24);
}

Mage.prototype.updateMinisprites = function() {
    for (var i = 0; i < this.itemSprites.length; i++) {
        var miniItem = this.itemSprites[i];
        miniItem.x = this.oldX[3*i];
        miniItem.y = this.oldY[3*i];
    }

    this.miniItemUpdateCounter -= 1;

    if (this.miniItemUpdateCounter <= 0) {
        this.miniItemUpdateCounter = this.miniItemUpdateCounterMax;
        this.oldX.pop();
        this.oldY.pop();
        this.oldX.unshift(this.sprite.body.x+16);
        this.oldY.unshift(this.sprite.body.y+24);
    }
}

Mage.prototype.dumpItems = function() {
    // Makes the mage drop all of their items, and returns them in an array
    var temparray = [];
    for (var i = 0; i < this.inventory.length; i++) {
        if (typeof this.itemSprites[i] === "undefined") {
            continue;
        }
        if (this.inventory[i] != null) {
            temparray.push(this.inventory[i]);
            this.itemSprites[i].destroy();
        }
    }
    this.inventory = [];
    this.itemSprites = [];
    this.oldX = [];
    this.oldY = [];
    this.invisibleTailLength = 300;
    for (var i = 0; i < this.invisibleTailLength; i++){
        this.oldX.push(0);
        this.oldY.push(0);
        }
    return temparray;
}

Mage.prototype.pickWeapon = function(weapon) {
    this.weapon = weapon;
}

Mage.prototype.useWeapon = function() {
    // Uses the weapon in the current slot and returns it.
    // Returns null if there is no weapon
    if (this.weapon != null) {
        this.weapon.use(this.sprite.x - 16, this.sprite.y - 32, this.lastDirection, this);
    }

    var temp = this.weapon;
    this.weapon = null;
    return temp;
}

Mage.prototype.getMovementSpeed = function() {
    var reduction = Math.max(Math.min(this.inventory.length, this.maxMovementSpeedReductionCount), 0);
    if (this.weapon != null) {
        reduction += 5;
    }
    var speed = this.baseMovementSpeed*(1 - this.movementSpeedReductionFactor * reduction);
    return Math.max(20, speed);
}

Mage.prototype.stun = function() {
    if (this.isStunned == true) {
        return [];
    }

    this.isStunned = true;

    for (var i = 0; i < this.numStunStars; ++i) {
        var starSprite = game.add.sprite(this.sprite.x, this.sprite.y, 'star');
        starSprite.scale.setTo(0.5, 0.5);
        starSprite.anchor.set(0.5);
        this.stunStars.push(starSprite);
    }

    //drop half of items
    var dropCount = this.inventory.length/2;

    var dropArray = this.dumpItems();

    for (var i = 0; i < dropCount; i++) {
        var temp = dropArray[0];
        dropArray.splice(0, 1);
        this.itemSprites.splice(0,1);
        this.pickUp(temp);
    }

    game.time.events.add(Phaser.Timer.SECOND * this.stunLength, this.unstun, this);

    return dropArray;
}

Mage.prototype.unstun = function() {
    if (this.isStunned == false) {
        return;
    }

    this.isStunned = false;

    for (var i = 0; i < this.numStunStars; ++i) {
        this.stunStars[i].destroy();
    }
    this.stunStars = [];
}

Mage.prototype.updateStunStars = function() {
    if (this.isStunned == false) {
        return;
    }

    this.stunStarAngle += 1.5;
    var radius = 20;
    var verticalOffset = 10;
    for (var i = 0; i < this.stunStars.length; ++i) {
        this.stunStars[i].bringToTop();
        var angle = (this.stunStarAngle - i * (360 / this.stunStars.length)) * Math.PI / 180;
        this.stunStars[i].x = this.sprite.x + radius * Math.cos(angle);
        this.stunStars[i].y = this.sprite.y + 0.5 * radius * Math.sin(angle) - verticalOffset;
    }
}
