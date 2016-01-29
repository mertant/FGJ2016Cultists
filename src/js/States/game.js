var Game = function () {};

var cursors;

Game.prototype = {

    init: function () {

    },

    preload: function () {

    }, 

    create: function() {
       
    },

    update: function() {
        // Input
        /*if (cursors.up.isDown) {
            game.camera.y -= 4;
        } else if (cursors.down.isDown) {
            game.camera.y += 4;
        }
        if (cursors.left.isDown) {
            game.camera.x -= 4;
        } else if (cursors.right.isDown) {
            game.camera.x += 4;
        }*/
        
    },

    render: function() {
        //game.debug.cameraInfo(game.camera, 32, 32);

    }

}

function choice(list) {
    return list[Math.floor(Math.random()*list.length)];
}