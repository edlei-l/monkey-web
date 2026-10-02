let gorillaNumber = 0;
const  erroeEl=document.getElementById('follwe-but')
const countEl = document.getElementById('count-el');
const saveEl = document.getElementById('save-el');

// 1. 分别创建加数音效和保存音效
const incrementSound = new Audio('music/coin.mp3');
const saveSound = new Audio('music/wow.mp3');
function increment() {
    // 播放点击/计数音效
    incrementSound.currentTime = 0;
    incrementSound.play();

    gorillaNumber++;
    console.log(gorillaNumber);
    countEl.textContent = gorillaNumber;
}

function save() {
    // 播放保存音效
    saveSound.currentTime = 0;
    saveSound.play();

    // 拼接字符串并更新记录
    let saveCountStr = gorillaNumber + ' - ';
    saveEl.textContent += saveCountStr;

    // 归零并刷新界面
    gorillaNumber = 0;
    countEl.textContent = gorillaNumber;
}
function HumanMade_error(){
    erroeEl.textContent='kibo don\'t have ins'
}
/* =========================================================
   🦍 Gorilla 24 Points Game
   ========================================================= */

// -------------------------
// 游戏变量
// -------------------------

let playerCards = [];
let gorillaCards = [];

let playerScore = 0;
let gorillaScore = 0;

let gamePoints = 100;
let currentBet = 0;

let gameStarted = false;
let playerStopped = false;


// -------------------------
// 获取 HTML 元素
// -------------------------

const startGameBtn =
  document.getElementById("start-game-btn");

const drawCardBtn =
  document.getElementById("draw-card-btn");

const stopBtn =
  document.getElementById("stop-btn");

const playerCardsEl =
  document.getElementById("player-cards");

const gorillaCardsEl =
  document.getElementById("gorilla-cards");

const playerScoreEl =
  document.getElementById("player-score");

const gorillaScoreEl =
  document.getElementById("gorilla-score");

const gameMessageEl =
  document.getElementById("game-message");

const gamePointsEl =
  document.getElementById("game-points");

const betInput =
  document.getElementById("bet-input");

const betBtn =
  document.getElementById("bet-btn");

const gameHistoryEl =
  document.getElementById("game-history-text");


// -------------------------
// 🔊 音效
// -------------------------

let audioCtx = null;

function initAudio() {

  if (!audioCtx) {
    audioCtx = new (
      window.AudioContext ||
      window.webkitAudioContext
    )();
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}


function playTone(
  frequency,
  duration,
  type = "sine",
  volume = 0.08
) {

  initAudio();

  const oscillator =
    audioCtx.createOscillator();

  const gainNode =
    audioCtx.createGain();

  oscillator.type = type;

  oscillator.frequency.value =
    frequency;

  gainNode.gain.setValueAtTime(
    volume,
    audioCtx.currentTime
  );

  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + duration
  );

  oscillator.connect(gainNode);

  gainNode.connect(audioCtx.destination);

  oscillator.start();

  oscillator.stop(
    audioCtx.currentTime + duration
  );
}


function playCardSound() {

  playTone(
    500,
    0.08,
    "square",
    0.05
  );

  setTimeout(function () {

    playTone(
      700,
      0.08,
      "square",
      0.05
    );

  }, 80);
}


function playStartSound() {

  playTone(
    400,
    0.1,
    "sine",
    0.08
  );

  setTimeout(function () {

    playTone(
      550,
      0.1,
      "sine",
      0.08
    );

  }, 100);

  setTimeout(function () {

    playTone(
      750,
      0.15,
      "sine",
      0.08
    );

  }, 200);
}


function playGorillaSound() {

  playTone(
    120,
    0.18,
    "sawtooth",
    0.1
  );

  setTimeout(function () {

    playTone(
      90,
      0.25,
      "sawtooth",
      0.1
    );

  }, 180);
}


function playWinSound() {

  playTone(
    500,
    0.12,
    "sine",
    0.08
  );

  setTimeout(function () {

    playTone(
      650,
      0.12,
      "sine",
      0.08
    );

  }, 120);

  setTimeout(function () {

    playTone(
      800,
      0.2,
      "sine",
      0.08
    );

  }, 240);
}


function playLoseSound() {

  playTone(
    180,
    0.15,
    "sawtooth",
    0.1
  );

  setTimeout(function () {

    playTone(
      120,
      0.25,
      "sawtooth",
      0.1
    );

  }, 150);
}


