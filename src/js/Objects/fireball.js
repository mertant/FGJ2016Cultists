function Fireball() {
    this.sprite = game.add.sprite(x, y, "fireball");

    this.sprite.scale.setTo(2, 2);

    this.anim = this.sprite.animations.add("fire", [0, 1, 2, 3]);
    this.anim.play(8, true);
}

Fireball.prototype.update = function() {

}