// Game state - Yosefs del 
let currentScore = 0;
let activePlayer = 0; // 0 for player 1, 1 for player 2
let totalScores = [0, 0]; // Scores for each player
const winningScore = 56; // Set the score required to win

// Referens till alla element i DOM - Yosefs och Hassans del
const btnRoll = document.querySelector('.btnRoll');
const btnHold = document.querySelector('.btnHold');
const newGame = document.querySelector('#newGame');
const diceImage = document.querySelector('#diceImage');
const currentText = document.querySelector('#current');
const firstPoint = document.querySelector('#firstPoint');
const secondPoint = document.querySelector('#secondPoint');

const playerOne = document.querySelector('#playerOne');
const playerTwo = document.querySelector('#playerTwo');

const playerText = document.querySelector('#playerText');
const pointText = document.querySelector('#pointText');


// Objekt med bilder, varje bild ska ha en key med nummer, valuen ska vara src - Yosefs del igen
const diceImages = {
  1: 'assets/1.png',
  2: 'assets/2.png',
  3: 'assets/3.png',
  4: 'assets/4.png',
  5: 'assets/5.png',
  6: 'assets/6.png'
};

// Ändra spelare - Salihs del
const switchPlayer = () => {
  // Nollställ poäng
  currentScore = 0; 
  // aktiv spelare
  activePlayer = 1 - activePlayer;
  // uppdatera spelarens underline och fontwheight
  updatePlayerHighlight(); 
  currentText.textContent = `Player ${activePlayer + 1}'s turn.`;
  playerText.textContent = '';
  pointText.textContent = '';
};

// Visa vems tur det är - Salih
const updatePlayerHighlight = () => {
  if (activePlayer === 0) {
    playerOne.classList.add('active');
    playerTwo.classList.remove('active');
  } else {
    playerTwo.classList.add('active');
    playerOne.classList.remove('active');
  }
};

// Rulla tärning
btnRoll.addEventListener('click', () => {
  diceImage.style.display = 'block';
  const dice = rollDice();

  if (dice === 1) {
    // När tärningen visar numret 1 då ska man vara så fin och byta - Hassan
    currentText.textContent = `Player ${activePlayer + 1} rolled a 1! Switching turns.`;
    switchPlayer();
  } else {
    currentScore += dice;
    currentText.textContent = '';
    playerText.textContent = `Player ${activePlayer + 1} rolled ${dice}`
    pointText.textContent = `Current turn score: ${currentScore}.`;
  }
});

// Hold knappen - Yosef
btnHold.addEventListener('click', () => {
  totalScores[activePlayer] += currentScore; 
  currentScore = 0;

  if (activePlayer === 0) {
    firstPoint.textContent = totalScores[0];
  } else {
    secondPoint.textContent = totalScores[1];
  }

  // Se vem som vinner
  if (totalScores[activePlayer] >= winningScore) {
    playerText.textContent = '';
    pointText.textContent = '';
    currentText.textContent = `Player ${activePlayer + 1} wins!`;
    btnRoll.disabled = true;
    btnHold.disabled = true;
  } else {
    switchPlayer();
  }
});

// När man startar ett nytt spel
newGame.addEventListener('click', () => {
  diceImage.style.display = 'none';
  totalScores = [0, 0];
  activePlayer = 0;
  currentScore = 0;

  firstPoint.textContent = '0';
  secondPoint.textContent = '0';
  currentText.textContent = '';
  diceImage.src = '';

  btnRoll.disabled = false;
  btnHold.disabled = false;
// Highlight the first player
  updatePlayerHighlight(); 
});

// Roll dice function
const rollDice = () => {
  const diceValue = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
  diceImage.src = diceImages[diceValue]; // Set the dice image
  return diceValue;
};

// Initialize the game
updatePlayerHighlight(); 