function playDrawSound() {

  playTone(
    400,
    0.15,
    "triangle",
    0.07
  );

  setTimeout(function () {

    playTone(
      400,
      0.15,
      "triangle",
      0.07
    );

  }, 180);
}


// -------------------------
// 🃏 生成 1~10 的牌
// -------------------------

function getRandomCard() {

  return Math.floor(
    Math.random() * 10
  ) + 1;
}


// -------------------------
// 计算点数
// -------------------------

function calculateScore(cards) {

  let total = 0;

  for (let i = 0; i < cards.length; i++) {

    total += cards[i];

  }

  return total;
}


// -------------------------
// 显示玩家牌
// -------------------------

function showPlayerCards() {

  playerCardsEl.innerHTML = "";

  for (
    let i = 0;
    i < playerCards.length;
    i++
  ) {

    const card =
      document.createElement("div");

    card.className = "card";

    card.textContent =
      playerCards[i];

    playerCardsEl.appendChild(card);
  }
}


// -------------------------
// 显示大猩猩牌
// -------------------------

function showGorillaCards() {

  gorillaCardsEl.innerHTML = "";

  for (
    let i = 0;
    i < gorillaCards.length;
    i++
  ) {

    const card =
      document.createElement("div");

    card.className = "card";

    card.textContent =
      gorillaCards[i];

    gorillaCardsEl.appendChild(card);
  }
}


// -------------------------
// 更新分数
// -------------------------

function updateScores() {

  playerScoreEl.textContent =
    playerScore;

  gorillaScoreEl.textContent =
    gorillaScore;

  gamePointsEl.textContent =
    gamePoints;
}


// =========================================================
// 🎮 开始 24 点游戏
// =========================================================

function startGame() {

  if (gameStarted) {
    return;
  }


  const bet =
    Number(betInput.value);


  // 检查虚拟积分
  if (
    !Number.isInteger(bet) ||
    bet <= 0
  ) {

    gameMessageEl.textContent =
      "Please enter valid virtual points.";

    return;
  }


  if (bet > gamePoints) {

    gameMessageEl.textContent =
      "Not enough Gorilla Points!";

    return;
  }


  // 开始音效
  playStartSound();


  // 扣除虚拟积分
  gamePoints -= bet;

  currentBet = bet;


  // 重置游戏
  playerCards = [];

  gorillaCards = [];

  playerScore = 0;

  gorillaScore = 0;

  gameStarted = true;

  playerStopped = false;


  // 玩家开始获得两张牌
  playerCards.push(
    getRandomCard()
  );

  playerCards.push(
    getRandomCard()
  );


  playerScore =
    calculateScore(playerCards);


  // 更新页面
  showPlayerCards();

  showGorillaCards();

  updateScores();


  gameMessageEl.textContent =
    "Get as close to 24 as possible!";


  // 按钮
  startGameBtn.disabled = true;

  betBtn.disabled = true;

  drawCardBtn.disabled = false;

  stopBtn.disabled = false;


  // 初始已经超过24
  if (playerScore > 24) {

    gameMessageEl.textContent =
      "💥 You went over 24! Kibo wins!";

    finishGame("lose");

    return;
  }


  // 初始刚好24
  if (playerScore === 24) {

    gameMessageEl.textContent =
      "🎉 Perfect 24! Stop and face Kibo!";

  }
}


// =========================================================
// 🃏 玩家抽牌
// =========================================================

function drawCard() {

  if (!gameStarted) {
    return;
  }

  if (playerStopped) {
    return;
  }


  // 抽牌音效
  playCardSound();


  const newCard =
    getRandomCard();


  playerCards.push(
    newCard
  );


  playerScore =
    calculateScore(playerCards);


  showPlayerCards();

  updateScores();


  // -------------------------
  // 超过24
  // -------------------------

  if (playerScore > 24) {

    gameMessageEl.textContent =
      "💥 You went over 24! Kibo wins!";

    finishGame("lose");

    return;
  }


  // -------------------------
  // 正好24
  // -------------------------

  if (playerScore === 24) {

    gameMessageEl.textContent =
      "🎉 Perfect 24! Face Kibo!";

    playerStopped = true;

    drawCardBtn.disabled = true;

    return;
  }


  // -------------------------
  // 普通情况
  // -------------------------

  gameMessageEl.textContent =
    "Your score: " +
    playerScore +
    ". Draw again or stop.";
}


// =========================================================
// 🛑 停止抽牌
// =========================================================

