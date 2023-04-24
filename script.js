'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

// Starting conditions
let scores, activePlayer, currentScore, Isplaying;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  Isplaying = true;

  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchplayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling Dice Functionality
btnRollEl.addEventListener('click', function () {
  if (Isplaying) {
    // Random zar belirleme
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Gelen zarları ekranda gösterme
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Zar 1 değilse currenta ekleme 1se switch player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // switch player
    else {
      switchplayer();
    }
  }
});

btnHoldEl.addEventListener('click', function () {
  if (Isplaying) {
    // Currenttaki score u totalscore a ekleme
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // TotalScore 100den büyük mü kontrol
    if (scores[activePlayer] >= 10) {
      Isplaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // Değilse switchplayer
      switchplayer();
    }
  }
});

// New game tıkladığımızda
btnNewEl.addEventListener('click', init);
