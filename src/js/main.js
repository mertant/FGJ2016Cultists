var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game') 
var Main = function () {};

Main.prototype = {
    preload: function() {
        //preload assets of the splash screen here

        game.load.image("loadingspr", "content/bg/loading.png");
        game.load.script('splash',  'js/States/splash.js');
    },

    create: function() {
        game.state.add('Splash', Splash);
        game.state.start('Splash');
    }
}

game.state.add('Main', Main);
game.state.start('Main');
