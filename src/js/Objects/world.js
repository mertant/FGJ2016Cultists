function Map() {
    this.x = 96;
    this.y = 96;
    this.tilesize = 32;
    this.height = 13;
    this.width = 19;
    this.objects = [];

  /*  this.data = new Array(this.width);
    for (var i=0; i<this.width; i++) {
        this.data[i] = new Array(this.height);
        for (var j=0; j<this.height; j++){
            this.data[i][j] = null;
        }
    }*/

    //group for player-collideable objects - walls, boulder
    this.collideableGroup = game.add.group();
    this.collideableGroup.enableBody = true;
    //group for other objects that spawn in the map - resources, bunny
    this.noncollideableGroup = game.add.group();
}

Map.prototype.add = function(x, y, obj) {
    //this.data[x][y] = obj;
    this.objects.push(obj);
    if (obj.collidable){
        this.collideableGroup.add(obj.sprite);
        obj.sprite.body.immovable = true;
    }
    // add object to proper collision group
}

Map.prototype.addWall = function(tilex,tiley) {
  this.add(0,0,new Wall(this.x+tilex*this.tilesize, this.y+tiley*this.tilesize));
}

// Removes an object from the map objects
// Returns if the operation was succesfull
Map.prototype.remove = function(obj) {
    var index = this.objects.indexOf(obj);
    if (index === -1) {
        return false;
    }

    this.objects.splice(index, 1);
    return true;
}

// Returns an object in the map at the given SCREEN X/Y coordinates
// Returns null if no object exists at x, y
Map.prototype.getAt = function(x, y) {
    for (var i = 0; i < this.objects.length; i++){
        var obj = this.objects[i];
        if (
            x >= obj.sprite.x &&
            x < (obj.sprite.x + obj.sprite.width) &&
            y >= obj.sprite.y &&
            y < (obj.sprite.y + obj.sprite.height)
            ) {
            return obj;
        }
    }
    return null;
}

// Returns true if it's okay to place a sprite of size (width, height) to (x, y)
Map.prototype.fitsIn = function(x, y, width, height) {
    for (var i = 0; i < this.objects.length; ++i) {
        var obj = this.objects[i];
        if (
            x >= (obj.sprite.x - width) &&
            x < (obj.sprite.x + obj.sprite.width) &&
            y >= (obj.sprite.y - height) &&
            y < (obj.sprite.y + obj.sprite.height)
            ) {
            return false;
        }
    }
    return true;
}
