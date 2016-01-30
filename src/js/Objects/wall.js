function Wall(x, y) {
    this.sprite = game.add.sprite(x, y, 'boulder');
    this.collidable = true;
}
