function Wall(x, y) {
    this.sprite = game.add.sprite(x, y, 'rock');
    this.collidable = true;
}
