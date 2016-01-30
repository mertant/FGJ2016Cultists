function Altar(x, y, img) {
    this.sprite = game.add.sprite(x, y, img);

    this.items = [];
}

Altar.prototype.give = function(items) {
    this.items = this.items.concat(items);
}
