var BootState = {
	init: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		if(game.device.desktop) {
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		}	
		game.scale.pageAlignHorizontally = true; 
		game.scale.pageAlignVertically = true; 
		game.scale.parentIsWindow = true;

		game.add.plugin(Phaser.Plugin.Debug);

		Cocoon.Utils.setAntialias(false);
		//game.renderer.renderSession.roundPixels = false;
		Phaser.Canvas.setImageRenderingCrisp(game.canvas);  //for Canvas, modern approach
		Phaser.Canvas.setSmoothingEnabled(game.context, false);  //also for Canvas, legacy approach
		PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST; //for WebGL
		
		this.stage.backgroundColor = '#ffffff';
	},

	preload: function(){

	},

	create: function(){
		this.state.start("preload");
	}
};