//Create Game Object
var game = new Phaser.Game(800, 600, Phaser.AUTO);

//Global Variables
var player;
var playButton;
var restartButton;
var door;
var enemy;
var sAttack;
var isAttacking = false;
var isLeft = false;
var isRight = false;
var waveSize = 5;
var aliveEnemies = 0;

var lock1 = false;
var lock1Pending = true;
var lock1Spawn = true;

//Load game states
game.state.add('Load', Load);
game.state.add('MainMenu', MainMenu);
game.state.add('Level1Part1', Level1Part1);
game.state.add('Level1Part2', Level1Part2);
game.state.add('Win', Win);
game.state.add('Lose', Lose);

//Start Preloader
game.state.start('Load');

//Level transition
function transport1 ()
{
    if (!lock1)
    {
        game.state.start('Level1Part2');
    }
};

function transport2 ()
{
    if (!lock1)
    {
        game.state.start('Win');
    }
};

//Combat resolution
function attack ()
{
    if (isAttacking)
    {
        enemy.kill();
        //aliveEnemies -= 1;
    }
    else
    {
        game.state.start('Lose');
    }
}

//Spawn a wave of enemies
function spawnEnemies()
{
    if (lock1Spawn)
    {
        for (let i = 0; i < waveSize; i++)
        {
            aliveEnemies += 1;
        }
        lock1Spawn = false;
    }
}
