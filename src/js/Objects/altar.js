function Altar(x, y, img) {
    this.sprite = game.add.sprite(x, y, img);

    this.items = [];
    this.orbs = [];
    this.orbsAngle = 0;
}

Altar.prototype.give = function(items) {
    this.items = this.items.concat(items);

    for (var i = this.orbs.length; i < this.items.length; i++) {
        orb = game.add.sprite(this.sprite.x,this.sprite.y+64,'orb');
        this.orbs.push(orb);
    }
}

Altar.prototype.update = function() {
    //this.items = this.items.concat(items);

    this.orbsAngle += 10;
    for (var i = 0; i < this.orbs.length; i++) {
        ang = (this.orbsAngle+10*i)/180;
        this.orbs[i].x = this.sprite.x + 32*Math.cos(ang);
        this.orbs[i].y = this.sprite.y + 32*Math.sin(ang);
        console.log(this.orbsAngle);
        console.log(ang);
    }
}
