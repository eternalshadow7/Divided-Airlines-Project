//Game: Core game loop
var Level1 = function(game) {};
Level1.prototype =
{
    create: function()
    {
        //Set some boundries
        game.world.setBounds(0,0,2400,600);

        //Create Objects and their Physics
        game.background = game.add.image(0,0,'background');


        //Create a custom timer
        levelTimer = game.time.create();

        //Create a delayed event 1m and 30s from now
        levelTimerEvent = levelTimer.add(Phaser.Timer.MINUTE * 0 + Phaser.Timer.SECOND *30, this.endLevelTimer, this);

        //Start the timer
        levelTimer.start();

        //Create door that triggers level transition
        door = game.add.sprite(game.world.width - 65, game.world.height - 100, 'door');
        game.physics.arcade.enable(door);
        door.body.immovable = true;

        //Make Player
        player = game.add.sprite(16, game.world.height - 24, 'dude');
        player.anchor.x = 0.5;
        player.anchor.y = 0.5;
        game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.75, 0.75);

        //Player Animation
        player.animations.add('left', [0, 3], 10, true);
        player.animations.add('right', [5, 8], 10, true);

        //Player properties
        game.physics.arcade.enable(player); //Physics for Player
        player.body.collideWorldBounds = true;

        //Make Enemy
        enemy = game.add.sprite(612, game.world.height - 11, 'star');
        enemy.anchor.x = 0.5;
        enemy.anchor.y = 0.5;

        //Enemy Animation (Do this later)
        //enemy.animations.add('eLeft', [0,1], 10, true);
        //enemy.animations.add('eRight', [2,3], 10, true);

        //Enemy properties
        game.physics.arcade.enable(enemy);

        //Input manager
        cursors = game.input.keyboard.createCursorKeys();
        sAttack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },


    update: function()
    {
        //Collision and overlap detection
        game.physics.arcade.overlap(player, enemy, attack, null, this);
        game.physics.arcade.overlap(player, door, transport, null, this);

        //Enemy move toward player
        game.physics.arcade.moveToObject(enemy, player, 100);

        //Movement Controls
        player.body.velocity.x = 0; //Default
        player.body.velocity.y = 0;

        if (cursors.left.isUp && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp)
        {
            player.animations.stop();
        }
        if (cursors.left.isDown) //Left
        {
            player.body.velocity.x = -150;
            player.animations.play('left');
            isLeft = true;
            isRight = false;
        }
        if (cursors.right.isDown) //Right
        {
            player.body.velocity.x = 150;
            player.animations.play('right');
            isRight = true;
            isLeft = false;
        }
        if (cursors.up.isDown) //Up
        {
            player.body.velocity.y = -150;

            if (isRight)
            {
                player.animations.play('right');
            }
            else
            {
                player.animations.play('left');
            }
        }
        if (cursors.down.isDown) //Down
        {
            player.body.velocity.y = 150;

            if (isRight)
            {
                player.animations.play('right');
            }
            else
            {
                player.animations.play('left');
            }
        }

        //Floor Constraints
        if (player.body.y < 400)
        {
            player.body.y = 400;
        }

        //Activate rage mode on button press (attack)
        if (sAttack.isDown)
        {
            player.tint = 0x770000;
            isAttacking = true;
        }
        else
        {
            player.tint = 0xFFFFFF;
            isAttacking = false;
        }

        if (player.body.x < 1250 && player.body.x > 1200)
        {
            lock1 = true;
        }

        //Screen Lock 1
        if (lock1 && lock1Pending)
        {
            game.camera.deadzone = new Phaser.Rectangle(0, 0, 800, 600);

            //Lock bounds
            if (player.body.x < 800)
            {
                player.body.x = 800;
            }

            if (player.body.x > 1600)
            {
                player.body.x = 1600;
            }

            //Create enemies
            spawnEnemies();

            //Release lock
            if (aliveEnemies == 0)
            {
                lock1 = false;
                lock1Pending = false;
            }
        }
        else if (!lock1)
        {
            game.camera.deadzone = new Phaser.Rectangle(395, 400, 5, 200);
        }
    },

	render: function() {

    //Prints out the timer
		if (levelTimer.running) {
            game.debug.text("Time left: "+this.formatLevelTime(Math.round((levelTimerEvent.delay - levelTimer.ms) / 1000)), 32, 32, "#ffffff");
        }
    //If the timer reaches 0, print this out
        else {
            //goToLoseState();
            //game.state.start('Lose');
            game.debug.text("Time's up!", 32,32, '#ffffff');
        }
    },
    endLevelTimer: function() {
        //This stops the timer when the delayed event triggers
        //levelTimer.stop();
        goToLoseState();
    },
    formatLevelTime: function(s) {
        //This converts the seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    }
};
