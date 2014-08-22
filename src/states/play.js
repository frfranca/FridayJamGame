var FridayGameJam = FridayGameJam || {};

FridayGameJam.Play = new Kiwi.State('Play');


FridayGameJam.Play.create = function() {

  	this.player = new FridayGameJam.Managers.Player(this);
  	this.ai = new FridayGameJam.Managers.AI(this, 0);
 	  this.hud = new FridayGameJam.Managers.HUD(this, this.ai, this.player);

    // Background
    this.level = new FridayGameJam.GameObjects.Level( this, this.textures.background, 0,0 );
    this.addChild( this.level );
    // Create pulsar field
    this.game.renderer.addSharedRendererClone( "TextureAtlasRenderer", "AdditiveTAR" );
    this.additiveRenderer = this.game.renderer.requestSharedRenderer("AdditiveTAR");
    this.additiveRenderer.blendMode.setMode("ADD");
    this.levelPulse = new Kiwi.GameObjects.Sprite( this, this.textures.background, 0,0 );
    this.levelPulse.glRenderer = this.additiveRenderer;
    this.addChild(this.levelPulse);

    // Ball and perspective
    this.ballGroup = new Kiwi.Group( this );
    this.ballGroup.anchorPointX = this.game.stage.width / 2;
    this.ballGroup.anchorPointY = this.game.stage.height / 2;
    this.depthRect = new Kiwi.GameObjects.StaticImage(this, this.textures["depth-rect"], this.level.gameArea.left, this.level.gameArea.top );
    this.ball = new FridayGameJam.GameObjects.Ball( this, this.textures.ball, this.game.stage.width / 2 - 23, this.game.stage.height / 2 - 23, this.level.gameDepth.front + (this.level.gameDepth.back - this.level.gameDepth.front) / 2, this.level );


    this.ai.addToStage();
    this.addChild( this.ballGroup );
    this.ballGroup.addChild( this.depthRect );
    this.ballGroup.addChild( this.ball );
    this.player.addToStage();
    this.hud.addToStage();
}



FridayGameJam.Play.update = function () { 

  //Super method update loop
  Kiwi.State.prototype.update.call( this );

  this.hud.update();

  // AI controls
  this.ai.run();

  // Ball physics
  //this.ball.acceleration.x = 0.1 * Math.sin(this.game.idealFrame * 0.01);	// Test delta vee
  this.ball.run( this.player, this.ai );


  // Scaling group control
  this.ballGroup.scale = this.level.gameDepth.front / this.ball.z;

  // Cosmetic animation
  this.level.run();
  this.levelPulse.alpha = this.level.glow;
}


FridayGameJam.Play.shutDown = function() {
	this.game.stage.container.style.cursor = '';
}

