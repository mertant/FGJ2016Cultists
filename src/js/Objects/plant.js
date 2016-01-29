
function Plant(seed) {
    this.seed = seed;

    this.root = new Stem(seed.x, seed.y, Math.PI/2, 13, true);
    this.growthStem = this.root;

    this.energy = 3;
    this.newStemTimer = 12;

    this.image = game.add.bitmapData(1600, 2400);
    this.image.addToWorld();

    this.traverseStem = null;
    this.traverseSpot = 0;

    this.growing = false;

    this.blobSprite = game.add.sprite(-100, -100, "blob2spr");
    this.blobSprite.anchor.set(0.5);
    this.blobSprite.scale.set(0.3);
}

Plant.prototype.strengthen = function() {
    //make stems thicker - spends energy
}

Plant.prototype.strengthenTraversed = function(amount) {
    this.traverseStem.strengthen(amount);
    this.growthStem = this.traverseStem;
    this.render(true);
}

Plant.prototype.grow = function(cost) {
    //lengthen current growing stem
    this.energy -= this.growthStem.grow(cost, this.image);
}

Plant.prototype.newStem = function(oldstem, position, side) {
    side = typeof side !== 'undefined' ? side : null;
    var spot = position;
    var coords = oldstem.getCoords(spot);
    var newStem = new Stem(coords[0], coords[1], oldstem.getDirAt(spot), oldstem.getStrengthAt(position), true);
    
    /*if (side === null) {
        side = Math.round(Math.random())*2-1;
    }*/
    oldstem.addStem(newStem, spot, side);

    //oldstem = newStem;
    return newStem;
}

Plant.prototype.render = function(full) {
    //draw all locked stems fully
    //draw the growing stems gradually

    this.growthStem.drawOn(this.image, full);
}

Plant.prototype.getSurfaced = function(height) {
    var leaf = this.growthStem.getLeaf();
    if (leaf[1] < height) {
        return true;
    }
    return false;
}

Plant.prototype.startGrowing = function() {
    this.growing = true;
}

Plant.prototype.stopGrowing = function() {
    this.growing = false;
    if (this.growthStem.currentTween !== null) {
        this.growthStem.currentTween.onComplete.add(function() {
            this.growthStem.doneDrawing = true;
        }, this);
    }

}

Plant.prototype.startTraverse = function(stem, index) {
    this.traverseStem = stem;
    this.traverseStem.traverseIndex = index;
}

Plant.prototype.traverse = function() {
    //increment traverse index of the traverse stem
    if (this.traverseStem == null) {
        return -1;
    }
    var spot = this.traverseStem.traverse(this, 0.3);
    this.traverseSpot = spot;
    if (spot != -1) {
        var coords = this.traverseStem.getCoords(spot);
        this.blobSprite.x = coords[0];
        this.blobSprite.y = coords[1];
    } else {
        this.stopTraverse();
    }

    return spot;
}

Plant.prototype.stopTraverse = function() {
    this.blobSprite.x = -100;
    this.blobSprite.y = -100;
}

Plant.prototype.hasNoEnergy = function() {
    return this.energy <= 0;
}

Plant.prototype.getTraverseCoords = function() {
    return this.traverseStem.getCoords(this.traverseSpot);
}

Plant.prototype.getStemNear = function(spot) {
    //called during traverse
    if (this.traverseStem == null) {
        return null;
    }
    for (var key in this.traverseStem.children) {
        var travspot = this.traverseStem.getCoords(key);
        var dx = travspot[0] - spot[0];
        var dy = travspot[1] - spot[1];
        var dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 30)
            return this.traverseStem.children[key];
    }
    return null;
}




// Stems

// A stem can have N children, which extrude from the stem at any index of the path array.

function Stem(x, y, dir, str, grow) {
    this.parts = { "x" : [x], "y" : [y] };
    this.growDirection = dir;

    // Basically the width of the stem, but a max cap
    this.strength = Math.min(12, str);
    this.thinning = 0.45;
    this.minStrength = 2;

    this.children = { };
    this.parent = null;

    this.texture = new Image(game, 0, 0, "trunkspr");
    this.texture.scale = 0.2;

    this.sprite = game.make.sprite(0, 0, "trunkspr");
    this.sprite.anchor.set(0.5);

    this.path = [];
    this.strengths = [];
    this.dirs = [];

    this.growthDrawIndex = {"index" : 0};

    this.currentTween = null;
    this.tweenTarget = 0;

    this.growing = grow;
    this.doneDrawing = false;
    this.markedForFullDraw = false;

    this.traverseIndex = 0;
}

Stem.prototype.strengthen = function(add) {
    this.strength += add;
    for (var i = 0; i < this.strengths.length; i++) {
        this.strengths[i] += add;
    }
    this.markedForFullDraw = true;
}

Stem.prototype.grow = function(cost, bmd) {
    //bmd.clear();

    //only for stems that have no children

    this.growing = true;

    var cur = this.getLeaf();
    var growthLength = 40;//Math.floor(Math.random()*30 + 20);

    cur[0] += Math.cos(this.growDirection) * growthLength;
    cur[1] -= Math.sin(this.growDirection) * growthLength;

    this.parts.x.push(cur[0]);
    this.parts.y.push(cur[1]);

    var oldPathLength = this.path.length;

    //calculate the path again
    this.path = [];

    var x = 1 / parseFloat(10*this.parts.x.length); //resolution of the interpolation
    for (var i = 0; i <= 1; i+= x) { //modify the limit to adjust the length of the stem on screen
        var px = game.math.catmullRomInterpolation(this.parts.x, i);
        var py = game.math.catmullRomInterpolation(this.parts.y, i);

        this.path.push( { x: px, y: py });
    }

    this.strength -= this.thinning;
    this.strength = Math.max(this.minStrength, this.strength);

    //Store strength for each path point

    for (var i = oldPathLength; i < this.path.length; i++) { //worked first time yay
        this.strengths.push(this.strength);
        this.dirs.push(this.growDirection);
    }

    // set tweening of the draw index
    this.tweenTarget = this.path.length;
    var newTween = game.add.tween(this.growthDrawIndex).to( { index : this.tweenTarget }, 900, Phaser.Easing.Linear.InOut, false);
    if (this.currentTween === null || !this.currentTween.isRunning) {
        this.currentTween = newTween;
        this.currentTween.start();
    } else {
        this.currentTween.chain(newTween);
    }


    return cost;
}

