//The following variables are either booleans (true or false) or are numbers
var dealerBusted = false
var dealerAce = 0
var dealerNumber = 0
var playerBusted = false
var playerAce = 0
var playerNumber = 0
var start = false
var standed = false
var playerWins = 0
var dealerWins = 0
var gameOver = false;

//This function is called when the user presses the 'grab card' button
function canPullCard()
{
    //Check to see if start is true. If so apply the following
    if (!start)
    {
        /*When this runs, set the start boolean to true, play the
        'getCardPlayer' function twice, and play the 'canDealerDraw'
        function once*/
        start = true
        getCardPlayer()
        getCardPlayer()

        canDealerDraw()
    }
    /*In order for this to run the following three things must be true:
    The start boolean must be true, playerNumber number must be less than
    21, and the boolean standed must be false*/
    else if (start && playerNumber < 21 && !standed)
    {
        //Run the getCardPlayer function
        getCardPlayer()
    }
}

//This function runs whenever the player presses the 'stand' button
function stand()
{
    //For this to run the 'start' boolean must be true and the 'gameOver' boolean must be false
    if (start && !gameOver)
    {
        /*When this runs the following applies: 'standed' is set true, canDealerDraw function is run, and
        compareCards function is run*/
        standed = true

        canDealerDraw()

        compareCards()
    }
}

//This function plays whenever the player pulls a card
function getCardPlayer()
{
    /*Create a local variable. After making it, set it equal to a whole number between 1 (inclusive) to 14
    (exclusive)*/
    var cardValue

    cardValue = Math.floor(Math.random() * 13) + 1;

    //If the random value given to cardValue is 1 do the following
    if (cardValue == 1)
    {
        //Add one to the playerAce value and add 11 to playerNumber
        playerAce++
        playerNumber += 11
    }
    //If the random value given to cardValue is 10 or greater do the following
    else if (cardValue >= 10)
    {
        //Add 10 to the playerNumber value
        playerNumber += 10
    }
    //If the random value given to cardvalue is greater than 1 and less than 10 do the following
    else if (cardValue > 1 && cardValue < 10)
    {
        //Add playernumber to cardvalue
        playerNumber += cardValue
    }

    //If playerNumber is greater than 21 and playerAce is greater than 1
    if (playerNumber > 21 && playerAce > 0)
    {
        //Subtract 10 from playerNumber and subtract playerAce by 1
        playerNumber -= 10
        playerAce--
    }
    //If playerNumber is greater than 21 and playerAce is 0
    else if (playerNumber > 21 && playerAce == 0)
    {
        //Play the stand function
        stand()
    }

    //Play the updateValues function
    updateValues()
}

//This function is called when the player draws the first card and when the player stands or breaks
function canDealerDraw()
{
    //If the value of dealerNumber is less than 16 do the following
    if (dealerNumber < 16)
    {
        //Run the getCardDealer and updateValues function in that order.
        getCardDealer()

        updateValues()
    }
}

//This value runs whenever canDealerDraw is run and the current value of dealerNumber is 16
function getCardDealer()
{
    //The following is the same code as the getCardPlayer, however, the values are related to the dealer.
    var dealerCard

    dealerCard = Math.floor(Math.random() * 13) + 1;

    if (dealerCard == 1)
    {
        dealerAce++
        dealerNumber += 11
    }
    else if (dealerCard >= 10)
    {
        dealerNumber += 10
    }
    else if (dealerCard > 1 && dealerCard < 10)
    {
        dealerNumber += dealerCard
    }

    if (dealerNumber > 21 && dealerAce > 0)
    {
        dealerNumber -= 10
        dealerAce--
    }

    //This is not in the getCardPlayer function. This checks if standed is true. If so, run canDealerDraw.
    if (standed)
    {
        canDealerDraw()
    }
}

