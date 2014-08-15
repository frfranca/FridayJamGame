var FridayGameJam = FridayGameJam || {};

FridayGameJam.Play = new Kiwi.State('Play');


FridayGameJam.Play.create = function() {

  	this.player = new FridayGameJam.Managers.Player(this);
  	this.ai = new FridayGameJam.Managers.AI(this, 0);
 	this.hud = new FridayGameJam.Managers.HUD(this, this.ai, this.player);

  this.level = new FridayGameJam.GameObjects.Level( this, this.textures.background, 0,0 );
  this.addChild( this.level );

  	this.player.addToStage();
  	this.ai.addToStage();
  	this.hud.addToStage();
  this.depthRect = new Kiwi.GameObjects.StaticImage(this, this.textures["depth-rect"], this.level.gameArea.left, this.level.gameArea.top );
  this.ballGroup.addChild( this.depthRect );

  this.ball = new FridayGameJam.GameObjects.Ball( this, this.textures.ball, this.game.stage.width / 2 - 23, this.game.stage.height / 2 - 23, this.level.gameDepth.front, this.level );
  this.ballGroup.addChild( this.ball );
}



FridayGameJam.Play.update = function () { 

  //Super method update loop
  Kiwi.State.prototype.update.call( this );

  this.hud.update();

  // AI controls

  // Ball physics
  //this.ball.acceleration.x = 0.1 * Math.sin(this.game.idealFrame * 0.01);	// Test delta vee
  this.ball.update( this.player, this.ai );

  // Scaling group control
  var scaleFactor = this.level.gameDepth.front / this.ball.z;
  this.ballGroup.scale = scaleFactor;
  this.ballGroup.x = (this.game.stage.width / 2) * (1 - scaleFactor);
  this.ballGroup.y = (this.game.stage.height / 2) * (1 - scaleFactor);
}


FridayGameJam.Play.shutDown = function() {
	this.game.stage.container.style.cursor = '';
}

