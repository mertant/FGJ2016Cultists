var Game = function () {};


Game.prototype = {

    // PRELOAD GOES TO SPLASH.JS

    create: function() {
        //Le Background is created
        this.background = game.add.sprite(0, 0, 'background');

        //Le Physics Engine is initialized
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Le Mage Creation Phase
        this.mage1 = new Mage(96, 96, "blueacolyte");
        this.mage2 = new Mage(672, 480, "redacolyte");
        this.mage1.sprite.anchor.setTo(.5, .5);
        this.mage2.sprite.anchor.setTo(.5, .5);

        //Mage animations
        //this.walk = this.mage1.sprite.animations.add('walk');
        //this.wait = this.mage1.sprite.animations.add('wait',  Phaser.Animation.generateFrameNames('redacolyte' , 1 ,  2 ,  '.png'), 100, true);
        //player.animations.add( 'move_right',  Phaser.Animation.generateFrameNames('char_right_ ' , 1 ,  4 ,  '.png'), 100, true);
        //this.mage1.sprite.animations.play('wait', 10, true);

        //Altars
        this.altar1 = new Altar(96+7*32, 96+5*32);
        this.altar2 = new Altar(96+10*32, 96+6*32);

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
        this.keys1 = {
            pick: game.input.keyboard.addKey(Phaser.KeyCode.Q),
            toss: game.input.keyboard.addKey(Phaser.KeyCode.E),
            up: game.input.keyboard.addKey(Phaser.KeyCode.W),
            down: game.input.keyboard.addKey(Phaser.KeyCode.S),
            left: game.input.keyboard.addKey(Phaser.KeyCode.A),
            right: game.input.keyboard.addKey(Phaser.KeyCode.D)
        };

        //  Player 2
        this.keys2 = {
            pick: game.input.keyboard.addKey(Phaser.KeyCode.U),
            toss: game.input.keyboard.addKey(Phaser.KeyCode.O),
            up: game.input.keyboard.addKey(Phaser.KeyCode.I),
            down: game.input.keyboard.addKey(Phaser.KeyCode.K),
            left: game.input.keyboard.addKey(Phaser.KeyCode.J),
            right: game.input.keyboard.addKey(Phaser.KeyCode.L)
        };

        this.clock = 0;
        this.clockText = game.add.text(10, 10, 'Time: ');
        game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

        //Init map
        this.map = new Map();

        //El Boulderdash phase
        //var wall = new Wall(game.width/2,game.height/2);
        //this.map.add(wall);
        this.map.addWall(6,0);
        this.map.addWall(12,0);
        this.map.addWall(2,1);
        this.map.addWall(16,2);
        this.map.addWall(6,3);
        this.map.addWall(7,3);
        this.map.addWall(11,3);
        this.map.addWall(12,3);
        this.map.addWall(16,3);
        this.map.addWall(9,5);
        this.map.addWall(9,6);
        this.map.addWall(15,6);
        this.map.addWall(2,7);
        this.map.addWall(9,7);
        this.map.addWall(3,8);
        this.map.addWall(6,9);
        this.map.addWall(7,9);
        this.map.addWall(11,9);
        this.map.addWall(12,9);
        this.map.addWall(16,9);
        this.map.addWall(15,10);
        this.map.addWall(3,12);
        this.map.addWall(6,12);
        this.map.addWall(12,12);


        //this.map.add(new Wall(this.map.tilesize*3 + this.map.x,this.map.tilesize*3 + this.map.y));


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


        //TEMP
        //make a test boulder to toss
        var boulder = new Boulder(128, 128);
        this.map.add(128, 128, boulder);

        // Active boulders to update
        this.activeWeapons = []; //list that contains any active/flying boulders



        //bring player sprites on top of others
        game.world.bringToTop(this.mage1.sprite);
        game.world.bringToTop(this.mage2.sprite);
        //bring carrying boulder

        // Overlay trees
        this.trees = game.add.sprite(0, 0, 'backgroundtrees');
    },

    updateCounter: function() {
      this.clock++;
      this.clockText.setText('Time: ' + this.clock);
    },

    update: function() {

        //Update flying objects
        for (var i = 0; i < this.activeWeapons.length; i++) {
            this.activeWeapons[i].update();
        }

        var inputSystems = [[this.mage1, this.keys1], [this.mage2, this.keys2]];

        for (var i = 0; i < inputSystems.length; i++) {
            var curMage = inputSystems[i][0];
            var curKeys = inputSystems[i][1];

            curMage.sprite.body.velocity.x = 0;
            curMage.sprite.body.velocity.y = 0;

            var curMageVelocity = curMage.getMovementSpeed();
            if (curKeys.up.isDown) {
                curMage.sprite.body.velocity.y = -curMageVelocity; //PIXELS PER SECOND
                curMage.lastDirection = curMage.directions.UP;
            } else if (curKeys.down.isDown) {
                curMage.sprite.body.velocity.y = curMageVelocity;
                curMage.lastDirection = curMage.directions.DOWN;
            }
            if (curKeys.left.isDown) {
                curMage.sprite.body.velocity.x = -curMageVelocity;
                curMage.sprite.scale.x = 1;
                curMage.lastDirection = curMage.directions.LEFT;
            } else if (curKeys.right.isDown) {
                curMage.sprite.body.velocity.x = curMageVelocity;
                curMage.sprite.scale.x = -1;
                curMage.lastDirection = curMage.directions.RIGHT;
            }
            if (curKeys.pick.isDown) {
                var obj = this.map.getAt(curMage.sprite.x, curMage.sprite.y)
                if (obj != null && obj.constructor.name == 'Resource') {
                    if (curMage.weapon == null) {
                        curMage.pickUp(obj);
                        this.map.remove(obj);
                        obj.pick();
                    }
                }
                if (obj != null && obj.constructor.name == "Boulder") {
                    if (curMage.weapon == null) { //can only pick up if not already carrying
                        curMage.pickWeapon(obj);
                        this.map.remove(obj);
                        obj.pick(curMage); //NOTE: Boulder.pick
                    }
                }
            }
            if (curKeys.toss.isDown) {
                if (curMage.weapon != null) {
                    var weapon = curMage.useWeapon();
                }
            }

            //animate running and stuff
            curMage.updateAnim();
        }
        /*
        //Reset velocity
        //PIXELS PER SECOND
        this.mage1.sprite.body.velocity.x = 0;
        this.mage1.sprite.body.velocity.y = 0;
        this.mage2.sprite.body.velocity.x = 0;
        this.mage2.sprite.body.velocity.y = 0;
        // Input P1
        var mage1velocity = this.mage1.getMovementSpeed();
        if (this.keys1.up.isDown) {
            this.mage1.sprite.body.velocity.y = -mage1velocity; //PIXELS PER SECOND
            this.mage1.lastDirection = this.mage1.directions.UP;
        } else if (this.keys1.down.isDown) {
            this.mage1.sprite.body.velocity.y = mage1velocity;
            this.mage1.lastDirection = this.mage1.directions.DOWN;
        }
        if (this.keys1.left.isDown) {
            this.mage1.sprite.body.velocity.x = -mage1velocity;
            this.mage1.sprite.scale.x = 1;
            this.mage1.lastDirection = this.mage1.directions.LEFT;
        } else if (this.keys1.right.isDown) {
            this.mage1.sprite.body.velocity.x = mage1velocity;
            this.mage1.sprite.scale.x = -1;
            this.mage1.lastDirection = this.mage1.directions.RIGHT;
        }
        if (this.keys1.pick.isDown) {
            var obj = this.map.getAt(this.mage1.sprite.x, this.mage1.sprite.y)
            if (obj != null && obj.constructor.name == 'Resource') {
                if (this.mage1.weapon == null) {
                    this.mage1.pickUp(obj);
                    this.map.remove(obj);
                    obj.pick();
                }
            }
            if (obj != null && obj.constructor.name == "Boulder") {
                if (this.mage1.weapon == null) { //can only pick up if not already carrying
                    this.mage1.pickWeapon(obj);
                    this.map.remove(obj);
                    obj.pick(); //NOTE: Boulder.pick
                }
            }
        }
        if (this.keys1.toss.isDown) {
            if (this.mage1.weapon != null) {
                var weapon = this.mage1.useWeapon();
            }
        }

        //animate running and stuff
        this.mage1.updateAnim();

        // Input P2
        var mage2velocity = this.mage2.getMovementSpeed();
        if (this.keys2.up.isDown) {
            this.mage2.sprite.body.velocity.y = -mage2velocity;
            this.mage2.lastDirection = this.mage2.directions.UP;
        } else if (this.keys2.down.isDown) {
            this.mage2.sprite.body.velocity.y = mage2velocity;
            this.mage2.lastDirection = this.mage2.directions.DOWN;
        }
        if (this.keys2.left.isDown) {
            this.mage2.sprite.body.velocity.x = -mage2velocity;
            this.mage2.sprite.scale.x = 1;
            this.mage2.lastDirection = this.mage2.directions.LEFT;
        } else if (this.keys2.right.isDown) {
            this.mage2.sprite.body.velocity.x = mage2velocity;
            this.mage2.sprite.scale.x = -1;
            this.mage2.lastDirection = this.mage2.directions.RIGHT;
        }
        if (this.keys2.pick.isDown) {
            var obj = this.map.getAt(this.mage2.sprite.x, this.mage2.sprite.y)
            if (obj != null && obj.constructor.name == 'Resource') {
                this.mage2.pickUp(obj);
                this.map.remove(obj);
                obj.pick();
            }
        }

        //animate running and stuff
        this.mage2.updateAnim();
        */

        // Player <-> Map edge collision
        //game.physics.arcade.collide(this.mage1.sprite, this.mapBoundary);
        //game.physics.arcade.collide(this.mage2.sprite, this.mapBoundary);

        //Le Mage Collision Checker
        //game.physics.arcade.collide(this.mage1.sprite, this.mage2.sprite);

        //Le Boulder Blocking part of the Code
        game.physics.arcade.collide(this.mage1.sprite, this.map.collideableGroup);
        game.physics.arcade.collide(this.mage2.sprite, this.map.collideableGroup);

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

        //drop items at altar
        if (checkOverlap(this.mage1.sprite, this.altar1.sprite)) {
            this.altar1.give(this.mage1.dumpItems());
        }

        if (checkOverlap(this.mage2.sprite, this.altar2.sprite)) {
            this.altar2.give(this.mage2.dumpItems());
        }

    },

    render: function() {
        //game.debug.cameraInfo(game.camera, 32, 32);

        //for custom rendering and debug, no need to render each sprite etc.
        //game.debug.spriteInfo(this.mage1.sprite, 32, 32);
    }

}


function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
