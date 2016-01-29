var Splash = function () {};

Splash.prototype = {

    loadScripts: function () {
        game.load.script("PlantScript", "js/Objects/plant.js");
        game.load.script("MenuScript", "js/States/menu.js");
        game.load.script("GameScript", "js/States/game.js");
        
    },

    loadBgm: function () {
        //game.load.audio('bgm', 'content/audio/main.ogg');
    },

    loadImages: function () {
        // Backgrounds
        //game.load.image('gamebg', 'content/bg/wholebg.jpg');

        // Sprites
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