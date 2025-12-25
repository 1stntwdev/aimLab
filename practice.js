// practice.js - โหมดฝึกหัด
import { sharedCode } from './sharedCode.js';

const practiceBtn = document.getElementById("practice-btn");
const exitBtn = document.getElementById("exit-btn");
const input = document.getElementById("input-game");
const target = document.getElementById('target');

exitBtn.addEventListener('click', () => resetGame());
practiceBtn.addEventListener('click', PracticeGame);

function PracticeGame() {
  resetGame();
  input.value = "start game in 3...";
  sharedCode.startCountdown = 3;
  sharedCode.countdownTimer = setInterval(onPracticeCountdown, 1000);
}

function onPracticeCountdown() {
  if (sharedCode.startCountdown === 1) {
    input.value = `Practice mode start 5 target remaining`;
    sharedCode.gameStart = true;
    clearInterval(sharedCode.countdownTimer);
    target.removeEventListener('click', targetRealClick);
    target.addEventListener('click', targetPracticeClick);
    randomPosition();
  } else {
    sharedCode.startCountdown--;
    input.value = `start game in ${sharedCode.startCountdown}...`;
  }
}

function randomPosition() {
  target.style.display = "block";
  const aimArea = document.getElementById("aim-area");
  
  const maxX = aimArea.clientWidth - 50;
  const maxY = aimArea.clientHeight - 50;
  
  const randomLeft = Math.floor(Math.random() * maxX);
  const randomTop = Math.floor(Math.random() * maxY);

  target.style.top = `${randomTop}px`;
  target.style.left = `${randomLeft}px`;
}

function targetPracticeClick() {
  if (sharedCode.gameStart) {
    sharedCode.countClick++;
    console.log(`Count Click = ${sharedCode.countClick}`);
    sharedCode.remain = sharedCode.totalTargetNeeded - sharedCode.countClick;
    input.value = `Practice mode start ${sharedCode.remain} target remaining`;
  }
  
  if (sharedCode.countClick === sharedCode.totalTargetNeeded) {
    sharedCode.gameStart = false;
    target.style.display = "none";
    input.value = `wait for game...`;
    alert('Game done');
  } else {
    randomPosition();
  }
}

function resetGame() {
  sharedCode.gameStart = false;
  sharedCode.startCountdown = 0;
  sharedCode.countClick = 0;
  sharedCode.miss = 0;
  sharedCode.targetShown = 0;
  sharedCode.isTargetClickable = false;
  
  target.style.display = "none";
  input.value = "wait for game...";
  
  if (sharedCode.countdownTimer) {
    clearInterval(sharedCode.countdownTimer);
  }
  if (sharedCode.targetTimer) {
    clearInterval(sharedCode.targetTimer);
  }
}

// Export เพื่อให้ game.js ใช้ได้
export { resetGame, randomPosition, targetPracticeClick };

// ต้อง export เพื่อให้ game.js เรียกใช้
function targetRealClick() {
  // ฟังก์ชันนี้จะถูกใช้ใน game.js
}
export { targetRealClick };