function stopGame() {

  if (!gameStarted) {
    return;
  }


  playerStopped = true;

  drawCardBtn.disabled = true;

  stopBtn.disabled = true;


  gameMessageEl.textContent =
    "🦍 Kibo is thinking...";


  // 给大猩猩一点反应时间
  setTimeout(function () {

    gorillaTurn();

  }, 500);
}


// =========================================================
// 🦍 Kibo 大猩猩回合
// =========================================================

function gorillaTurn() {

  if (!gameStarted) {
    return;
  }


  playGorillaSound();


  gorillaCards = [];

  gorillaScore = 0;


  // Kibo 至少抽到20分
  while (gorillaScore < 20) {

    const newCard =
      getRandomCard();

    gorillaCards.push(
      newCard
    );

    gorillaScore =
      calculateScore(gorillaCards);
  }


  showGorillaCards();

  updateScores();


  // -------------------------
  // Kibo 超过24
  // -------------------------

  if (gorillaScore > 24) {

    gameMessageEl.textContent =
      "🦍 Kibo went over 24! You win!";

    finishGame("win");

    return;
  }


  // -------------------------
  // 玩家分数更接近24
  // -------------------------

  if (
    playerScore > gorillaScore
  ) {

    gameMessageEl.textContent =
      "🎉 You win! Closer to 24!";

    finishGame("win");

    return;
  }


  // -------------------------
  // Kibo 更接近24
  // -------------------------

  if (
    playerScore < gorillaScore
  ) {

    gameMessageEl.textContent =
      "🦍 Kibo wins! Closer to 24!";

    finishGame("lose");

    return;
  }


  // -------------------------
  // 平局
  // -------------------------

  gameMessageEl.textContent =
    "🤝 Draw! Same score!";

  finishGame("draw");
}


// =========================================================
// 🏁 游戏结束
// =========================================================

function finishGame(result) {

  gameStarted = false;


  // -------------------------
  // 玩家赢
  // -------------------------

  if (result === "win") {

    playWinSound();


    // 返还虚拟积分奖励
    gamePoints +=
      currentBet * 2;


    gameHistoryEl.textContent =
      "🎉 WIN! +" +
      currentBet +
      " virtual points";


  }

  // -------------------------
  // 玩家输
  // -------------------------

  else if (result === "lose") {

    playLoseSound();


    gameHistoryEl.textContent =
      "💥 LOSE! -" +
      currentBet +
      " virtual points";

  }

  // -------------------------
  // 平局
  // -------------------------

  else {

    playDrawSound();


    gamePoints +=
      currentBet;


    gameHistoryEl.textContent =
      "🤝 DRAW! Your points were returned.";

  }


  updateScores();


  // 恢复按钮
  startGameBtn.disabled = false;

  betBtn.disabled = false;

  drawCardBtn.disabled = true;

  stopBtn.disabled = true;


  currentBet = 0;
}


// =========================================================
// 🔘 按钮事件
// =========================================================

if (startGameBtn) {

  startGameBtn.addEventListener(
    "click",
    startGame
  );
}


if (betBtn) {

  betBtn.addEventListener(
    "click",
    startGame
  );
}


if (drawCardBtn) {

  drawCardBtn.addEventListener(
    "click",
    drawCard
  );
}


if (stopBtn) {

  stopBtn.addEventListener(
    "click",
    stopGame
  );
}


// =========================================================
// 🚀 初始化 24 点游戏
// =========================================================

function initialize24Game() {

  playerCards = [];

  gorillaCards = [];

  playerScore = 0;

  gorillaScore = 0;

  gamePoints = 100;

  currentBet = 0;

  gameStarted = false;

  playerStopped = false;


  if (playerCardsEl) {
    playerCardsEl.innerHTML = "";
  }

  if (gorillaCardsEl) {
    gorillaCardsEl.innerHTML = "";
  }


  if (playerScoreEl) {
    playerScoreEl.textContent = "0";
  }

  if (gorillaScoreEl) {
    gorillaScoreEl.textContent = "0";
  }

  if (gamePointsEl) {
    gamePointsEl.textContent = "100";
  }

  if (gameHistoryEl) {
    gameHistoryEl.textContent = "No games yet.";
  }

  if (gameMessageEl) {
    gameMessageEl.textContent =
      "Ready for Gorilla 24 Points?";
  }


  if (startGameBtn) {
    startGameBtn.disabled = false;
  }

  if (betBtn) {
    betBtn.disabled = false;
  }

  if (drawCardBtn) {
    drawCardBtn.disabled = true;
  }

  if (stopBtn) {
    stopBtn.disabled = true;
  }
}


initialize24Game();