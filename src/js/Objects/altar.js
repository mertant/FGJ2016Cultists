function Altar(x, y) {
    this.sprite = game.add.sprite(x, y, 'altar');

    this.items = [];
}

Altar.prototype.give = function(items) {
    this.items = this.items.concat(items);
}
