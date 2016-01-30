var Game = function () {};


Game.prototype = {

    // PRELOAD GOES TO SPLASH.JS

    create: function() {
        //Le Background is created
        this.background = game.add.sprite(0, 0, 'background');

        //Le Physics Engine is initialized
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Le Mage Creation Phase
        this.mage1 = new Mage(672, 480, "redacolyte");
        this.mage2 = new Mage(96, 96, "blueacolyte");
        this.mage1.sprite.anchor.setTo(.5, .5);
        this.mage2.sprite.anchor.setTo(.5, .5);

        //Mage animations
        //this.walk = this.mage1.sprite.animations.add('walk');
        //this.wait = this.mage1.sprite.animations.add('wait',  Phaser.Animation.generateFrameNames('redacolyte' , 1 ,  2 ,  '.png'), 100, true);
        //player.animations.add( 'move_right',  Phaser.Animation.generateFrameNames('char_right_ ' , 1 ,  4 ,  '.png'), 100, true);
        //this.mage1.sprite.animations.play('wait', 10, true);

        //Altars
        this.altar1 = game.add.sprite(672, 480, 'altar');
        this.altar2 = game.add.sprite(96, 96, 'altar');

        //Le Players Group
        this.players = game.add.group();
        this.players.enableBody = true;

        this.players.add(this.mage1.sprite);
        this.players.add(this.mage2.sprite);

        //Collision between players and world boundaries
        game.physics.arcade.enable([this.mage1.sprite, this.mage2.sprite]);
        this.mage1.sprite.body.collideWorldBounds = true;
        this.mage2.sprite.body.collideWorldBounds = true;

        //Input
        //  Player 1
        this.cursors = game.input.keyboard.createCursorKeys();

        //  Player 2
        this.keys = {
            up: game.input.keyboard.addKey(Phaser.KeyCode.W),
            down: game.input.keyboard.addKey(Phaser.KeyCode.S),
            left: game.input.keyboard.addKey(Phaser.KeyCode.A),
            right: game.input.keyboard.addKey(Phaser.KeyCode.D)
        };

        //Init clock
        this.clock = 0;
        this.clockText = game.add.text(10, 10, 'Time: ');
        game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

        //Init map
        this.map = new Map();

        var wall = new Wall(game.width/2,game.height/2);
        this.map.add(game.width/2,game.height/2,wall);

        //  Create walls around the play area that are invisible
        this.mapBoundary = game.add.group();
        //this.mapBoundary.enableBody = true;
        for (var i = 0; i < this.map.width + 2; i++) { //notice the +2
            for (var j = 0; j < this.map.height + 2; j++) {
                if (i == 0 || j == 0 || i == this.map.width + 1 || j == this.map.height + 1) {
                    var x = this.map.x - this.map.tilesize;
                    var y = this.map.y - this.map.tilesize;
                    x += i*this.map.tilesize;
                    y += j*this.map.tilesize;
                    var spr = game.add.sprite(x, y, "boulder");
                    //spr.enableBody = true;
                    //game.physics.arcade.enable(spr);
                    //spr.body.immovable = true;
                    //spr.visible = false;
                    this.mapBoundary.add(spr);
                }
            }
        }

        // FIXME: Don't hardcode resource info list here?
        var resourceInfos = [
            new Skull(),
            new Mercury(),
            new Sulphur(),
            new Chicken(),
        ];

        // Generate initial resources on the map
        for (var i = 0; i < 20; ++i) {
            var x = 0;
            var y = 0;
            var resourceInfo = resourceInfos[Math.floor(Math.random() * resourceInfos.length)];
            var resource = new Resource(x, y, resourceInfo);

            // Generate random coordinates until an empty spot is found
            do {
                var tileX = Math.floor(Math.random() * this.map.width);
                var tileY = Math.floor(Math.random() * this.map.height);
                var x = tileX * this.map.tilesize + this.map.x;
                var y = tileY * this.map.tilesize + this.map.y;
                // this.map.fitsIn does not take into account player positions!
            } while (this.map.fitsIn(x, y, resource.sprite.width, resource.sprite.height) == false);
            resource.sprite.x = x;
            resource.sprite.y = y;
            this.map.add(x, y, resource);
        }

        // Overlay trees
        this.trees = game.add.sprite(0, 0, 'backgroundtrees');
    },

    updateCounter: function() {
      this.clock++;
      this.clockText.setText('Time: ' + this.clock);
    },

    update: function() {
        //Reset velocity
        //PIXELS PER SECOND
        this.mage1.sprite.body.velocity.x = 0;
        this.mage1.sprite.body.velocity.y = 0;
        this.mage2.sprite.body.velocity.x = 0;
        this.mage2.sprite.body.velocity.y = 0;
        // Input P1
        var mage1velocity = this.mage1.getMovementSpeed();
        if (this.cursors.up.isDown) {
            this.mage1.sprite.body.velocity.y = -mage1velocity; //PIXELS PER SECOND
            this.mage1.lastDirection = this.mage1.directions.UP;
        } else if (this.cursors.down.isDown) {
            this.mage1.sprite.body.velocity.y = mage1velocity;
            this.mage1.lastDirection = this.mage1.directions.DOWN;
        }
        if (this.cursors.left.isDown) {
            this.mage1.sprite.body.velocity.x = -mage1velocity;
            this.mage1.sprite.scale.x = 1;
            this.mage1.lastDirection = this.mage1.directions.LEFT;
        } else if (this.cursors.right.isDown) {
            this.mage1.sprite.body.velocity.x = mage1velocity;
            this.mage1.sprite.scale.x = -1;
            this.mage1.lastDirection = this.mage1.directions.RIGHT;
        }

        //animate running and stuff
        this.mage1.updateAnim();

        // Input P2
        var mage2velocity = this.mage2.getMovementSpeed();
        if (this.keys.up.isDown) {
            this.mage2.sprite.body.velocity.y = -mage2velocity;
            this.mage2.lastDirection = this.mage2.directions.UP;
        } else if (this.keys.down.isDown) {
            this.mage2.sprite.body.velocity.y = mage2velocity;
            this.mage2.lastDirection = this.mage2.directions.DOWN;
        }
        if (this.keys.left.isDown) {
            this.mage2.sprite.body.velocity.x = -mage2velocity;
            this.mage2.sprite.scale.x = 1;
            this.mage2.lastDirection = this.mage2.directions.LEFT;
        } else if (this.keys.right.isDown) {
            this.mage2.sprite.body.velocity.x = mage2velocity;
            this.mage2.sprite.scale.x = -1;
            this.mage2.lastDirection = this.mage2.directions.RIGHT;
        }

        //animate running and stuff
        this.mage2.updateAnim();

        //reforce map boundaries
        if (this.mage1.sprite.x < this.map.x + this.mage1.sprite.width/2) {
            this.mage1.sprite.x = this.map.x + this.mage1.sprite.width/2;
        }
        if (this.mage1.sprite.y < this.map.y + this.mage1.sprite.height/2) {
            this.mage1.sprite.y = this.map.y + this.mage1.sprite.height/2;
        }
        if (this.mage1.sprite.x > this.map.x + this.map.width*this.map.tilesize + this.mage1.sprite.width/2) {
            this.mage1.sprite.x = this.map.x + this.map.width*this.map.tilesize + this.mage1.sprite.width/2;
        }
        if (this.mage1.sprite.y > this.map.y + this.map.height*this.map.tilesize - this.mage1.sprite.height/2) {
            this.mage1.sprite.y = this.map.y + this.map.height*this.map.tilesize - this.mage1.sprite.height/2;
        }

        if (this.mage2.sprite.x < this.map.x + this.mage2.sprite.width/2) {
            this.mage2.sprite.x = this.map.x + this.mage2.sprite.width/2;
        }
        if (this.mage2.sprite.y < this.map.y + this.mage2.sprite.height/2) {
            this.mage2.sprite.y = this.map.y + this.mage2.sprite.height/2;
        }
        if (this.mage2.sprite.x > this.map.x + this.map.width*this.map.tilesize + this.mage2.sprite.width/2) {
            this.mage2.sprite.x = this.map.x + this.map.width*this.map.tilesize + this.mage2.sprite.width/2;
        }
        if (this.mage2.sprite.y > this.map.y + this.map.height*this.map.tilesize - this.mage1.sprite.height/2) {
            this.mage2.sprite.y = this.map.y + this.map.height*this.map.tilesize - this.mage1.sprite.height/2;
        }

        // Player <-> Map edge collision
        //game.physics.arcade.collide(this.mage1.sprite, this.mapBoundary);
        //game.physics.arcade.collide(this.mage2.sprite, this.mapBoundary);

        //Le Boulder Blocking part of the Code
        game.physics.arcade.collide(this.mage1.sprite, this.map.collideableGroup);
        game.physics.arcade.collide(this.mage2.sprite, this.map.collideableGroup);

        //Le Mage Collision Checker
        game.physics.arcade.collide(this.mage1.sprite, this.mage2.sprite);

    },

    render: function() {
        //game.debug.cameraInfo(game.camera, 32, 32);

        //for custom rendering and debug, no need to render each sprite etc.
    }

}
