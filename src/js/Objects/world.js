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
}

Map.prototype.add = function(x, y, obj) {
    //this.data[x][y] = obj;
    this.objects.push(obj);
}

Map.prototype.getAt = function(x, y, obj) {
    for (var i=0; i<objects.length; i++){
    }
}
