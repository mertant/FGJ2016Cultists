var Menu = function () {};

Menu.prototype = {

    init: function () {

    },

    preload: function () {
        //Preload assets for the main menu in splash.js
    },

    create: function() {
        window.setTimeout(function() {
            game.world.alpha = 1.0;
        }, 10);
        // Pentagram
        this.gram = game.add.sprite(game.world.centerX, 0.5 * game.world.centerY, "grammi");
        this.gram.anchor.setTo(0.5, 0.46);

        // Goat head sprite
        this.goathead = game.add.sprite(game.world.centerX, 0.5 * game.world.centerY, "goaty");
        this.goathead.anchor.set(0.5);
        this.goathead.scale.setTo(0.5);
        this.goathead.angle = -5.0;
        this.goatheadTween = game.add.tween(this.goathead);
        this.goatheadTween.to({angle: 5}, 2000, Phaser.Easing.Sinusoidal.InOut, true, delay = 0, repeat = -1, yoyo = true);

        // Enter key sprite
        this.keySprite = game.add.sprite(game.world.centerX, 1.5 * game.world.centerY, "enter-key");
        this.keySprite.anchor.set(0.5);
        this.keySprite.scale.setTo(3.0);
        this.keySprite.smoothed = false;
        this.keySpriteTween = game.add.tween(this.keySprite);
        this.keySpriteTween.to({y: '+20'}, 800, Phaser.Easing.Sinusoidal.InOut, true, delay = 0, repeat = -1, yoyo = true);

        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        //Main menu music
        track2.play('',0,1,true);
    },

    update: function() {
        this.gram.angle += 0.1;
        // Pressing the enter key starts the game
        if (this.enterKey.isDown) {
            //track2.fadeOut(1000);
            game.add
                .tween(game.world).to({alpha: 0.0}, 1000, Phaser.Easing.Linear.Out, true)
                .onComplete.add(function() {
                    game.state.start("Tutorial");
                }, this);
        }
    },
}


stopAudio = function() {
    track1.stop();
    track2.stop();
    track3.stop();
    track4.stop();
}