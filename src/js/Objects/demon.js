function Demon(x, y, spritekeys) {
    this.sprite = game.add.sprite(x, y, spritekeys[0]);

    game.physics.arcade.enable(this.sprite);

    this.wingStrength = 0; //0 tai 1 tai 2
    this.hornStrength = 0; //0 tai 1 tai 2
    this.weaponStrength = 0; //0 tai 1 tai 2
    this.armorStrength = 0; //0 tai 1 tai 2

    this.sprite.smoothed = false;
    this.sprite.scale.x = 2;
    this.sprite.scale.y = 2;
    this.sprite.alpha = 0.5;

    this.wingsSprite = game.add.sprite(x, y, spritekeys[1]);
    this.wingsSprite.smoothed = false;
    this.wingsSprite.scale.x = 2;
    this.wingsSprite.scale.y = 2;

    this.hornsSprite = game.add.sprite(x, y, spritekeys[1]);
    this.hornsSprite.smoothed = false;
    this.hornsSprite.scale.x = 2;
    this.hornsSprite.scale.y = 2;

    this.weaponSprite = game.add.sprite(x, y, spritekeys[1]);
    this.weaponSprite.smoothed = false;
    this.weaponSprite.scale.x = 2;
    this.weaponSprite.scale.y = 2;

    this.armorSprite = game.add.sprite(x, y, spritekeys[1]);
    this.armorSprite.smoothed = false;
    this.armorSprite.scale.x = 2;
    this.armorSprite.scale.y = 2;

    this.wholeGroup = game.add.group();
    this.wholeGroup.add(this.sprite);
    this.wholeGroup.add(this.wingsSprite);
    this.wholeGroup.add(this.hornsSprite);
    this.wholeGroup.add(this.weaponSprite);
    this.wholeGroup.add(this.armorSprite);
    this.wholeGroup.visible = false;

    this.yOffsetData = [
        [0, 1, 2, 1],
        [0, 1, 0, 1],
        [0, 0, 2, 0]
    ]

    //[front items, back items, side items]
    this.wingindexlist = [
        [
            {index: 1, anchor: [0.49, 0.49]},
            {index: 5, anchor: [0.49, 0.49]},
            {index: 10, anchor: [0.49, 0.49]}
        ],
        [
            {index: 14, anchor: [0.50, 0.48]},
            {index: 18, anchor: [0.50, 0.48]},
            {index: 22, anchor: [0.50, 0.48]}
        ],
        [
            {index: 28, anchor: [0.50, 0.5]},
            {index: 32, anchor: [0.50, 0.5]},
            {index: 36, anchor: [0.50, 0.5]}
        ],
    ];
    this.hornindexlist = [
        [
            {index: 2, anchor: [0.49, 0.50]},
            {index: 6, anchor: [0.49, 0.50]},
            {index: 9, anchor: [0.50, 0.51]}
        ],
        [
            {index: 15, anchor: [0.50, 0.52]},
            {index: 19, anchor: [0.50, 0.51]},
            {index: 23, anchor: [0.50, 0.51]}
        ],
        [
            {index: 27, anchor: [0.50, 0.51]},
            {index: 31, anchor: [0.50, 0.51]},
            {index: 35, anchor: [0.49, 0.51]}
        ],
    ];
    this.weaponindexlist = [
        [
            {index: 3, anchor: [0.49, 0.50]},
            {index: 7, anchor: [0.49, 0.50]},
            {index: 12, anchor: [0.50, 0.51]}
        ],
        [
            {index: 17, anchor: [0.51, 0.52]},
            {index: 21, anchor: [0.50, 0.51]},
            {index: 25, anchor: [0.50, 0.51]}
        ],
        [
            {index: 29, anchor: [0.50, 0.51]},
            {index: 33, anchor: [0.50, 0.51]},
            {index: 38, anchor: [0.49, 0.51]}
        ],
    ];
    this.armorindexlist = [
        [
            {index: 4, anchor: [0.49, 0.50]},
            {index: 8, anchor: [0.49, 0.50]},
            {index: 11, anchor: [0.50, 0.51]}
        ],
        [
            {index: 16, anchor: [0.51, 0.52]},
            {index: 20, anchor: [0.50, 0.51]},
            {index: 24, anchor: [0.50, 0.51]}
        ],
        [
            {index: 30, anchor: [0.50, 0.51]},
            {index: 34, anchor: [0.50, 0.51]},
            {index: 37, anchor: [0.49, 0.51]}
        ],
    ];

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
    this.wingsSprite.frame = wingAnimSet.index;
    this.wingsSprite.anchor.setTo(wingAnimSet.anchor[0],
                                  wingAnimSet.anchor[1]);
    this.wingsSprite.x = this.sprite.x;
    this.wingsSprite.y = this.sprite.y + this.getYOffset()*2;

    var hornAnimSet = this.hornindexlist[animSetIndex][this.hornStrength];
    this.hornsSprite.frame = hornAnimSet.index;
    this.hornsSprite.anchor.setTo(hornAnimSet.anchor[0],
                                  hornAnimSet.anchor[1]);
    this.hornsSprite.x = this.sprite.x;
    this.hornsSprite.y = this.sprite.y + this.getYOffset()*2;

    var weaponAnimSet = this.weaponindexlist[animSetIndex][this.weaponStrength];
    this.weaponSprite.frame = weaponAnimSet.index;
    this.weaponSprite.anchor.setTo(weaponAnimSet.anchor[0],
                                  weaponAnimSet.anchor[1]);
    this.weaponSprite.x = this.sprite.x;
    this.weaponSprite.y = this.sprite.y + this.getYOffset()*2;

    var armorAnimSet = this.armorindexlist[animSetIndex][this.armorStrength];
    this.armorSprite.frame = armorAnimSet.index;
    this.armorSprite.anchor.setTo(armorAnimSet.anchor[0],
                                  armorAnimSet.anchor[1]);
    this.armorSprite.x = this.sprite.x;
    this.armorSprite.y = this.sprite.y + this.getYOffset()*2;


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

Demon.prototype.getYOffset = function() {
    var index = this.getAnimationSetIndex();

    return this.yOffsetData[index][this.sprite.frame%4];
}
