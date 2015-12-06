var playerRunning = false;

//lantern
var lanternsPlaced;
var lanternGroup;
var lanternDistance = 300;

//floor
var moveFloor = false;

function Background(game) {};

Background.prototype.create = function(sprite) {
	//setting the background sprite
	this.bg = game.add.sprite(0, 0, sprite);
	game.physics.arcade.enable(this.bg);

	//initializing the next floor tile
	this.floorSpawn();
	//lantern group
	lanternGroup = game.add.group();
	//number of placed lanterns
	lanternsPlaced = 0;
	//adding the first lantern on scene
	this.addLantern(350);

	//allow the floor to move
	moveFloor = true;

	this.floorBoundingBox = game.add.sprite(0, 216, "floorBoundingBox");
	game.physics.arcade.enable(this.floorBoundingBox);
	this.floorBoundingBox.body.immovable = true;
	game.debug.spriteBounds(this.floorBoundingBox);
	
};

Background.prototype.update = function() {

	if (this.floorTile.x <= 0) {
		this.floorTile.body.velocity.x = 0;
		moveFloor = false;
		this.floorTile.x = 0;
	};
	
	if (playerRunning) {
		this.moveBackground();
	};	
};

Background.prototype.render = function() {
	game.debug.spriteBounds(this.floorBoundingBox);
}

Background.prototype.addNewLanterns = function() {
	var maxLanternDistance = 0;
	lanternGroup.forEach(function(item) {
		maxLanternDistance = item.x;
	});
	var nextLanternPosition = maxLanternDistance + lanternDistance;
	this.addLantern(nextLanternPosition);
}

//lantern spawing fucntion
Background.prototype.addLantern = function(x) {
	if (x < game.width*2) {
		lanternsPlaced ++;
		//create a new lantern object
		var lantern = new Lantern(game, x, game.height - 72);
			lantern.anchor.setTo(0.5, 1);
		//add the lantern to the game
		game.add.existing(lantern);
		//add the lantern to the group
		lanternGroup.add(lantern);
		//calculate the position of the next lantern
		var nextLanternPosition = x + lanternDistance;
		this.addLantern(nextLanternPosition);
	};
}

//moving the background
Background.prototype.moveBackground = function(){
	this.bg.body.velocity.x = -GAME_SPEED;
	
	if (moveFloor) {
		this.floorTile.body.velocity.x = -GAME_SPEED;
	}
}

//initializes the next floor tirle 
Background.prototype.floorSpawn = function(){
	this.floorTile = game.add.sprite(GAME_WIDTH, 0, "backgroundBaseTile");
	game.physics.arcade.enable(this.floorTile);
}


//the lantern object
Lantern = function(game, x, y) {
	//creating the lantern sprite
	Phaser.Sprite.call(this, game, x, y, "lantern1");
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.lanternNumber = lanternsPlaced;
};
Lantern.prototype = Object.create(Phaser.Sprite.prototype);
Lantern.prototype.constructor = Lantern;
//upfateing of the lantern
Lantern.prototype.update = function() {
	if (playerRunning) {
		this.body.velocity.x = -GAME_SPEED;
	}
	if (this.x <  - this.width) {
		this.destroy();
		Background.addNewLanterns();
	};
}