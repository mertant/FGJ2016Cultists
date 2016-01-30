var Menu = function () {};

Menu.prototype = {

    init: function () {

    },

    preload: function () {
        //Preload assets for the main menu in splash.js
    }, 

    create: function() {
        // Create menu objects
        this.goathead = game.add.sprite(game.world.centerX, 0.5 * game.world.centerY, "goaty");
        this.goathead.anchor.set(0.5);
        this.goathead.scale.setTo(0.18);

        this.keySprite = game.add.sprite(game.world.centerX, 1.5 * game.world.centerY, "enter-key");
        this.keySprite.anchor.set(0.5);
        this.keySprite.scale.setTo(3.0);
        this.keySprite.smoothed = false;

        this.keySpriteTween = game.add.tween(this.keySprite);
        this.keySpriteTween.to({y: '+20'}, 800, Phaser.Easing.Sinusoidal.InOut, true, delay = 0, repeat = -1, yoyo = true);

        // Pressing the enter key goes to game
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    },

    update: function() {
        if (this.enterKey.isDown) {
            game.state.start("Game");
        }
    }
}