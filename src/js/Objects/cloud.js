function Cloud(x, y, s) {
    this.sprite = game.add.sprite(x, y, "cloud");
    this.sprite.scale.setTo(s, s);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.anim = this.sprite.animations.add("poof", [0, 1, 2, 3, 4, 5, 6, 7]);
    this.anim.play(8, false, true);
    this.sprite.bringToTop();
}
