var GameState = {
	create: function() {
		Background.create("gameBG");
		Player.create();
		Player.walkingAwayFromWallAnimation();
	},

	update: function() {
		game.physics.arcade.collide(Player.playerRunning, Background.floorBoundingBox);
		Background.update();
		Player.updateForPlayerFrame(8);
		Player.update();
		Background.render();
	}
};