function Resource(x, y, resourceInfo) {
    this.sprite = game.add.sprite(x, y, resourceInfo.spriteName);
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
    console.log("ah shit i've fallen");
    this.sprite.visible = true;
    this.sprite.x = x;
    this.sprite.y = y;
}
