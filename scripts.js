//declarations
let box = $(".square");
let allBoxes = $(".square").toArray();

let resetBtn = $(".btn");
let alert = $(".alert");

let topRow = $(".top").toArray();
let middleRow = $(".middle").toArray();
let bottomRow = $(".bottom").toArray();
let leftCol = $(".left").toArray();
let centerCol = $(".center").toArray();
let rightCol = $(".right").toArray();
let diagonal1 = $(".diag1").toArray();
let diagonal2 = $(".diag2").toArray();

let allArrays = [topRow, middleRow, bottomRow, leftCol, centerCol, rightCol, diagonal1, diagonal2];

class Game //keeps track of game rules
{
    constructor(player1, player2)
    {
        this.player1 = player1; //player 1's symbol (probably X)
        this.player2 = player2; //player 2's symbol (probably O)

        this.turn = player1;
        this.winner = "";
        this.tie = false;

        this.turnCount = 1;

        alert.text("Welcome to Tic-Tac-Toe! It is now " + this.turn + "'s turn.")
    }

    changeTurn() //toggles between player turns
    {
        if(this.turn == this.player1)
        {
            this.turn = this.player2;
        }
        else
        {
            this.turn = this.player1;
        }
        this.turnCount++; //increase turn count
        // console.log("It is now " + this.turn + "'s turn.");
        alert.text("It is now " + this.turn + "'s turn.");
    }

    checkLine(lineArray)
    {
        //add every symbol in the given lineArray to a string
        let line = "";
        lineArray.forEach(function(box)
        {
            line += box.textContent;
        });

        //check if the string is the same as 3 Xs or 3 Os (or whatever symbol each player is using)
        if(line == (this.player1 + this.player1 + this.player1) || line == (this.player2 + this.player2 + this.player2))
        {
            //if true, that player wins
            this.winner = this.turn;
            console.log(this.winner + " wins!");
            alert.text(this.winner + " wins!");

            //highlight the winning row
            lineArray.forEach(function(text)
            {
                text.style.color = "rgb(119,221,119)";
            });
        }
    }

    checkWinner() //checks every line to see if a player has claimed 3 boxes in a line
    {
        //check all columns, rows, and diagonals
        allArrays.forEach(function(line)
        {
            game.checkLine(line);
        });

        //check for tie:
        //if it's been 9 turns and there's no winner
        if(this.turnCount >= 9 && this.winner == "")
        {
            // console.log("It's a tie!");
            alert.text("It's a tie!");
            this.tie = true;
        }
    }
}

box.on("click", function() //if you click a box
{
    //check if game is even still going on
    if(game.winner == "" && game.tie == false)
    {
        //check if the box already has either player's symbol
        if($(this).text() == game.player1 || $(this).text() == game.player2)
        {
            console.log("That box is already claimed!");
        }
        else
        {
            //changes the box's text to the symbol of whoever's turn it is
            $(this).text(game.turn);

            //sets the color of the symbol depending on the player
            if(game.turn == game.player1)
            {
                $(this).css("color", "rgb(250, 160, 160");
            }
            else
            {
                $(this).css("color", "rgb(167, 199, 231)");
            }

            //check all winning lines to see if there is a winner
            game.checkWinner();

            //if no winner, change turn
            if(game.winner == "" && game.tie == false)
            {
                game.changeTurn();
            }
        }
    }    
});

resetBtn.on("click", function() // button that resets the game
{
    //clear all squares
    allBoxes.forEach(function(box)
    {
        box.textContent = "";
    });

    //reset all game properties
    game.turn = game.player1;
    game.winner = "";
    game.tie = false;
    game.turnCount = 1;
    alert.text("Welcome to Tic-Tac-Toe! It is now " + game.turn + "'s turn.");

});

// start the game!
let game = new Game("X", "O");