var Victory = function () {};

Victory.prototype = {
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

        track1.stop();
        track2.stop();
        track3.stop();

        track4.play('',0,1,true);


        this.gram = game.add.sprite(game.width/2, game.height*3/4, "grammi");
        this.gram.anchor.setTo(0.5, 0.46);
        this.gram.scale.setTo(0.5, 0.5);
        this.gram.alpha = 0.75;
        

        var victoryPrefix = playerWon;
        var loserPrefix = playerWon == "blue" ? "red" : "blue";
        this.victoryCultists = game.add.group();
        var maxVictoryCultists = 10
        for (var i = 0; i < maxVictoryCultists; i++) {
            var rx = 100;
            var ry = 75;
            var theta = Math.PI*2*i/maxVictoryCultists;
            var x = game.width/2;
            var y = game.height*3/4;
            var dx = Math.cos(theta)*rx;
            var dy = Math.sin(theta)*ry;
            var cultist = game.add.sprite(x + dx, y + dy, victoryPrefix + "acolyte");
            cultist.anchor.setTo(0.5, 0.5);
            var animframes = Math.random() < 0.5 ? [3, 4] : [4, 3];
            var cultistAnim = cultist.animations.add("hoorayanim", animframes);
            cultistAnim.play(4, true);
            this.victoryCultists.add(cultist);
        }

        var deadCultist = game.add.sprite(game.width/2, game.height*3/4, loserPrefix + "acolyte");
        deadCultist.angle = 125;
        deadCultist.frame = 7;
        deadCultist.anchor.setTo(0.5, 0.5); 

        // Goat head sprite
        this.goathead = game.add.sprite(game.world.centerX, 0.5 * game.world.centerY, "goaty");
        this.goathead.anchor.set(0.5);
        this.goathead.scale.setTo(0.5);
        this.goathead.angle = -5.0;
        this.goatheadTween = game.add.tween(this.goathead);
        this.goatheadTween.to({angle: 5}, 2000, Phaser.Easing.Sinusoidal.InOut, true, delay = 0, repeat = -1, yoyo = true);

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
        game.add
            .tween(game.world).to({alpha: 0.0}, 1000, Phaser.Easing.Linear.Out, true)
            .onComplete.add(function() {
                game.state.start("Menu");
            }, this);
    },
};