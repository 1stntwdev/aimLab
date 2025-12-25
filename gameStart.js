// game.js - โหมดจริง
import { sharedCode } from './shared.js';
import { resetGame, randomPosition } from './practice.js';

let currentLevel = "normal";
let durationLevel = 1000;

const startBtn = document.getElementById("start-btn");
const input = document.getElementById("input-game");
const target = document.getElementById('target');

// Btn-level DOM
document.querySelector('.btn-level').addEventListener('change', (e) => {
  if (e.target.name === 'levelAim') {
    setDifficulty(e.target.value);
  }
});

startBtn.addEventListener('click', startGame);

function setDifficulty(level) {
  currentLevel = level;
  switch (level) {
    case "easy":
      durationLevel = 2000;
      break;
    case "normal":
      durationLevel = 1000;
      break;
    case "hard":
      durationLevel = 500;
      break;
  }
}

function startGame() {
  resetGame();
  input.value = "start game in 3...";
  sharedCode.startCountdown = 3;
  sharedCode.countdownTimer = setInterval(onRealCountdown, 1000);
}

function onRealCountdown() {
  if (sharedCode.startCountdown === 1) {
    sharedCode.gameStart = true;
    clearInterval(sharedCode.countdownTimer);
    target.removeEventListener('click', targetPracticeClick);
    target.addEventListener('click', targetRealClick);
    showNextTarget();
  } else {
    sharedCode.startCountdown--;
    input.value = `start game in ${sharedCode.startCountdown}...`;
  }
}

function targetRealClick() {
  if (sharedCode.gameStart && sharedCode.isTargetClickable) {
    sharedCode.countClick++;
    console.log(`Hit! Total hits: ${sharedCode.countClick}`);
    updateGameStatus();
  }
}

function showNextTarget() {
  if (!sharedCode.gameStart || sharedCode.targetShown >= sharedCode.totalTargetNeeded) {
    return;
  }
  
  sharedCode.targetShown++;
  randomPosition();
  sharedCode.isTargetClickable = true;
  updateGameStatus();
  
  setTimeout(() => {
    target.style.display = "none";
    sharedCode.isTargetClickable = false;
    
    if (sharedCode.gameStart && (sharedCode.targetShown > (sharedCode.countClick + sharedCode.miss))) {
      sharedCode.miss++;
      updateGameStatus();
    }
    
    if (sharedCode.targetShown >= sharedCode.totalTargetNeeded) {
      endGame();
    } else {
      setTimeout(() => {
        if (sharedCode.gameStart) {
          showNextTarget();
        }
      }, durationLevel);
    }
  }, durationLevel);
}

function updateGameStatus() {
  let remaining = sharedCode.totalTargetNeeded - sharedCode.targetShown;
  input.value = `Target: ${sharedCode.targetShown}/${sharedCode.totalTargetNeeded} | Hit: ${sharedCode.countClick} | Miss: ${sharedCode.miss} | Remaining: ${remaining}`;
}

function endGame() {
  sharedCode.gameStart = false;
  target.style.display = "none";
  let accuracy = sharedCode.totalTargetNeeded > 0 ? ((sharedCode.countClick / sharedCode.totalTargetNeeded) * 100).toFixed(2) : 0;
  input.value = `Game Over! Hit: ${sharedCode.countClick} | Miss: ${sharedCode.miss} | Accuracy: ${accuracy}%`;
  alert(`Game Over!\nHit: ${sharedCode.countClick}\nMiss: ${sharedCode.miss}\nAccuracy: ${accuracy}%`);
}

// Import ฟังก์ชันที่ต้องใช้จาก practice.js
import { targetPracticeClick } from './practice.js';
