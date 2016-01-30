function Demon(x, y, spritekeys) {
    this.sprite = game.add.sprite(x, y, spritekeys[0]);

    game.physics.arcade.enable(this.sprite);

    this.sprite.smoothed = false;
    this.sprite.scale.x = 2;
    this.sprite.scale.y = 2;

    this.sprite.alpha = 0.5;
    this.wingssprite = game.add.sprite(x, y, spritekeys[1]);

    this.wingssprite.smoothed = false;
    this.wingssprite.scale.x = 2;
    this.wingssprite.scale.y = 2;
    //this.hornssprite = game.add.sprite(x, y, spritekeys[1]);
    //this.weaponsprite = game.add.sprite(x, y, spritekeys[1]);
    //this.armorsprite = game.add.sprite(x, y, spritekeys[1]);

    this.wholeGroup = game.add.group();
    console.log(this.wholeGroup);
    this.wholeGroup.add(this.sprite);
    this.wholeGroup.add(this.wingssprite);
    this.wholeGroup.visible = false;

    //[front items, back items, side items]
    this.wingindexlist = [
        [   
            {index: 1, anchor: [0.55, 0.6]}, 
            {index: 5, anchor: [0.55, 0.6]}, 
            {index: 10, anchor: [0.55, 0.6]}
        ],
        [   
            {index: 14, anchor: [0.55, 0.6]}, 
            {index: 18, anchor: [0.55, 0.6]}, 
            {index: 22, anchor: [0.55, 0.6]}
        ],
        [   
            {index: 28, anchor: [0.55, 0.6]}, 
            {index: 33, anchor: [0.55, 0.6]}, 
            {index: 36, anchor: [0.55, 0.6]}
        ],
    ];
    this.wingStrength = 0; //tai 1 tai 2
    //muille vastaava

    this.lastDirection = 2;
    this.directions = {
        UP: 0,
        RIGHT: 1,
        DOWN: 2,
        LEFT: 3
    }

    this.baseMovementSpeed = 160; //pixels per second

    //TODO select correct frames
    this.runDownAnim = this.sprite.animations.add("runDown", [0, 1, 2, 3]);
    this.runHorizontalAnim = this.sprite.animations.add("runHorizontal", [8, 9, 10]);
    this.runUpAnim = this.sprite.animations.add("runUp", [4, 5, 6, 7]);
}

Demon.prototype.updateAnim = function() {

    var animSetIndex = this.getAnimationSetIndex();

    var wingAnimSet = this.wingindexlist[animSetIndex][this.wingStrength];
    this.wingssprite.frame = wingAnimSet.index;
    this.wingssprite.anchor.setTo(wingAnimSet.anchor[0],
                                  wingAnimSet.anchor[1]);
    this.wingssprite.x = this.sprite.x;
    this.wingssprite.y = this.sprite.y;

    //TODO lopuille


    //ja lopuksi tämä
    switch(this.lastDirection) {
        case this.directions.UP:
            this.moveUp();
            break;
        case this.directions.DOWN:
            this.moveDown();
            break;
        case this.directions.LEFT:
            this.moveHorizontal();
            break;
        case this.directions.RIGHT:
            this.moveHorizontal();
            break;
    }
}

Demon.prototype.start = function() {
    this.wholeGroup.visible = true;
}

Demon.prototype.moveUp = function() {
    if (this.sprite.animations.currentAnim != this.runUpAnim) {
        this.runUpAnim.play(10, true);
    }
}

Demon.prototype.moveDown = function() {
    if (this.sprite.animations.currentAnim != this.runDownAnim) {
        this.runDownAnim.play(10, true);
    }
}

Demon.prototype.moveHorizontal = function() {
    if (this.sprite.animations.currentAnim != this.runHorizontalAnim) {
        this.runHorizontalAnim.play(10, true);
    }
}

Demon.prototype.getMovementSpeed = function() {
    return this.baseMovementSpeed;
}

Demon.prototype.getAnimationSetIndex = function() {
    if (this.lastDirection == 2) {
        return 0;
    } else if (this.lastDirection == 0) {
        return 1;
    } else {
        return 2;
    }
}