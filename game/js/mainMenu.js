//Main Menu: Gives play instructions, play button
var MainMenu = function(game) {};
MainMenu.prototype =
{
    create: function()
    {
        //Instructions
        game.add.text(230, 200, "Press/Hold SPACE to attack",
            {font: '30px Arial', fill: '#ffffff'});

        //Centered Play Button
        playButton = game.add.button(400, 300, 'play', this.playTime, this);
        playButton.anchor.x = 0.5;
        playButton.anchor.y = 0.5;

        //Background color, because color is good
        game.stage.backgroundColor = "#000077";
    },
    playTime: function()
    {
        //Starts game on button press
        game.state.start('Level1Part1');
    }
};
