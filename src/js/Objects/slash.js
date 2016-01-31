function Slash(x, y, owner) {
    this.sprite = game.add.sprite(x, y, "slash");
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.x = 2;
    this.sprite.scale.y = 2;
    this.anim = this.sprite.animations.add("swing", [0, 1]);
    this.anim.play(8, false, true);

    this.destroyed = false;
    this.owner = owner;
}

Slash.prototype.destroy = function() {
    this.destroyed = true;
    this.sprite.visible = false;
}