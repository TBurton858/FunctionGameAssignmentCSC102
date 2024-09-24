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

function stand()
{
    if (start && !gameOver)
    {
        standed = true

        canDealerDraw()

        compareCards()
    }
}

function getCardPlayer()
{
    var cardValue

    cardValue = Math.floor(Math.random() * 13) + 1;

    if (cardValue == 1)
    {
        playerAce++
        playerNumber += 11
    }
    else if (cardValue >= 10)
    {
        playerNumber += 10
    }
    else if (cardValue > 1 && cardValue < 10)
    {
        playerNumber += cardValue
    }

    if (playerNumber > 21 && playerAce > 0)
    {
        playerNumber -= 10
        playerAce--
    }
    else if (playerNumber > 21 && playerAce == 0)
    {
        stand()
    }

    updateValues()
}

function canDealerDraw()
{
    if (dealerNumber < 16)
    {
        getCardDealer()

        updateValues()
    }
}

function getCardDealer()
{
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

    if (standed)
    {
        canDealerDraw()
    }
}

function compareCards()
{
    if (playerNumber > dealerNumber)
    {
        if (playerNumber > 21)
        {
            if (dealerNumber > 21)
            {
                youTied()
            }
            else
            {
                youLose()
            }
        }
        else 
        {
            youWin()
        }
    }
    else if (playerNumber < dealerNumber)
    {
        if (dealerNumber > 21)
            {
                if (playerNumber > 21)
                {
                    youTied()
                }
                else
                {
                    youWin()
                }
            }
            else 
            {
                youLose()
            }
    }
    else if (playerNumber == dealerNumber)
    {
        youTied()
    }
}

function youLose()
{
    document.getElementById("gameStatus").innerHTML = "You Lost"

    dealerWins++

    document.getElementById("totalDealerWins").innerHTML = 
    "Dealer Wins: " + dealerWins

    gameOver = true
}

function youWin()
{
    document.getElementById("gameStatus").innerHTML = "You Won"

    playerWins++

    document.getElementById("totalPlayerWins").innerHTML = 
    "Player Wins: " + playerWins

    gameOver = true
}

function youTied()
{
    document.getElementById("gameStatus").innerHTML = "You Tied"

    gameOver = true
}

function reset()
{
    if (!standed)
    {
        youLose()
    }

    dealerBusted = false
    dealerAce = 0
    dealerNumber = 0
    playerBusted = false
    playerAce = 0
    playerNumber = 0
    start = false
    standed = false
    gameOver = false

    document.getElementById("gameStatus").innerHTML = "In Play"

    updateValues()
}

function updateValues()
{
    document.getElementById("playerCard").innerHTML = 
    "Player Value: " + playerNumber
    document.getElementById("totalPlayerAces").innerHTML = 
    "Total Aces: " + playerAce
    document.getElementById("dealerCard").innerHTML = 
    "Dealer Value: " + dealerNumber
    document.getElementById("totalDealerAces").innerHTML = 
    "Dealer Aces: " + dealerAce
}