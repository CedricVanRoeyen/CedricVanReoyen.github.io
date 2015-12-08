var minMailBoxDistance = 150;
var maxMailBoxDistance = 400;

var mailBoxesPlaced;
var mailBoxGroup;

var Objects = function(game) {};

Objects.prototype.create = function()
{
	mailBoxGroup = game.add.group();

	this.addNewMailBox(GAME_WIDTH + 20);
}

Objects.prototype.addNewMailBox = function(x) {
	if (x < game.width*2) {
		mailBoxesPlaced ++;
		//create a new lantern object
		var mailBox = new MailBox(game, x, game.height - (18*4) - (20 * 3));
		mailBox.anchor.setTo(0.5, 0);
		//add the lantern to the game
		game.add.existing(mailBox);
		//add the lantern to the group
		mailBoxGroup.add(mailBox);
		//calculate the position of the next lantern
		var nextMailBoxPosition = x + game.rnd.between(minMailBoxDistance, maxMailBoxDistance);
		this.addMailBoxes(nextMailBoxPosition);
	};
}

Objects.prototype.addMailBoxes = function() {
	var lastMailboxDistance = 0;
	mailBoxGroup.forEach(function(item) {
		lastMailboxDistance = item.x;
	});
	var nextMailBoxPosition = lastMailboxDistance + minMailBoxDistance + game.rnd.between(minMailBoxDistance, maxMailBoxDistance);
	this.addNewMailBox(nextMailBoxPosition);
}

MailBox = function(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, "mailBox");
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.mailBoxNumber = mailBoxesPlaced;
}

MailBox.prototype = Object.create(Phaser.Sprite.prototype);
MailBox.prototype.constructor = MailBox;
//upfateing of the lantern
MailBox.prototype.update = function() {
	if (playerRunning) {
		this.body.velocity.x = -GAME_SPEED;
	}
	if (this.x < - this.width) {
		this.destroy();
		Objects.addMailBoxes();
	};
}