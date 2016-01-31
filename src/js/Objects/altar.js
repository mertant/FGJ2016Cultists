function Altar(x, y, img) {
    this.sprite = game.add.sprite(x, y, img);

    this.items = [];
    this.orbs = [];
    this.orbsAngle = 0;

    var color = null;
    var dropimg = null;

    if (img == 'blueAltar') {
        this.color = 'blue';
        this.dropimg = 'drop2';
    }
    else {
        this.color = 'red';
        this.dropimg = 'drop'
        }
}

Altar.prototype.give = function(items) {
    for (var i = this.orbs.length; i < this.items.length; i++) {
        orb = game.add.sprite(this.sprite.x,this.sprite.y+64,this.dropimg);
        this.orbs.push(orb);
    }

    this.items = this.items.concat(items);
}

Altar.prototype.statsum = function() {
    var totalspeedimprov = 0
    var totalhealthimprov = 0
    var totaldamageimprov = 0
    var totalrangedimprov = 0
    for (var i = 0; i < this.items.length; i++) {
      totalspeedimprov += this.items[i].speedImprovement
      totalhealthimprov += this.items[i].healthImprovement
      totaldamageimprov += this.items[i].damageImprovement
      totalrangedimprov += this.items[i].rangedDamageImprovement
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
