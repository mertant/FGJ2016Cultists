function Boulder(x, y) {
    this.sprite = game.add.sprite(x, y, "rock");
    this.sprite.enableBody = true;
    game.physics.arcade.enable(this.sprite);

    this.carrying = false;
    this.flying = false;

    this.flyDirection = -1;
    this.flyStartX = -1;
    this.flyStartY = -1;

    this.tossDistance = 256;
    this.tossSpeed = 512;

    this.thrower = null;
    this.carrier = null;

    this.destroyed = false;
}

Boulder.prototype.pick = function(mage) {
    this.carrying = true;
    this.carrier = mage;
}

Boulder.prototype.use = function(x, y, direction, mage) {
    this.carrying = false;
    this.flying = true;
    this.flyDirection = direction;
    this.flyStartX = x;
    this.flyStartY = y;
    this.sprite.x = x;
    this.sprite.y = y;

    this.thrower = mage;

    this.sprite.body.velocity.x = direction % 2 == 0 ? 0 : (direction == 1 ? this.tossSpeed : -this.tossSpeed);
    this.sprite.body.velocity.y = direction % 2 == 1 ? 0 : (direction == 2 ? this.tossSpeed : -this.tossSpeed);
}

Boulder.prototype.update = function() {
    if (this.carrying && !this.flying) {
        this.sprite.x = this.carrier.sprite.x - 16;
        this.sprite.y = this.carrier.sprite.y - 32;
    } else if (this.flying) {
        this.sprite.body.drag.x = 500;
        this.sprite.body.drag.y = 500;
        if (this.flyDirection % 2 == 0) {
            if (Math.abs(this.flyStartY - this.sprite.y) > this.tossDistance) {
                this.destroy();
            }
        } else {
            if (Math.abs(this.flyStartX - this.sprite.x) > this.tossDistance) {
                this.destroy();
            }
        }
    }
}

Boulder.prototype.hit = function(other) {
    if (other.constructor.name == "Mage") {
        if (other != this.thrower) {
            //stun them
            this.destroy();
        }
    }
}

Boulder.prototype.destroy = function() {
    //TODO
    this.destroyed = true;
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    this.sprite.visible = false;
}