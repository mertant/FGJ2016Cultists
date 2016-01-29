var Game = function () {};


Game.prototype = {

    // PRELOAD GOES TO SPLASH.JS

    create: function() {
        //Le Background is created
        this.background = game.add.sprite(0, 0, 'background');

        //Le Physics Engine is initialized
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Le Mage Creation Phase
        this.mage1 = game.add.sprite(750, 550, 'mage1');
        this.mage2 = game.add.sprite(50, 50, 'mage2');

        //Le Players Group
        this.players = game.add.group();

        //Le Players Group Physics are enabled
        this.players.enableBody = true;

        //Le Mages are Added to the Players Group
        this.players.add(this.mage1);
        this.players.add(this.mage2);

        //Le Mage Physics
        game.physics.arcade.enable([this.mage1, this.mage2]);
        this.mage1.body.collideWorldBounds = true;
        this.mage2.body.collideWorldBounds = true;

        //Le Cursor
        this.cursors = game.input.keyboard.createCursorKeys();

        //Le Keys
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
            this.mage1.body.y -= 4;
        } else if (this.cursors.down.isDown) {
            this.mage1.body.y += 4;
        }
        if (this.cursors.left.isDown) {
            this.mage1.body.x -= 4;
        } else if (this.cursors.right.isDown) {
            this.mage1.body.x += 4;
        }

        // Input P2
        if (this.keys.up.isDown) {
            this.mage2.body.y -= 4;
        } else if (this.keys.down.isDown) {
            this.mage2.body.y += 4;
        }
        if (this.keys.left.isDown) {
            this.mage2.body.x -= 4;
        } else if (this.keys.right.isDown) {
            this.mage2.body.x += 4;
        }

        //Le Mage Collision Checker
        game.physics.arcade.collide(this.mage1, this.mage2);

    },

    render: function() {
        //game.debug.cameraInfo(game.camera, 32, 32);

        //for custom rendering and debug, no need to render each sprite etc.
    }

}
