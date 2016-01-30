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
        this.goathead = game.add.sprite(game.world.centerX, 0.5 * game.world.centerY, "goaty");
        this.goathead.anchor.set(0.5);
        this.goathead.scale.setTo(0.12);

        this.enterkey = game.add.sprite(game.world.centerX, 1.4 * game.world.centerY, "enter-key");
        this.enterkey.anchor.set(0.5);
        this.enterkey.scale.setTo(1.25);
        this.enterkey.smoothed = false;
    },

    update: function() {
        // Instantly goes to game - implement menu
        //game.state.start("Game");
    }
}