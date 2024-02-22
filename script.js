// created variables
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
const playerStatText = document.getElementById("playerStat");

const playerText = document.getElementById("playerText");
const enemyText = document.getElementById("enemyText");
const npcStat = document.getElementById("npcStat");
const npcNew = document.getElementById("npcNew");
const restartScreenText = document.getElementById("restartScreenText");

const attButton = document.querySelector("#attButton");
const defButton = document.querySelector("#defButton");
const quickButton = document.querySelector("#quickButton");
const restartButton = document.querySelector("#restartButton");

// Create high score variable. Retrieve existing high score but if
// it doesn't exist, then create high score and set it to zero
let highScore = localStorage.getItem("myhighscore") || 0;

let level = 1;
let limit = 3;
let score = 0;
let player;
let enemy;

restartButton.disabled = true;
restartButton.style.visibility = "hidden";
restartScreenText.style.visibility = "hidden";

// create two player can also well
// level up system
class Character {
  Experience = 0;
  constructor(charc) {
    this.name = charc.name;
    this.hp = charc.hp;
    this.damage = charc.damage;
    this.defense = charc.defense;
    this.speed = charc.speed;
  }
  getName() {
    return this.name;
  }
  getDamage() {
    return this.damage;
  }
  getDefense() {
    return this.defense;
  }
  getSpeed() {
    return this.speed;
  }
  getHealth() {
    return this.hp;
  }
  attack(charc) {
    charc.hp = charc.hp - this.damage;
    return `${this.name} deal ${this.damage} damage to ${charc.name}`;
  }
  defend(charc) {
    this.hp = this.hp - charc.damage;
    return `${this.name} take ${charc.damage} damage from ${charc.name}`;
  }
}

// characters created at the start
let warriorPlayer = new Character({
  name: "Maximus",
  hp: 6,
  damage: 2,
  defense: 2,
  speed: 2,
});

let soldierEnemy = new Character({
  name: "Soldier",
  hp: 2,
  damage: 1,
  defense: 1,
  speed: 1,
});

function playerStat() {
  playerStatText.textContent = `Character: ${warriorPlayer.name} lvl ${level} | Health: ${warriorPlayer.hp} | Attack: ${warriorPlayer.damage} | Defense: ${warriorPlayer.defense} | Speed: ${warriorPlayer.speed}`;
}

function playerLost() {
  if (warriorPlayer.hp <= 0 || warriorPlayer.hp - soldierEnemy.damage <= 0) {
    attButton.disabled = true;
    defButton.disabled = true;
    quickButton.disabled = true;
    restartButton.disabled = false;
    restartButton.style.visibility = "visible";
    restartScreenText.style.visibility = "visible";
  }
}

// random stat generation
function gameSet() {
  if (soldierEnemy.hp <= 0 || soldierEnemy.hp - warriorPlayer.damage <= 0) {
    soldierEnemy = new Character({
      name: "Soldier",
      hp: Math.floor(Math.random() * 4) + 1,
      damage: Math.floor(Math.random() * 3) + 1,
      defense: Math.floor(Math.random() * 3) + 1,
      speed: Math.floor(Math.random() * 3) + 1,
    });
    score += 1;
    warriorPlayer.Experience += 1;
    experiencePlayer();
    scoreText.textContent = `Score: ${score} | Experience: ${warriorPlayer.Experience}`;
    npcNew.textContent = `Soldier was defeated! More Soldier arrived!`;
    settingHighScore();
  }
}
function settingHighScore() {
  // Check if player has beaten high score
  if (score > highScore) {
    // Set in-game high score variable to current score
    highScore = score;
    // Update to display new high score
    highScoreText.textContent = `Highscore: ${highScore}`;
    // Store high score permanently on player's computer
    localStorage.setItem("myhighscore", highScore);
  }
}

function experiencePlayer() {
  let exp = warriorPlayer.Experience / limit;
  if (exp == 1) {
    warriorPlayer.Experience -= limit;
    limit = limit * 3;
    level += 1;
  }
}

restartButton.addEventListener("click", function (event) {
  warriorPlayer = new Character({
    name: "Regulius",
    hp: 12,
    damage: 5,
    defense: 5,
    speed: 5,
  });
  attButton.disabled = false;
  defButton.disabled = false;
  quickButton.disabled = false;
  restartButton.disabled = true;
  restartButton.style.visibility = "hidden";
  restartScreenText.style.visibility = "hidden";
  playerStat();
  level = 1;
  limit = 3;
  score = 0;
  playerText.textContent = `Player: `;
  enemyText.textContent = `Enemy: `;
  npcNew.textContent = "";
  npcStat.textContent = "";
  scoreText.textContent = `Score: ${score} | Experience: ${warriorPlayer.Experience}`;
});

attButton.addEventListener("click", function (event) {
  player = "Attack";
  enemyTurn();
  playerText.textContent = `Player: ${player}`;
  enemyText.textContent = `Enemy: ${enemy}`;
  npcNew.textContent = "";
  npcStat.textContent = conditionWinLose();
  playerStat();
});

defButton.addEventListener("click", function (event) {
  player = "Defend";
  enemyTurn();
  playerText.textContent = `Player: ${player}`;
  enemyText.textContent = `Enemy: ${enemy}`;
  npcNew.textContent = "";
  npcStat.textContent = conditionWinLose();
  playerStat();
});

quickButton.addEventListener("click", function (event) {
  player = "Quick Attack";
  enemyTurn();
  playerText.textContent = `Player: ${player}`;
  enemyText.textContent = `Enemy: ${enemy}`;
  npcNew.textContent = "";
  npcStat.textContent = conditionWinLose();
  playerStat();
});

function enemyTurn() {
  const num = Math.floor(Math.random() * 3) + 1;
  switch (num) {
    case 1:
      enemy = "Attack";
      break;
    case 2:
      enemy = "Defend";
      break;
    case 3:
      enemy = "Quick Attack";
      break;
  }
}

function conditionWinLose() {
  if (player == enemy) {
    return "Draw";
  } else if (
    (player == "Attack" && enemy == "Quick Attack") ||
    (player == "Quick Attack" && enemy == "Defend") ||
    (player == "Defend" && enemy == "Attack")
  ) {
    gameSet();
    return warriorPlayer.attack(soldierEnemy);
  } else if (
    (player == "Attack" && enemy == "Defend") ||
    (player == "Defend" && enemy == "Quick Attack") ||
    (player == "Quick Attack" && enemy == "Attack")
  ) {
    playerLost();
    return warriorPlayer.defend(soldierEnemy);
  }
}
