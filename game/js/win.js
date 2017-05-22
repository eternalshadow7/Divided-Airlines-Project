//Win: Winning game over screen, replay button
var Win = function(game) {};
Win.prototype =
{
    create: function()
    {
        game.music.stop();

        //Prompt for Replay
        game.add.text(230, 200, "You won: Restart?",
            {font: '30px Arial', fill: '#ffffff'});

        //Restart Button
        restartButton = game.add.button(400, 300, 'rewind', this.Again, this);
        restartButton.anchor.x = 0.5;
        restartButton.anchor.y = 0.5;

        //Background color, because color is good
        game.stage.backgroundColor = "#007700";
    },
    Again: function()
    {
        //Reset Variables
        isAttacking = false;
        isLeft = false;
        isRight = false;

        lock1 = false;
        lock1Pending = true;
        lock1Spawn = true;

        //Move to MainMenu
        game.state.start('MainMenu');
    }
};
