var Splash = function () {};

Splash.prototype = {

    loadScripts: function () {
        game.load.script("MenuScript", "js/States/menu.js");
        game.load.script("GameScript", "js/States/game.js");
        game.load.script("TutorialScript", "js/States/tutorial.js");
        game.load.script("VictoryScript", "js/States/victory.js");

        game.load.script("WorldScript", "js/Objects/world.js");
        game.load.script("WallScript", "js/Objects/wall.js");
        game.load.script("MageScript", "js/Objects/mage.js");
        game.load.script("AltarScript", "js/Objects/altar.js");
        game.load.script("BoulderScript", "js/Objects/boulder.js");
        game.load.script("ResourceScript", "js/Objects/resource.js");
        game.load.script("DemonScript", "js/Objects/demon.js");

        game.load.script("SkullResource", "js/Resources/skull.js");
        game.load.script("MercuryResource", "js/Resources/mercury.js");
        game.load.script("SulphurResource", "js/Resources/sulphur.js");
        game.load.script("ChickenResource", "js/Resources/chicken.js");

        game.load.script("CloudScript", "js/Objects/cloud.js");
    },

    loadBgm: function () {
      game.load.audio('bell', 'content/sounds/bell.ogg');
      game.load.audio('countdowntimer', 'content/sounds/countdowntimer.ogg');
      game.load.audio('culthurt', 'content/sounds/culthurt.ogg');
      game.load.audio('cultstep', 'content/sounds/cultstep.ogg');
      game.load.audio('demonhit', 'content/sounds/demonhit.ogg');
      game.load.audio('demonlong', 'content/sounds/demonroarlong.ogg');
      game.load.audio('demonroar', 'content/sounds/demonroar.ogg');
      game.load.audio('demonscream', 'content/sounds/demonscream.ogg');
      game.load.audio('demonstep', 'content/sounds/demonstep.ogg');
      game.load.audio('resconsume', 'content/sounds/resconsume.ogg');
      game.load.audio('rescourcepickup', 'content/sounds/rescourcepickup.ogg');
      game.load.audio('rockhit', 'content/sounds/rockhit.ogg');
      game.load.audio('scream', 'content/sounds/scream.ogg');

      //Musik
      game.load.audio('track1', 'content/sounds/track1.ogg');
      game.load.audio('track2', 'content/sounds/track2.ogg');
      game.load.audio('track3', 'content/sounds/track3.ogg');
      game.load.audio('track4', 'content/sounds/track4.ogg');


    },

    loadImages: function () {
        // Backgrounds

        game.load.image('background', 'content/bg/bg001.png');
        game.load.image("backgroundtrees", "content/bg/backgroundtrees.png");

        // Sprites
        game.load.image('demon', 'content/sprites/demon.png');


        game.load.image('boulder', 'content/sprites/boulder.png');
        game.load.image("chicken", "content/sprites/chicken.png");
        game.load.image("mercury", "content/sprites/mercury.png");
        game.load.image("orb", "content/sprites/orb.png");
        game.load.image("orb2", "content/sprites/orb2.png");
        game.load.image("risu", "content/sprites/risu.png");
        game.load.image("rock", "content/sprites/rock.png");
        game.load.image("skull", "content/sprites/skull.png");
        game.load.image("sulphur", "content/sprites/sulphur.png");
        game.load.image("redAltar", "content/sprites/redAltar.png");
        game.load.image("blueAltar", "content/sprites/blueAltar.png");
        game.load.image('grave', 'content/sprites/grave.png');
        game.load.image("goaty", "content/sprites/goaty-small.png");
        game.load.image("grammi", "content/sprites/grammi.png");
        game.load.image("enter-key", "content/sprites/enter-key-small.png")

        game.load.image('drop', 'content/sprites/drop.png');
        game.load.image('drop2', 'content/sprites/drop2.png');
        game.load.image('star', 'content/sprites/star.png');
        game.load.image('stoneblod', 'content/sprites/stoneparticle.png');
        game.load.image('timebar', 'content/sprites/timebar.png');
        game.load.image('timehud', 'content/sprites/timehud.png');

        // Tutorial images
        game.load.image('tutorial-buttons', 'content/tutorials/tutorial_basic_buttons.png');
        game.load.image('tutorial-resources', 'content/tutorials/tutorial_resources_to_altar.png');
        game.load.image('tutorial-pickup', 'content/tutorials/tutorial_pickup.png');
        game.load.image('tutorial-throw', 'content/tutorials/tutorial_throw.png');



        //DEMON SPRITES
        /*
        game.load.spritesheet("demonback", "content/demon/demonback.png", 64, 64, 4);
        game.load.spritesheet("demonfront", "content/demon/demonfront.png", 64, 64, 4);
        game.load.spritesheet("demonside", "content/demon/demonside.png", 64, 64, 3);
        //DEMON PARTS
        game.load.spritesheet("demonback_variables", "content/demon/variablesback.png", 64, 64, 13);
        game.load.spritesheet("demonfront_variables", "content/demon/variablesfront.png", 64, 64, 13);
        game.load.spritesheet("demonside_variables", "content/demon/variablesside.png", 64, 64, 13);
        */
        game.load.spritesheet("demoncombined", "content/demon/demoncombined.png", 64, 64, 11);
        game.load.spritesheet("demonvariables", "content/demon/variablescombined.png", 64, 64, 39);
        game.load.spritesheet("bluedemoncombined", "content/demon/bluedemoncombined.png", 64, 64, 11);
        game.load.spritesheet("bluedemonvariables", "content/demon/bluevariablescombined.png", 64, 64, 39);


        game.load.spritesheet("cloud", "content/sprites/cloud.png", 32, 32, 9);

        //ESIMERKKI: game.load.spritesheet(key, sprite file, frame width, frame height, frame count);
        game.load.spritesheet("redacolyte", "content/sprites/redacolyte.png", 32, 32, 15);
        game.load.spritesheet("blueacolyte", "content/sprites/blueacolyte.png", 32, 32, 15);
    },

    loadFonts: function () {

    },

    init: function () {
    },

    // Preload game assets
    preload: function () {
        game.load.onFileComplete.add(this.loadFileComplete, this);

        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
    },

    addGameStates: function () {
        game.state.add("Menu", Menu);
        game.state.add("Tutorial", Tutorial);
        game.state.add("Game", Game);
        game.state.add("Victory", Victory);
    },

    addGameMusic: function () {
        //music = game.add.audio("bgm");
        //music.loop = true;
        //music.play();
        //music.volume = 0.7;
    },

    create: function() {
        this.addGameStates();
        this.addGameMusic();
        window.setTimeout(function() {
            game.state.start("Menu");
        }, 1000);
    },

    loadFileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
        var scaler = 2.0;
        var totalNumberOfFlames = 5;
        var numberOfFlames = Math.floor(totalNumberOfFlames * progress / 100.0);
        var loadingSprite = game.add.sprite(0, 0, "loadingFlames");
        loadingSprite.x = game.world.centerX + scaler * loadingSprite.width * (numberOfFlames - totalNumberOfFlames / 2.0);
        loadingSprite.y = game.world.centerY;
        loadingSprite.anchor.setTo(0.5, 0.5);
        loadingSprite.scale.setTo(scaler, scaler);
        loadingSprite.smoothed = false;
    },
}
