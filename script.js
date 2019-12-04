//BlackJack
//By sahil

let suits = ['Hearts', 'Clubs', 'Spades', 'Diamonds'];

// DOM Variables
let textArea = document.getElementById('text-area'),
    newGameButton = document.getElementById('new-game-button'),
    hitButton = document.getElementById('hit-button'),
    stayButton = document.getElementById('stay-button');

// Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];
    
hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

newGameButton.addEventListener('click', function(){
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];
  
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
})
function createDeck()
{
  let deck=[];
  let values=[];
  for (let i=0; i<13 ; i++)
  {
    values[i]=i+1;
  }
  for(let suitIdx = 0; suitIdx < suits.length; suitIdx++)
  {
    for(valueIdx = 0; valueIdx <values.length; valueIdx++)
    {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      };
      deck.push(card);
    }
  }
  return deck;
}
function getNextCard()
{
  return deck.shift();
}
function getCardString(card)
{
  return card.value + ' of ' + card.suit;
}

function showStatus()
{
  if(!gameStarted)
  {
    textArea.innerText = "Welcome to BlackJack!";
    return;
  }
  // for(var i=0;i<deck.length; i++)
  // {
  //   textArea.innerText += '\n' + getCardString(deck[i]);
  // }
  let dealerCardString = '';
  for(let i=0;i<dealerCards.length;i++)
  {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }
  let playerCardString = '';
  for(let i=0;i<playerCards.length;i++)
  {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }
  
  updateScores();
  
  textArea.innerText =
  'Dealer has:\n ' +
  dealerCardString +
  '(score: '+ dealerScore+ ')\n\n '+
  
  'Player has:\n ' +
  playerCardString +
  '(score: '+ playerScore+ ')\n\n ';
  
  if(gameOver)
  {
    if(playerWon)
    {
      textArea.innerText += "YOU WIN!";
    }
    else
    {
      textArea.innerText += "DEALER WINS";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    
  }
}

function updateScores()
{
 dealerScore = getScore(dealerCards);
 playerScore = getScore(playerCards);
}

function shuffleDeck(deck)
{
 for(let i=0; i<deck.length; i++)
 {
   let swapIdx = Math.trunc(Math.random() * deck.length)
   let tmp = deck[swapIdx];
   deck[swapIdx] =deck [i];
   deck[i] = tmp;
 }
}
function getScore(cardArray)
{
  let score =0;
  let hasAce = false;
  for(let i= 0;i<cardArray.length;i++)
  {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if(card.value === 1)
    {
      hasAce =true;
    }
  }
  if(hasAce && score +10 <= 21)
  {
    return score +10;
  }
  return score;
}
function getCardNumericValue(card)
{
  if(card.value<10)
  {
    return card.value;
  }
  return 10;
}  

hitButton.addEventListener('click', function() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});
stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

function checkForEndOfGame()
{
  updateScores();
  
  if(gameOver)
  {
    while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21)
    {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }
  
  if(playerScore > 21){
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21)
  {
    playerWon =true;
    gameOver = true;
  }
  else if(gameOver) 
  {
    if(playerScore >dealerScore)
    {
      playerWon =true;
    }
    else
    {
      playerWon =false;
    }
  }
}
