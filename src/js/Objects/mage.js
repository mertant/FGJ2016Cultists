function Mage(x, y, spritekey) {
    this.sprite = game.add.sprite(x, y, spritekey);
    this.inventory = [null, null, null];

    //Animations
    this.standAnim = this.sprite.animations.add("stand", [0]);
    this.runAnim = this.sprite.animations.add("run", [0, 1]);

    this.standAnim.onStart.add(function() {
        console.log("start stand");
    }, this);
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
        this.standAnim.play(1, true);
    }
}