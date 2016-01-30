var Game = function () {};


Game.prototype = {

    // PRELOAD GOES TO SPLASH.JS

    create: function() {
        // Setting world alpha doesn't seem to work if done
        // immediately after tweening. Needs a short delay.
        window.setTimeout(function() {
            game.world.alpha = 1.0;
        }, 10);

        //Le Background is created
        this.background = game.add.sprite(0, 0, 'background');

        //Le Physics Engine is initialized
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Le Mage Creation Phase
        this.mage1 = new Mage(96, 96, "blueacolyte");
        this.mage2 = new Mage(690, 495, "redacolyte");
        this.mage1.sprite.anchor.setTo(.5, .5);
        this.mage2.sprite.anchor.setTo(.5, .5);
        this.mage1.sprite.smoothed = false;
        this.mage2.sprite.smoothed = false;

        //And demons
        this.demon1 = new Demon(96+8*32, 96+6*32, "demon");
        this.demon2 = new Demon(96+11*32, 96+7*32, "demon");
        this.demon1.sprite.visible = false;
        this.demon2.sprite.visible = false;
        this.demon1.sprite.smoothed = false;
        this.demon2.sprite.smoothed = false;
        this.demon1.sprite.scale.x = 2;
        this.demon1.sprite.scale.y = 2;
        this.demon2.sprite.scale.x = 2;
        this.demon2.sprite.scale.y = 2;

        //Altars
        this.altar1 = new Altar(96+7*32, 96+5*32);
        this.altar2 = new Altar(96+10*32, 96+6*32);

        //Le Players Group
        this.players = game.add.group();
        this.players.enableBody = true;

        this.players.add(this.mage1.sprite);
        this.players.add(this.mage2.sprite);

        this.players.add(this.demon1.sprite);
        this.players.add(this.demon2.sprite);

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

        this.clock = 999;
        this.clockText = game.add.text(10, 10, 'Time: ' + this.clock);
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
        this.map.addWall(3,4);

        //Le Audio Effects
        bell = game.add.audio('bell');
        countdowntimer = game.add.audio('countdowntimer');
        culthurt = game.add.audio('culthurt');
        cultstep = game.add.audio('cultstep');
        demonhit = game.add.audio('demonhit');
        demonroar = game.add.audio('demonroar');
        demonscream = game.add.audio('demonscream');
        demonstep = game.add.audio('demonstep');
        resconsume = game.add.audio('resconsume');
        rescourcepickup = game.add.audio('rescourcepickup');
        rockhit = game.add.audio('rockhit');
        scream = game.add.audio('scream');
        track1 = game.add.audio('track1');

        //Le Musik PLayer
        track1.play();

        //BLood and Gore!!
        this.BLOODemitter = game.add.emitter(0, 0, 100);

        this.BLOODemitter.makeParticles('blod');

        //STONE PARTICLES
        this.stoneBLOODemitter = game.add.emitter(0, 0, 100);
        this.stoneBLOODemitter.makeParticles('stoneblod');


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

                // Modify coordinates if resource is about to land at a player starting position
                if (tileX == 0 && tileY == 0) {
                    tileX += 1;
                }

                if (tileX == (this.map.width - 1) && tileY == (this.map.height - 1)) {
                    tileX -= -1;
                }

                var x = tileX * this.map.tilesize + this.map.x;
                var y = tileY * this.map.tilesize + this.map.y;
            } while (this.map.fitsIn(x, y, resource.sprite.width, resource.sprite.height) == false);
            resource.sprite.x = x;
            resource.sprite.y = y;
            this.map.add(x, y, resource);
        }

        //TEMP
        //make a test boulder to toss
        var boulder = new Boulder(128, 128);
        this.map.add(128, 128, boulder);
        var boulder = new Boulder(160, 160);
        this.map.add(160, 160, boulder);

        // Active boulders to update
        this.activeWeapons = []; //list that contains any active/flying boulders

        //bring carrying boulder

        // Overlay trees
        this.trees = game.add.sprite(0, 0, 'backgroundtrees');
    },

    spawnDemons: function() {
        this.grave1 = game.add.sprite(this.mage1.sprite.x, this.mage1.sprite.y, 'grave');
        this.grave1.anchor.setTo(.5, .5);
        this.grave2 = game.add.sprite(this.mage2.sprite.x, this.mage2.sprite.y, 'grave');
        this.grave2.anchor.setTo(.5, .5);
        this.demon1.sprite.visible = true;
        this.demon2.sprite.visible = true;
        this.demon1.sprite.anchor.setTo(.5, .5);
        this.demon2.sprite.anchor.setTo(.5, .5);
        this.mage1.sprite.visible = false;
        this.mage2.sprite.visible = false;
        this.demon1.sprite.body.collideWorldBounds = true;
        this.demon2.sprite.body.collideWorldBounds = true;
    },

    updateCounter: function() {
        this.clock--;
        if (this.clock == 0) {
          this.spawnDemons();
        }
        if (this.clock <= 0) {
            this.clockText.setText('DEMONS!');
        } else {
            this.clockText.setText('Time: ' + this.clock);
        }
    },

    controls: function() {
        if (this.clock > 0) {
            var inputSystems = [[this.mage1, this.keys1], [this.mage2, this.keys2]];
            for (var i = 0; i < inputSystems.length; i++) {
                var curMage = inputSystems[i][0];
                var curKeys = inputSystems[i][1];

                curMage.sprite.body.velocity.x = 0;
                curMage.sprite.body.velocity.y = 0;

                if (curMage.isStunned) {
                    continue;
                }

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
                            //Le Musik Player
                            rescourcepickup.play();
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
                        this.activeWeapons.push(weapon);
                    }
                }

                //animate running and stuff
                curMage.updateAnim();

                //update weapons carried by mages
                if (curMage.weapon != null) {
                    curMage.weapon.update();
                }
            }
        } else {
            var inputSystems = [[this.demon1, this.keys1], [this.demon2, this.keys2]];
            for (var i = 0; i < inputSystems.length; i++) {
                var curDemon = inputSystems[i][0];
                var curKeys = inputSystems[i][1];

                curDemon.sprite.body.velocity.x = 0;
                curDemon.sprite.body.velocity.y = 0;

                var curDemonVelocity = curDemon.getMovementSpeed();
                if (curKeys.up.isDown) {
                    curDemon.sprite.body.velocity.y = -curDemonVelocity; //PIXELS PER SECOND
                    curDemon.lastDirection = curDemon.directions.UP;
                } else if (curKeys.down.isDown) {
                    curDemon.sprite.body.velocity.y = curDemonVelocity;
                    curDemon.lastDirection = curDemon.directions.DOWN;
                }
                if (curKeys.left.isDown) {
                    curDemon.sprite.body.velocity.x = -curDemonVelocity;
                    curDemon.sprite.scale.x = 2;
                    curDemon.lastDirection = curDemon.directions.LEFT;
                } else if (curKeys.right.isDown) {
                    curDemon.sprite.body.velocity.x = curDemonVelocity;
                    curDemon.sprite.scale.x = -2;
                    curDemon.lastDirection = curDemon.directions.RIGHT;
                }
            }
        }
    },

    update: function() {

        //Update flying objects
        for (var i = 0; i < this.activeWeapons.length; i++) {
            this.activeWeapons[i].update();
            if (this.activeWeapons[i].destroyed) {
                this.activeWeapons.splice(i--, 1);
            }
        }
        this.controls();

        //Le Boulder Blocking part of the Code
        game.physics.arcade.collide(this.mage1.sprite, this.map.collideableGroup);
        game.physics.arcade.collide(this.mage2.sprite, this.map.collideableGroup);

        //check boulder <-> player collision
        for (var i = 0; i < this.activeWeapons.length; i++) {
            if (!this.activeWeapons[i].destroyed && this.activeWeapons[i].thrower != this.mage1) {
                var wasHit = checkOverlap(this.mage1.sprite, this.activeWeapons[i].sprite);
                if (wasHit) {
                    this.activeWeapons[i].destroy();
                    //TODO sound effect and gfx(dust?)
                    this.stoneBLOODemitter.x = this.mage1.sprite.x;
                    this.stoneBLOODemitter.y = this.mage1.sprite.y;
                    this.stoneBLOODemitter.start(true, 1000, null, 7);
                    rockhit.play();
                    this.mage1.stun();
                }
            }
            if (!this.activeWeapons[i].destroyed && this.activeWeapons[i].thrower != this.mage2) {
                var wasHit = checkOverlap(this.mage2.sprite, this.activeWeapons[i].sprite);
                if (wasHit) {
                    this.activeWeapons[i].destroy();
                    //TODO sound effect and gfx(dust?)
                    this.stoneBLOODemitter.x = this.mage2.sprite.x;
                    this.stoneBLOODemitter.y = this.mage2.sprite.y;
                    this.stoneBLOODemitter.start(true, 1000, null, 7);
                    this.mage2.stun();
                }
            }
        }


        //reforce map boundaries
        for (var i = 0; i < this.players.children.length; i++) {
            if (this.players.children[i].x < this.map.x + this.players.children[i].width/2) {
                this.players.children[i].x = this.map.x + this.players.children[i].width/2;
            }
            if (this.players.children[i].y < this.map.y + this.players.children[i].height/2) {
                this.players.children[i].y = this.map.y + this.players.children[i].height/2;
            }
            if (this.players.children[i].x > this.map.x + this.map.width*this.map.tilesize + this.players.children[i].width/2) {
                this.players.children[i].x = this.map.x + this.map.width*this.map.tilesize + this.players.children[i].width/2;
            }
            if (this.players.children[i].y > this.map.y + this.map.height*this.map.tilesize - this.players.children[i].height/2) {
                this.players.children[i].y = this.map.y + this.map.height*this.map.tilesize - this.players.children[i].height/2;
            }
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
