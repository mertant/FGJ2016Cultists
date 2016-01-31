var Credits = function () {};

Credits.prototype = {
    init: function() {

    },

    preload: function() {

    },

    create: function() {
        // Setting world alpha doesn't seem to work if done
        // immediately after tweening. Needs a short delay.
        window.setTimeout(function() {
            game.world.alpha = 1.0;
        }, 10);

        this.creds = game.add.sprite(0, 0, "credits");
        this.creds.scale.x = 800/this.creds.width;
        this.creds.scale.y = 600/this.creds.height;

        // Enter key sprite
        this.enterKeySprite = game.add.sprite(720, 510, 'enter-key');
        game.add.tween(this.enterKeySprite).
            to({y: '+10'}, 800, Phaser.Easing.Sinusoidal.InOut, true, delay = 0, repeat = -1, yoyo = true);

        var enterkey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterkey.onDown.add(this.backToMenu, this);
    },

    update: function() {

    },

    backToMenu: function() {
        track4.fadeOut(1000);
        game.add
            .tween(game.world).to({alpha: 0.0}, 1000, Phaser.Easing.Linear.Out, true)
            .onComplete.add(function() {
                stopAudio();
                track2.play('',0,1,true);
                game.state.start("Menu");
            }, this);
    },
};
