function Resource(x, y, resourceInfo) {
    this.sprite = game.add.sprite(x, y, resourceInfo.spriteName);
    this.collidable = false;
    // Demon improvements caused by resource
    this.speedImprovement = resourceInfo.speedImprovement;
    this.healthImprovement = resourceInfo.healthImprovement;
    this.damageImprovement = resourceInfo.damageImprovement;
}