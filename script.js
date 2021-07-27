import 'core-js/stable';
import dice1 from 'url:/img/dice-1.png';
import dice2 from 'url:/img/dice-2.png';
import dice3 from 'url:/img/dice-3.png';
import dice4 from 'url:/img/dice-4.png';
import dice5 from 'url:/img/dice-5.png';
import dice6 from 'url:/img/dice-6.png';

let playerOneScoreEl = document.getElementById('score--0');
let playerTwoScoreEl = document.getElementById('score--1');
let currentPlayerOneEl = document.querySelector('#current--0');
let currentPlayerTwoEl = document.querySelector('#current--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
const buttonNew = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');

//if game finished , stop the working of buttons
let gameFinished = true;

//function for switching the player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  scoreCounter = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

//when game starts , scores are 0 and dice is hidden
playerOneScoreEl.textContent = 0;
playerTwoScoreEl.textContent = 0;

dice.classList.add('hidden');

let totalScore = [0, 0];
let scoreCounter = 0;
let activePlayer = 0;

//when dice rolls
const rollDice = function () {
  if (gameFinished) {
    let randomDice = Math.trunc(Math.random() * 6 + 1);

    dice.classList.remove('hidden');
    if (randomDice === 1) dice.src = `${dice1}`;
    if (randomDice === 2) dice.src = `${dice2}`;
    if (randomDice === 3) dice.src = `${dice3}`;
    if (randomDice === 4) dice.src = `${dice4}`;
    if (randomDice === 5) dice.src = `${dice5}`;
    if (randomDice === 6) dice.src = `${dice6}`;

    //when number of dice is not one
    if (randomDice !== 1) {
      scoreCounter += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        scoreCounter;
    } else {
      //when number is one, switch the player
      switchPlayer();
    }
  }
};

buttonRoll.addEventListener('click', rollDice);

//when hold button is pressed
const holdPressed = function () {
  if (gameFinished) {
    //add and display the score of active player
    totalScore[activePlayer] += scoreCounter;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    //check for score >=100 , if yes then finish the game
    if (totalScore[activePlayer] >= 100) {
      gameFinished = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch the player
      switchPlayer();
    }
  }
};

buttonHold.addEventListener('click', holdPressed);

//when reset button is pressed
buttonNew.addEventListener('click', function () {
  gameFinished = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  activePlayer = 0;
  totalScore = [0, 0];
  scoreCounter = 0;
  playerOneScoreEl.textContent = 0;
  playerTwoScoreEl.textContent = 0;
  currentPlayerOneEl.textContent = 0;
  currentPlayerTwoEl.textContent = 0;
  dice.classList.add('hidden');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
});
