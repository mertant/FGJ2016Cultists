var Splash = function () {};

Splash.prototype = {

    loadScripts: function () {
        game.load.script("MenuScript", "js/States/menu.js");
        game.load.script("GameScript", "js/States/game.js");
        game.load.script("WorldScript", "js/Objects/world.js");
        game.load.script("WallScript", "js/Objects/wall.js");
        game.load.script("MageScript", "js/Objects/mage.js");
        game.load.script("AltarScript", "js/Objects/altar.js");
        game.load.script("ResourceScript", "js/Objects/resource.js");
        game.load.script("SkullResource", "js/Resources/skull.js");
        game.load.script("MercuryResource", "js/Resources/mercury.js");
        game.load.script("SulphurResource", "js/Resources/sulphur.js");
        game.load.script("ChickenResource", "js/Resources/chicken.js");
    },

    loadBgm: function () {
        //game.load.audio('bgm', 'content/audio/main.ogg');
    },

    loadImages: function () {
        // Backgrounds

        game.load.image('background', 'content/bg/bg001.png');
        game.load.image("backgroundtrees", "content/bg/backgroundtrees.png");

        // Sprites
        //TEMP
        game.load.image('mage1', 'content/sprites/mage1.png');
        game.load.image('mage2', 'content/sprites/mage2.png');

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
        this.sprite = game.add.sprite(0, 0, "loadingspr");
    },

    // Preload game assets
    preload: function () {
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

        setTimeout(function () {
          game.state.start("Menu");
      }, 1000);
    }
}
