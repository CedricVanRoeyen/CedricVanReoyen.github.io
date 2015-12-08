var Runner = Runner || {};

var GAME_WIDTH = 512;
var GAME_HEIGHT = 288;

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.CANVAS, "container");

var Background = new Background(game);
var MenuScreen = new MenuScreen(game);
var Player = new Player(game);
var Objects = new Objects(game);

game.state.add("boot", BootState);
game.state.add("preload", PreloadState);
game.state.add("menu", MenuState);
game.state.add("game", GameState);
game.state.start("boot");