Stem.prototype.drawOn = function(bmd, fullrender) {
    //draw the stem to the given bitmapdata
    /*if (fullrender || !this.locked) {
        for (var i = 0; i < this.path.length - 1; i++) {
            var x = this.path[i].x;
            var y = this.path[i].y;
            var x2 = this.path[i+1].x;
            var y2 = this.path[i+1].y;
            //var line = new Phaser.Line(x, y, x2, y2)
            //bmd.textureLine(line, this.texture, "repeat");
            //bmd.draw(this.sprite, x, y, this.strength, this.strength);
            //bmd.circle(x, y, 20, "#00ff00");
        }
    }*/
    if (fullrender || this.growing || this.markedForFullDraw) {
        //bmd.draw(this.sprite, -100, -100); //without this bmd.circle doesnt work :D
        for (var i = 0; i < this.growthDrawIndex.index; i++) {
            var x = this.path[i].x;
            var y = this.path[i].y;
            bmd.draw(this.sprite, x, y, this.strengths[i], this.strengths[i]);
        }
    }

/*
    for (var i = 0; i < this.parts.x.length; i++) {
        var x = this.parts.x[i];
        var y = this.parts.y[i];
        bmd.circle(x, y, 5, "rgb(255,0,0)");
    }*/

    if (fullrender || this.markedForFullDraw) {
        //recursion to children too
        for (var key in this.children) {
            if (this.children.hasOwnProperty(key)) {
                this.children[key].drawOn(bmd, fullrender || this.markedForFullDraw);
            }
        }
    }

    this.markedForFullDraw = false;

}

Stem.prototype.addStem = function(stem, index, side) {
    this.children[index] = stem; //add value to the hash table / object
    stem.parent = this;

    if (side !== null) {
        stem.growDirection += side * 0.25;
    }   
}


Stem.prototype.traverse = function(plant, amount) {
    this.traverseIndex += amount;

    if (this.traverseIndex >= this.path.length - 1) {
        return -1; //alerts the game to start growing this stem
    }

    return Math.floor(this.traverseIndex);

}


Stem.prototype.getBase = function() {
    return [this.parts.x[0], this.parts.y[0]];
}

Stem.prototype.getLeafPart = function() {
    return [this.parts.x[this.parts.x.length - 1], this.parts.y[this.parts.y.length - 1]];
    //if (this.path.length > 0)
    //    return [this.path[this.path.length - 1].x, this.path[this.path.length - 1].y];
    //return [this.parts.x[0], this.parts.y[0]];
}

Stem.prototype.getLeaf = function() {
    if (this.path.length > 0)
        return [this.path[this.path.length - 1].x, this.path[this.path.length - 1].y];
    return [this.parts.x[this.parts.x.length - 1], this.parts.y[this.parts.y.length - 1]];
}

Stem.prototype.getRandomSpot = function() {
    var l = this.path.length / parseFloat(3);
    return Math.floor(Math.random()*l + l);
}

Stem.prototype.getCurrentDrawSpot = function() {
    var i = this.growthDrawIndex.index;
    if (typeof this.path[i] === "undefined") {
        return [-1000, -1000];
    }
    return [this.path[i].x, this.path[i].y];
}

Stem.prototype.getLeafSpot = function() {
    return this.path.length - 1;
}

Stem.prototype.getCoords = function(spot) {
    if (typeof this.path[spot] === "undefined") {
        return this.parts[0];
    }
    return [this.path[spot].x, this.path[spot].y];
}

Stem.prototype.getDirAt = function(spot) {
    return this.dirs[spot];
}

Stem.prototype.getStrengthAt = function(pos) {
    return this.strengths[pos];
}



function Leaf(spritename, x, y, dir) {
    var mirror = x > 800;
    

    // if the direction is large enough, add it to that side
    if (dir - Math.PI/2 > 0.35) {
        mirror = false;
    } else if (dir - Math.PI/2 < -0.35) {
        mirror = true;
    }

    var add = mirror ? "rightspr" : "spr";


    if (spritename == "leaf1") {
        this.sprite = game.add.sprite(x, y, "leaf1" + add);
        this.sprite.anchor.x = 0.97;
        this.sprite.anchor.y = 0.5;
    } else if (spritename == "leaf2") {
        this.sprite = game.add.sprite(x, y, "leaf2" + add);
        this.sprite.anchor.x = 0.97;
        this.sprite.anchor.y = 0.95;
    } else if (spritename == "leaf3") {
        this.sprite = game.add.sprite(x, y, "leaf3" + add);
        this.sprite.anchor.x = 0.97;
        this.sprite.anchor.y = 0.36;
    } else {
        console.log("bad filename", spritename);
    }

    
    var scale = Math.random()*0.15 + 0.20;
    this.sprite.scale.set(scale);

    this.sprite.alpha = 0;
    game.add.tween(this.sprite).to( { alpha: 1 }, 300, Phaser.Easing.Linear.None, true);
    
    if (mirror) {
        //mirror
        this.sprite.scale.x *= -1;
    }

}