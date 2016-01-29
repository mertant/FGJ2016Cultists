var Game = function () {};


Game.prototype = {

    // PRELOAD GOES TO SPLASH.JS

    create: function() {
        this.background = game.add.sprite(0, 0, 'background');
        this.mage1 = game.add.sprite(750, 550, 'mage1');
        this.mage2 = game.add.sprite(50, 50, 'mage2');
        this.cursors = game.input.keyboard.createCursorKeys();
        this.keys = {
            up: game.input.keyboard.addKey(Phaser.KeyCode.W),
            down: game.input.keyboard.addKey(Phaser.KeyCode.S),
            left: game.input.keyboard.addKey(Phaser.KeyCode.A),
            right: game.input.keyboard.addKey(Phaser.KeyCode.D)
        };
        //Initialize game objects, world etc.
    },

    update: function() {
        // Input P1
        if (this.cursors.up.isDown) {
            this.mage1.y -= 4;
        } else if (this.cursors.down.isDown) {
            this.mage1.y += 4;
        }
        if (this.cursors.left.isDown) {
            this.mage1.x -= 4;
        } else if (this.cursors.right.isDown) {
            this.mage1.x += 4;
        }

        // Input P2
        if (this.keys.up.isDown) {
            this.mage2.y -= 4;
        } else if (this.keys.down.isDown) {
            this.mage2.y += 4;
        }
        if (this.keys.left.isDown) {
            this.mage2.x -= 4;
        } else if (this.keys.right.isDown) {
            this.mage2.x += 4;
        }

    },

    render: function() {
        //game.debug.cameraInfo(game.camera, 32, 32);

        //for custom rendering and debug, no need to render each sprite etc.
    }

}
