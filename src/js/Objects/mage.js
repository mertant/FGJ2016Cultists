function Mage(x, y, spritekey) {
    this.sprite = game.add.sprite(x, y, spritekey);
    this.inventory = [];
    this.weapon = null;

    //Animations
    this.standAnim = this.sprite.animations.add("stand", [0]);
    this.runAnim = this.sprite.animations.add("run", [0, 1]);

    this.baseMovementSpeed = 240; //pixels per second

    //constants
    this.maxMovementSpeedReductionCount = 10; //how many items will at most reduce hte movement speed
    this.movementSpeedReductionFactor = 0.05; //how much each carried resource reduces from base speed
}

Mage.prototype.updateAnim = function() {
    if (this.sprite.body.velocity.x == 0 &&
        this.sprite.body.velocity.y == 0) {

        this.stand();
    } else {

        this.move();
    }
}

Mage.prototype.move = function() {
    if (this.sprite.animations.currentAnim != this.runAnim) {
        this.runAnim.play(10, true);
    }
}

Mage.prototype.stand = function() {
    if (this.sprite.animations.currentAnim != this.standAnim) {
        this.standAnim.play(10, true);
    }
}

Mage.prototype.pickUp = function(resource) {
    //picks up the given resource to the inventory
    this.inventory.push(resource);
    //resource.pickUp();
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