//This function runs after the dealer reaches 16 or higher
function compareCards()
{
    //If the playerNumber value is higher than the dealerNumber value do the following.
    if (playerNumber > dealerNumber)
    {
        //If the playerNumber is over 21, check the following
        if (playerNumber > 21)
        {
            //If the dealerNumber is also over 21, do the following
            if (dealerNumber > 21)
            {
                //Run the youTied function
                youTied()
            }
            //If the dealerNumber value is not over 21, do the following
            else
            {
                //Run the youLose function
                youLose()
            }
        }
        //If playerNumber is 21 or lower, do the following
        else 
        {
            //Run the youWin function
            youWin()
        }
    }
    //If the playerNumber value is lower than the dealerNumber value, check the following
    else if (playerNumber < dealerNumber)
    {
        //If dealerNumber is greater than 21, check the following
        if (dealerNumber > 21)
            {
                //If the playerNumber is also greater than 21, do the following
                if (playerNumber > 21)
                {
                    //Run the youTied function
                    youTied()
                }
                //If the playerNumber value is 21 or lower, do the following
                else
                {
                    //Run the youWin function
                    youWin()
                }
            }
            //If the dealerNumber is 21 or lower, do the following
            else 
            {
                //Run the youLose function
                youLose()
            }
    }
    //If the playerNumber and dealerNumber have the same value do the following
    else if (playerNumber == dealerNumber)
    {
        //Run the youTied function
        youTied()
    }
}

//Called in various ways, but is called when the player loses
function youLose()
{
    /*From top to bottom do the following: change the text of the text with the id of "gameStatus" to "You
    Lost," add 1 to the dealerWins value, change the text of the text with the id of "totalDealerWins" to
    "Dealer Wins" plus the value of dealerWins, and set the boolean 'gameOver' to true*/
    document.getElementById("gameStatus").innerHTML = "You Lost"

    dealerWins++

    document.getElementById("totalDealerWins").innerHTML = 
    "Dealer Wins: " + dealerWins

    gameOver = true
}

//Called in various ways, but is called when the player wins
function youWin()
{
    /*Similar to the you win function with the following differences: set the text with the id of
    "gameStatus" to "You Won," add one to playerWins, set the text with the id of "totalPlayerWins" to
    the value of playerWins, and just like the youLose function; set gameOver to true*/
    document.getElementById("gameStatus").innerHTML = "You Won"

    playerWins++

    document.getElementById("totalPlayerWins").innerHTML = 
    "Player Wins: " + playerWins

    gameOver = true
}

//Ran whenever the playerNumber and dealerNumber's values are equal when we check cards
function youTied()
{
    //Set the text with the id of "gameStatus" to "You Tied" and set the gameOver boolean to true
    document.getElementById("gameStatus").innerHTML = "You Tied"

    gameOver = true
}

//Ran whenever the reset button is pressed by the user
function reset()
{
    //Check to see if standed was false when the player called this function
    if (!standed)
    {
        //Run the youLose function
        youLose()
    }

    //Set all values, except the playerWins and dealerWins values, to the default values
    dealerBusted = false
    dealerAce = 0
    dealerNumber = 0
    playerBusted = false
    playerAce = 0
    playerNumber = 0
    start = false
    standed = false
    gameOver = false

    //Set the text with the id of "gameStatus" to "In Play"
    document.getElementById("gameStatus").innerHTML = "In Play"

    //Run the updateValues function
    updateValues()
}

//Ran at any time the values update relating to playerNumber, playerAce, dealerNumber, and dealerAce
function updateValues()
{
    //Document the corresponding tags to "Display text" plus corresponding value
    document.getElementById("playerCard").innerHTML = 
    "Player Value: " + playerNumber
    document.getElementById("totalPlayerAces").innerHTML = 
    "Total Aces: " + playerAce
    document.getElementById("dealerCard").innerHTML = 
    "Dealer Value: " + dealerNumber
    document.getElementById("totalDealerAces").innerHTML = 
    "Dealer Aces: " + dealerAce
}