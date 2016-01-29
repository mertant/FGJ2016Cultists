var Menu = function () {};

Menu.prototype = {

    init: function () {

    },

    preload: function () {
        //Preload assets for the main menu in splash.js
    }, 

    create: function() {
        //this.bg = game.add.sprite(0, 0, "menubg");

        //create menu objects

    },

    update: function() {
        // Instantly goes to game - implement menu
        game.state.start("Game");
    }
}