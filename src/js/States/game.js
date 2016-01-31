var Game = function () {};

var playerWon = null;

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
        this.mage1 = new Mage(96+6*32, 96+6*32, "blueacolyte");
        this.mage2 = new Mage(96+13*32, 96+6*32, "redacolyte");
        this.mage1.sprite.anchor.setTo(.5, .5);
        this.mage2.sprite.anchor.setTo(.5, .5);
        this.mage1.sprite.smoothed = false;
        this.mage2.sprite.smoothed = false;

        //And demons
        this.demon1 = new Demon(96+2*32, 96+1*32, ["bluedemoncombined", "bluedemonvariables"]);
        this.demon2 = new Demon(96+7*32, 96+1*32, ["demoncombined", "demonvariables"]);

        //Altars
        this.altar1 = new Altar(96+7*32, 96+5*32, 'blueAltar');
        this.altar2 = new Altar(96+10*32, 96+6*32, 'redAltar');

        //Le Players Group
        this.players = game.add.group();
        this.players.enableBody = true;

        this.players.add(this.mage1.sprite);
        this.players.add(this.mage2.sprite);

        this.players.add(this.demon1.wholeGroup);
        this.players.add(this.demon2.wholeGroup);

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

        this.clockStart = 60;
        this.clock = this.clockStart;
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
        demonlong = game.add.audio('demonlong');
        demonscream = game.add.audio('demonscream');
        demonstep = game.add.audio('demonstep');
        resconsume = game.add.audio('resconsume');
        rescourcepickup = game.add.audio('rescourcepickup');
        rockhit = game.add.audio('rockhit');
        scream = game.add.audio('scream');
        track1 = game.add.audio('track1');
        track3 = game.add.audio('track3');


        //Le Musik PLayer
        track1.play('',0,1,true);

        //BLood and Gore!!
        this.BLOODemitter = game.add.emitter(0, 0, 100);
        this.BLOODemitter.makeParticles('drop');

        //STONE PARTICLES
        this.stoneBLOODemitter = game.add.emitter(0, 0, 100);
        this.stoneBLOODemitter.makeParticles('stoneblod');

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

                    this.map.add(0,0,new Wall(x,y));

                    var spr = game.add.sprite(x, y, "boulder");
                    //spr.enableBody = true;
                    //game.physics.arcade.enable(spr);
                    //spr.body.immovable = true;
                    spr.visible = false;
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
        for (var i = 0; i < 6; ++i) {
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
            } while (this.map.fitsIn(x, y, resource.sprite.width, resource.sprite.height) == false ||
            (tileX > 4 && tileX < 14 && tileY > 3 && tileY < 9));
            resource.sprite.x = x;
            resource.sprite.y = y;
            this.map.add(x, y, resource);
        }

        //bouldercreation
        for (var i = 0; i < 6; ++i) {
            var x = 0;
            var y = 0;
            // Generate random coordinates until an empty spot is found
            do {
                var tileX = Math.floor(Math.random() * this.map.width);
                var tileY = Math.floor(Math.random() * this.map.height);

                var x = tileX * this.map.tilesize + this.map.x;
                var y = tileY * this.map.tilesize + this.map.y;
            } while (this.map.fitsIn(x, y, 32, 32) == false ||
            (tileX > 4 && tileX < 14 && tileY > 3 && tileY < 9));
            var boulder = new Boulder(x, y);
            this.map.add(x, y, boulder);
        }


        this.clouds = [];

        //this.makeCloud(256, 256);

        // Active boulders to update
        this.activeWeapons = []; //list that contains any active/flying boulders

        this.gameEnded = false;

        //this.demon1.maxHealth = -10;
        //this.demon1.health = -10;

        // Overlay trees
        this.trees = game.add.sprite(0, 0, 'backgroundtrees');

        //timethings
        this.timebar = game.add.sprite(80, 10, 'timebar');
        this.timehud = game.add.sprite(80, 10, 'timehud');
        this.timeflames0 = game.add.sprite(80, -10, "loadingFlames");
        this.timeflames1 = game.add.sprite(80 + 64*1, -10, "loadingFlames");
        this.timeflames2 = game.add.sprite(80 + 64*2, -10, "loadingFlames");
        this.timeflames3 = game.add.sprite(80 + 64*3, -10, "loadingFlames");
        this.timeflames4 = game.add.sprite(80 + 64*4, -10, "loadingFlames");
        this.timeflames5 = game.add.sprite(80 + 64*5, -10, "loadingFlames");
        this.timeflames6 = game.add.sprite(80 + 64*6, -10, "loadingFlames");
        this.timeflames7 = game.add.sprite(80 + 64*7, -10, "loadingFlames");
        this.timeflames8 = game.add.sprite(80 + 64*8, -10, "loadingFlames");
        this.timeflames9 = game.add.sprite(80 + 64*9, -10, "loadingFlames");

        this.timeflames0.visible = false;
        this.timeflames1.visible = false;
        this.timeflames2.visible = false;
        this.timeflames3.visible = false;
        this.timeflames4.visible = false;
        this.timeflames5.visible = false;
        this.timeflames6.visible = false;
        this.timeflames7.visible = false;
        this.timeflames8.visible = false;
        this.timeflames9.visible = false;

    },

    spawnDemons: function() {
        track1.stop();
        track3.play('',0,1,true);
        demonlong.play();
        this.grave1 = game.add.sprite(this.mage1.sprite.x, this.mage1.sprite.y, 'grave');
        this.grave1.anchor.setTo(.5, .5);
        this.grave2 = game.add.sprite(this.mage2.sprite.x, this.mage2.sprite.y, 'grave');
        this.grave2.anchor.setTo(.5, .5);

        this.demon1.start();
        this.demon2.start();

        this.demon1.sprite.anchor.setTo(.5, .5);
        this.demon2.sprite.anchor.setTo(.5, .5);

        this.mage1.sprite.visible = false;
        this.mage2.sprite.visible = false;
        this.demon1.sprite.body.collideWorldBounds = true;
        this.demon2.sprite.body.collideWorldBounds = true;

        this.timeflames0.visible = true;
        this.timeflames1.visible = true;
        this.timeflames2.visible = true;
        this.timeflames3.visible = true;
        this.timeflames4.visible = true;
        this.timeflames5.visible = true;
        this.timeflames6.visible = true;
        this.timeflames7.visible = true;
        this.timeflames8.visible = true;
        this.timeflames9.visible = true;

        for (var i = 0; i < this.altar1.items.length; i++) {
            switch (this.altar1.items[i].sprite.key) {
                case 'sulphur':
                    this.demon1.hornStrength += 1;
                    this.demon1.range += 1;
                    break;
                case 'chicken':
                    this.demon1.armorStrength += 1;
                    this.demon1.maxHealth += 3;
                    break;
                case 'mercury':
                    this.demon1.wingStrength += 1;
                    this.demon1.speed += 50;
                    break;
                case 'skull':
                    this.demon1.weaponStrength += 1;
                    this.demon1.melee += 1;
                    break;
            }
        }

        for (var i = 0; i < this.altar2.items.length; i++) {
            switch (this.altar2.items[i].sprite.key) {
                case 'sulphur':
                    this.demon2.hornStrength += 1;
                    this.demon2.range += 1;
                    break;
                case 'chicken':
                    this.demon2.armorStrength += 1;
                    this.demon2.maxHealth += 3;
                    break;
                case 'mercury':
                    this.demon2.wingStrength += 1;
                    this.demon2.speed += 50;
                    break;
                case 'skull':
                    this.demon2.weaponStrength += 1;
                    this.demon2.melee += 1;
                    break;
            }
        }

        if (this.demon1.wingStrength >= 2) {
          this.demon1.wingStrength = 2;
        }
        if (this.demon1.hornStrength >= 2) {
          this.demon1.hornStrength = 2;
        }
        if (this.demon1.weaponStrength >= 2) {
          this.demon1.weaponStrength = 2;
        }
        if (this.demon1.armorStrength >= 2) {
          this.demon1.armorStrength = 2;
        }

        if (this.demon2.wingStrength >= 2) {
          this.demon2.wingStrength = 2;
        }
        if (this.demon2.hornStrength >= 2) {
          this.demon2.hornStrength = 2;
        }
        if (this.demon2.weaponStrength >= 2) {
          this.demon2.weaponStrength = 2;
        }
        if (this.demon2.armorStrength >= 2) {
          this.demon2.armorStrength = 2;
        }

        this.demon1.health = this.demon1.maxHealth;
        this.demon2.health = this.demon2.maxHealth;

    },

    updateCounter: function() {
        this.clock--;
        if (this.clock >= 0) {
            this.timebar.scale.x = this.clock/this.clockStart;
        } else {
          this.timebar.scale.x = 0;
          this.timehud.scale.x = 0;
        }
        if (this.clock == 0) {
          this.spawnDemons();
        }
        var ItemSpawner666 =  Math.floor((Math.random() * 6) + 1);
        if (ItemSpawner666 == 1 && this.clock > 0){
          this.itemspawner();
        }
        var BoulderSpawner666 = Math.floor((Math.random() * 17) + 1);
        if (BoulderSpawner666 == 1 && this.clock > 0){
          this.boulderspawner();
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
                    curDemon.wholeGroup.setAll("scale.x", -2);
                    curDemon.lastDirection = curDemon.directions.LEFT;
                } else if (curKeys.right.isDown) {
                    curDemon.sprite.body.velocity.x = curDemonVelocity;
                    curDemon.wholeGroup.setAll("scale.x", 2);
                    curDemon.lastDirection = curDemon.directions.RIGHT;
                }

                curDemon.updateAnim();
            }
        }
    },

    itemspawner: function() {
      var resourceInfos = [
          new Skull(),
          new Mercury(),
          new Sulphur(),
          new Chicken(),
      ];
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
      } while (this.map.fitsIn(x, y, resource.sprite.width, resource.sprite.height) == false ||
      (tileX > 4 && tileX < 14 && tileY > 3 && tileY < 9));
      resource.sprite.x = x;
      resource.sprite.y = y;
      this.map.add(x, y, resource);
    },

    makeCloud: function(x, y) {
        this.clouds.push(new Cloud(x, y));
    },

    boulderspawner: function() {
      var x = 0;
      var y = 0;
      // Generate random coordinates until an empty spot is found
      do {
          var tileX = Math.floor(Math.random() * this.map.width);
          var tileY = Math.floor(Math.random() * this.map.height);

          var x = tileX * this.map.tilesize + this.map.x;
          var y = tileY * this.map.tilesize + this.map.y;
      } while (this.map.fitsIn(x, y, 32, 32) == false ||
      (tileX > 4 && tileX < 14 && tileY > 3 && tileY < 9));
      var boulder = new Boulder(x, y);
      this.map.add(x, y, boulder);
    },

    update: function() {
        game.world.bringToTop(this.players);


        if (this.demon1.health <= 0 || this.demon2.health <= 0) {
            this.gameEnded = true;
            playerWon = this.demon1.health <= 0 ? "blue" : "red";
            //do death anim or smth
            game.time.events.add(Phaser.Timer.SECOND, function() {
                game.state.start("Victory");
            }, this);
        }

        //Update flying objects
        for (var i = 0; i < this.activeWeapons.length; i++) {
            var weapon = this.activeWeapons[i].update();

            if (!this.activeWeapons[i].flying) {
                rockhit.play();
                this.map.add(0,0, this.activeWeapons[i]);
                console.log("this rock aint goddam null");
                this.activeWeapons.splice(i--, 1);
                continue;
            }

            game.physics.arcade.collide(this.activeWeapons[i].sprite, this.map.collideableGroup);
            if (this.activeWeapons[i].destroyed) {
                this.activeWeapons.splice(i--, 1);
            }

        }
        this.controls();

        this.timeflames0.y = 2*Math.sin(game.time.events.duration+1)-10;
        this.timeflames1.y = 2*Math.sin(game.time.events.duration+2)-10;
        this.timeflames2.y = 2*Math.sin(game.time.events.duration+3)-10;
        this.timeflames3.y = 2*Math.sin(game.time.events.duration+4)-10;
        this.timeflames4.y = 2*Math.sin(game.time.events.duration+5)-10;
        this.timeflames5.y = 2*Math.sin(game.time.events.duration+6)-10;
        this.timeflames6.y = 2*Math.sin(game.time.events.duration+7)-10;
        this.timeflames7.y = 2*Math.sin(game.time.events.duration+8)-10;
        this.timeflames8.y = 2*Math.sin(game.time.events.duration+9)-10;
        this.timeflames9.y = 2*Math.sin(game.time.events.duration)-10;

        //Le Boulder Blocking part of the Code
        game.physics.arcade.collide(this.mage1.sprite, this.map.collideableGroup);
        game.physics.arcade.collide(this.mage2.sprite, this.map.collideableGroup);

        //check boulder <-> player collision
        var droppedItems = [];
        var droppedX = null;
        var droppedY = null;
        for (var i = 0; i < this.activeWeapons.length; i++) {
            if (!this.activeWeapons[i].destroyed && this.activeWeapons[i].thrower != this.mage1) {
                var wasHit = checkOverlap(this.mage1.sprite, this.activeWeapons[i].sprite);
                if (wasHit) {
                    this.activeWeapons[i].destroy();
                    droppedX = this.mage1.sprite.x;
                    droppedY = this.mage1.sprite.y;
                    this.stoneBLOODemitter.x = droppedX
                    this.stoneBLOODemitter.y = droppedY;
                    this.stoneBLOODemitter.start(true, 1000, null, 7);
                    culthurt.play();
                    rockhit.play();
                    droppedItems = this.mage1.stun();
                }
            }
            if (!this.activeWeapons[i].destroyed && this.activeWeapons[i].thrower != this.mage2) {
                var wasHit = checkOverlap(this.mage2.sprite, this.activeWeapons[i].sprite);
                if (wasHit) {
                    this.activeWeapons[i].destroy();
                    droppedX = this.mage2.sprite.x;
                    droppedY = this.mage2.sprite.y;
                    this.stoneBLOODemitter.x = droppedX
                    this.stoneBLOODemitter.y = droppedY;
                    this.stoneBLOODemitter.start(true, 1000, null, 7);
                    culthurt.play();
                    rockhit.play();
                    droppedItems = this.mage2.stun();
                }
            }
        }

        // Throw dropped items around
        for (var i = 0; i < droppedItems.length; i++) {
            console.log("fuckin items gettin dropped in herez");
            // Generate random coordinates until an empty spot is found
            var resource = droppedItems[i];
            var x,y;
            //console.log(resource);
            do {
              var tileX = Math.floor(Math.random() * 2 + droppedX/this.map.tilesize - 2);
              var tileY = Math.floor(Math.random() * 2 + droppedY/this.map.tilesize  - 2);

              x = tileX * this.map.tilesize;// + this.map.x;
              y = tileY * this.map.tilesize;//+ this.map.y;
            } while (this.map.fitsIn(x, y, resource.sprite.width, resource.sprite.height) == false ||
            (tileX > 4 && tileX < 14 && tileY > 3 && tileY < 9));

            resource.drop(x, y);
            //resource.sprite.x = x;
            //resource.sprite.y = y;
            //resource.visible = true;
            //this.map.add(x,y, new Resource(x,y, resource.spriteName));
            console.log(resource.sprite, resource.sprite.x, resource.sprite.y);
            this.map.add(x, y, resource);
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

        // le altar code

        var checkAltar = function(mage, altar, that) {
            if (checkOverlap(mage.sprite, altar.sprite)) {
                var items = mage.dumpItems();
                altar.give(items);
                if (items.length != 0) {
                    console.log("oh shit you brought items HAVE SUM BLOD");
                    resconsume.play();
                    that.BLOODemitter.x = altar.sprite.x+32;
                    that.BLOODemitter.y = altar.sprite.y+32;
                    that.BLOODemitter.start(true, 1000, null, 7*items.length);
                }
            }
        }

        checkAltar(this.mage1, this.altar1, this);
        checkAltar(this.mage2, this.altar2, this);

        this.altar1.update();
        this.altar2.update();

        for (var i = 0; i < this.clouds.length; i++) {
            if (this.clouds[i].anim.isFinished) {
                var cloud = this.clouds.splice(i--, 1);
            }
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
