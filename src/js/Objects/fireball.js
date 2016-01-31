function Fireball(x, y, owner, direction) {
    this.sprite = game.add.sprite(x, y, "fireball");
    game.physics.arcade.enable(this.sprite);

    this.sprite.scale.setTo(2, 2);
    this.sprite.anchor.setTo(0.5, 0.5);

    this.anim = this.sprite.animations.add("fire", [0, 1, 2, 3]);
    this.anim.play(16, true);

    this.destroyed = false;
    this.owner = owner;

    this.movementSpeed = 256;

    switch(direction) {
        case 0:
            this.sprite.body.velocity.y = -this.movementSpeed;
            this.sprite.angle = 90;
            break;
        case 1:
            this.sprite.body.velocity.x = this.movementSpeed;
            this.sprite.angle = 180;
            break;
        case 2:
            this.sprite.body.velocity.y = this.movementSpeed;
            this.sprite.angle = 270;
            break;
        case 3:
            this.sprite.body.velocity.x = -this.movementSpeed;
            break;
    }
}

Fireball.prototype.destroy = function() {
    this.destroyed = true;
    this.sprite.visible = false;
}