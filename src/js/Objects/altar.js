function Altar(x, y, img) {
    this.sprite = game.add.sprite(x, y, img);

    this.items = [];
    this.orbs = [];
    this.orbsAngle = 0;
}

Altar.prototype.give = function(items) {
    this.items = this.items.concat(items);

    for (var i = this.orbs.length; i < this.items.length; i++) {
        orb = game.add.sprite(this.sprite.x,this.sprite.y+64,'stoneblod');
        this.orbs.push(orb);
    }
}

Altar.prototype.update = function() {
    radius = 32+8;
    altarOffset = 32;
    particleOffset = -4;

    this.orbsAngle += 1.5;

    for (var i = 0; i < this.orbs.length; i++) {
        ang = (this.orbsAngle-i*(360/this.orbs.length))*Math.PI/180;
        this.orbs[i].x = this.sprite.x + altarOffset + particleOffset + radius*Math.cos(ang);
        this.orbs[i].y = this.sprite.y + altarOffset + particleOffset + radius*Math.sin(ang);
    }
}
