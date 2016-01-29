var Menu = function () {};

Menu.prototype = {

    init: function () {

    },

    preload: function () {

    }, 

    create: function() {
        //this.bg = game.add.sprite(0, 0, "gamebg");

        game.state.start("Game");
    },

    update: function() {

    }
}