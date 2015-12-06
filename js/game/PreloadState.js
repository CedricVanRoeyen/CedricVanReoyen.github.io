var PreloadState = {
	preload: function(){
		this.load.image("menuBG", "assets/backgroundMenu.png");
		this.load.image("gameBG", "assets/backgroundGame.png");
		this.load.image("lantern", "assets/lamp.png");
		this.load.image("lantern1", "assets/lantern1.png");
		this.load.image("backgroundBaseTile", "assets/backgroundBaseTile.png");
		this.load.image("floorBoundingBox", "assets/floorBoundingBox.png");
		this.load.spritesheet("startButton", "assets/startButton.png", 102, 30);
		this.load.spritesheet("walkAwayFromWall", "assets/walkAwayFromWall.png", 80, 128);
		this.load.spritesheet("walking", "assets/walking.png", 80, 128);
		this.load.spritesheet("blinking", "assets/blinking.png", 80, 128);
		this.load.spritesheet("running", "assets/running.png", 80, 128);
	},

	create: function(){
		this.state.start("menu");
	}
};