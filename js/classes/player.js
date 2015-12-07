var awayFormWallFPS = 20;
var runningFPS = 25;
var vaultFPS = 30;

var walkingSpeed = 100;

var currentAnimation;

var playerGravity = 2000;
var jumpForce = 500;
var allowJump = false;
var playerJumping = false;

function Player(game) {};

Player.prototype.create = function() {
	//game.input.onDown.add(jump, this);
	//this.runningAnimation();
}
Player.prototype.update = function() {
	if (allowJump) {
		this.jump();
	}
}

Player.prototype.walkingAwayFromWallAnimation = function() {
	//away from wall
	this.playerAwayFromWallAnimation = game.add.sprite(36, 88, "walkAwayFromWall");
	this.playerAwayFromWallAnimation.animations.add("awayFormWall", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], awayFormWallFPS, false);
	this.playerAwayFromWallAnimation.animations.play("awayFormWall");
	currentAnimation = "awayFormWall";
	//enabling the physics for the animation awayFromWall
	game.physics.arcade.enable(this.playerAwayFromWallAnimation);

	//when walking away form wall is complete then set the velocity to 0
	this.playerAwayFromWallAnimation.events.onAnimationComplete.add(function() {
		this.playerAwayFromWallAnimation.body.velocity.x = 0;
		this.playerAwayFromWallAnimation.destroy();
		this.runningAnimation();
		this.kongVault();
		playerRunning = true;
		//Background.moveBackground();
	}, this);
}

/*
Player.prototype.startBlinkingAnimation = function() {
	//playerBlinking
	this.playerBlinking = game.add.sprite(this.playerAwayFromWallAnimation.x, this.playerAwayFromWallAnimation.y, "blinking");
	this.playerBlinking.animations.add("blinking", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 15, false);
	game.time.events.loop(Phaser.Timer.SECOND * 3, function() {
		this.playerBlinking.animations.play("blinking");
	}, this);
	currentAnimation = "blinking";
}
*/

Player.prototype.updateForPlayerFrame = function(frameToCheck) {
	if (this.playerAwayFromWallAnimation.frame == frameToCheck) {
		this.playerAwayFromWallAnimation.body.velocity.x = walkingSpeed;
	};
};


Player.prototype.runningAnimation = function() {
	this.playerRunning = game.add.sprite(this.playerAwayFromWallAnimation.x, this.playerAwayFromWallAnimation.y, "running");
	this.playerRunning.animations.add("running", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], runningFPS, true);
	this.playerRunning.animations.play("running");
	game.physics.arcade.enable(this.playerRunning);
	currentAnimation = "running";
	this.playerRunning.body.gravity.y = playerGravity;
	allowJump = true;
}

Player.prototype.kongVault = function() {
	this.kongVault = game.add.sprite(this.playerRunning.x - 60, this.playerRunning.y, "kongVault");
	this.kongVault.animations.add("kongVault", [7, 8, 9, 10, 11, 12, 13, 13, 13, 14, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], vaultFPS, false);
	this.kongVault.events.onAnimationComplete.add(function() {
			this.playerJumping = false;
			this.kongVault.alpha = 0;
			this.playerRunning.alpha = 1;
		}, this);
	game.physics.arcade.enable(this.kongVault);
	this.kongVault.alpha = 0;
}

Player.prototype.jump = function() {
	if (game.input.activePointer.isDown){
		this.kongVault.alpha = 1;
		this.playerRunning.alpha = 0;
		this.kongVault.animations.play("kongVault");
	}
}
