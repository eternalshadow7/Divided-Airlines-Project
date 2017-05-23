 //Enemy Prefab
 
 function Enemy(game, key, frame, x, y)
 {
    // call to Phaser.Sprite
    // new Sprite(game, x, y, key, frame)
    Phaser.Sprite.call(this, game, x, y, key, frame);
    
    // add properties
    this.anchor.set(.5);
 }
    
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function()
{
   // basic AI for enemy movement
   if(isLeft)
   {
      // left walking animation goes here
      if(this.x - player.x > enemyAtkRange) // if outside attack range
      {
         // move towards the player
         game.physics.arcade.moveToObject(this, player, speed);
      }
      else // if within attack range
      {
         // left attacking animation
         game.physics.arcade.overlap(this, player, attack, null, this);
      }
   }
   else // if isRight
   {
      // right walking animation goes here
      if(player.x - this.x > enemyAtkRange) // if outside attack range
      {
         // move towards the player
         game.physics.arcade.moveToObject(this, player, speed);
      }
      else // if within attack range
      {
         // right attacking animation
         game.physics.arcade.overlap(this, player, attack, null, this);
      }
   }
}