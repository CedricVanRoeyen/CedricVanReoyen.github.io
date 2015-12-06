var MenuState = {
	create: function() {
		Background.create("menuBG");
		MenuScreen.create();
	},

	update: function() {
		MenuScreen.updateStartButton();
	}
};