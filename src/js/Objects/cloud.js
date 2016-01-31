function Cloud(x, y) {
    this.sprite = game.add.sprite(x, y, "cloud");

    this.anim = this.sprite.animations.add("poof", [0, 1, 2, 3, 4, 5, 6, 7]);
    this.anim.play(8, false, true);
}