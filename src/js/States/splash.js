var Splash = function () {};

Splash.prototype = {

    loadScripts: function () {
        game.load.script("MenuScript", "js/States/menu.js");
        game.load.script("GameScript", "js/States/game.js");

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
    },

    loadBgm: function () {
      game.load.audio('bell', 'content/sounds/bell.ogg');
      game.load.audio('countdowntimer', 'content/sounds/countdowntimer.ogg');
      game.load.audio('culthurt', 'content/sounds/culthurt.ogg');
      game.load.audio('cultstep', 'content/sounds/cultstep.ogg');
      game.load.audio('demonhit', 'content/sounds/demonhit.ogg');
      game.load.audio('demonroar', 'content/sounds/demonroar.ogg');
      game.load.audio('demonscream', 'content/sounds/demonscream.ogg');
      game.load.audio('demonstep', 'content/sounds/demonstep.ogg');
      game.load.audio('resconsume', 'content/sounds/resconsume.ogg');
      game.load.audio('rescourcepickup', 'content/sounds/rescourcepickup.ogg');
      game.load.audio('rockhit', 'content/sounds/rockhit.ogg');
      game.load.audio('scream', 'content/sounds/scream.ogg');
    },

    loadImages: function () {
        // Backgrounds

        game.load.image('background', 'content/bg/bg001.png');
        game.load.image("backgroundtrees", "content/bg/backgroundtrees.png");

        // Sprites
        //TEMP
        game.load.image('mage1', 'content/sprites/mage1.png');
        game.load.image('mage2', 'content/sprites/mage2.png');
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
        game.load.image("altar", "content/sprites/altar.png");
        game.load.image("goaty", "content/sprites/goaty-small.png");
        game.load.image("enter-key", "content/sprites/enter-key-small.png")

        //ESIMERKKI: game.load.spritesheet(key, sprite file, frame width, frame height, frame count);
        //TEMP
        game.load.spritesheet("test_spritesheet", "content/sprites/test_spritesheet.png", 32, 32, 2);
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
        game.state.add("Game", Game);
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
