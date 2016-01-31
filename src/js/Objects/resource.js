function Resource(x, y, resourceInfo) {
    this.sprite = game.add.sprite(x, y, resourceInfo.spriteName);

    if (resourceInfo.spriteName == "chicken") {
        this.anim = this.sprite.animations.add("kana", [0, 1, 2, 1]);
        this.anim.play(8, true);
    }

    this.collidable = false;
    // Demon improvements caused by resource
    this.speedImprovement = resourceInfo.speedImprovement;
    this.healthImprovement = resourceInfo.healthImprovement;
    this.damageImprovement = resourceInfo.damageImprovement;
    this.rangedDamageImprovement = resourceInfo.rangedDamageImprovement;

}

Resource.prototype.pick = function() {
    this.sprite.visible = false;
}

Resource.prototype.drop = function(x, y) {
    this.sprite.visible = true;
    this.sprite.x = x;
    this.sprite.y = y;
}
