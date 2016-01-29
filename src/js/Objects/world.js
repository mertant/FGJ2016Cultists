function Map() {
    this.x = 0;
    this.y = 0;
    this.tilesize = 32;
    this.height = 18;
    this.width = 25;
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
    for (var i=0; i<objects.length; i++){
        var obj = this.objects[i];
        if (x > obj.sprite.x && x < obj.sprite.x + obj.sprite.width &&
            y > obj.sprite.y && y < obj.sprite.y + obj.sprite.height) {
            return obj;
        }
    }
    return null;
}
