function Demon(x, y, spritekey) {
    this.sprite = game.add.sprite(x, y, spritekey);

    this.lastDirection = 2;
    this.directions = {
      UP: 0,
      RIGHT: 1,
      DOWN: 2,
      LEFT: 3
    }

    this.baseMovementSpeed = 160; //pixels per second
}

Mage.prototype.getMovementSpeed = function() {
    return this.baseMovementSpeed;
}
