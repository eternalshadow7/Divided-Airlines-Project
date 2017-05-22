//Game: Core game loop
var Level1Part1 = function(game) {};
Level1Part1.prototype =
{
    create: function()
    {
        //Make it rock in here
        game.music = game.add.audio('music');
        //game.music.play('', 1, 1, true);
        game.music.volume = 0.2;

        //Set some boundries
        game.world.setBounds(0,0,1600,600);

        //Create Objects and their Physics
        game.background = game.add.image(0,0,'background1');

        //Create door that triggers level transition
        door = game.add.sprite(game.world.width - 165, game.world.height - 280, 'door');
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
        lAttack = game.input.keyboard.addKey(Phaser.Keyboard.X);
        unlock = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    },
    update: function()
    {
        //Collision and overlap detection
        game.physics.arcade.overlap(player, enemy, attack, null, this);
        game.physics.arcade.overlap(player, door, transport1, null, this);

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
        if (player.body.y < 360)
        {
            player.body.y = 360;
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

        if (lAttack.justPressed(lAttack))
        {
            //Summon Weapon

        }

        if (unlock.isDown)
        {
            aliveEnemies = 0;
        }

        if ((player.body.x < 1200 && player.body.x > 1185) && lock1Pending)
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

            if (player.body.x > 1570)
            {
                player.body.x = 1570;
            }

            //Create enemies
            spawnEnemies();

            //Release lock
            if (aliveEnemies == 0 && !lock1Spawn)
            {
                lock1 = false;
                lock1Pending = false;
            }
        }
        else if (!lock1)
        {
            game.camera.deadzone = new Phaser.Rectangle(395, 400, 5, 200);
        }
    }
};
