function MenuScreen(game) {};

MenuScreen.prototype.create = function() {
	//button
	this.startButton = game.add.sprite(game.world.centerX - 120, game.world.centerY - 80, "startButton");
	this.startButton.enableBody = true;
	this.startButton.inputEnabled = true;
	this.startButton.costumParams = {
		hover: false,
		pressed: false
	}
	//handling types of input
	this.startButton.events.onInputDown.add(function() {
		this.startButton.costumParams.hover = true; 
		this.startButton.costumParams.pressed = true; 
		game.state.start("game");
	}, this);
	this.startButton.events.onInputUp.add(function() {
		this.startButton.costumParams.hover = false; 
		this.startButton.costumParams.pressed = false;
	}, this);
	this.startButton.events.onInputOver.add(function() {
		this.startButton.costumParams.hover = true; 
		this.startButton.costumParams.pressed = false;
	}, this);
	this.startButton.events.onInputOut.add(function() {
		this.startButton.costumParams.hover = false; 
		this.startButton.costumParams.pressed = false;
	}, this);
};

MenuScreen.prototype.updateStartButton = function(){
	if (this.startButton.costumParams.hover) {
		this.startButton.frame = 1;
	}
	else if (this.startButton.costumParams.pressed) {
		this.startButton.frame = 1;
		game.state.start("game");
	}
	else {
		this.startButton.costumParams.pressed = false;
		this.startButton.frame = 0;
	}
}