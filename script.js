// created variables
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
const playerStatText = document.getElementById("playerStat");

const playerText = document.getElementById("playerText");
const enemyText = document.getElementById("enemyText");
const npcStat = document.getElementById("npcStat");
const npcNew = document.getElementById("npcNew");
const restartScreenText = document.getElementById("restartScreenText");
const levelUpText = document.getElementById("levelUpText");
const playBox = document.getElementById("playBox");

const attButton = document.querySelector("#attButton");
const defButton = document.querySelector("#defButton");
const quickButton = document.querySelector("#quickButton");

const restartButton = document.querySelector("#restartButton");
const playButton = document.querySelector("#playButton");

// increasing stats buttons
const healthUp = document.querySelector("#healthUp");
const attackUp = document.querySelector("#attackUp");
const defenseUp = document.querySelector("#defenseUp");
const speedUp = document.querySelector("#speedUp");

// Create high score variable. Retrieve existing high score but if
// it doesn't exist, then create high score and set it to zero
let highScore = localStorage.getItem("myhighscore") || 0;
highScoreText.textContent = `Highscore: ${highScore}`;
levelingUp();

let level = 1;
let limit = 3;
let score = 0;
let player;
let enemy;
let playerTypeDamage;
let enemyTypeDamage;

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
  attack(charc, type) {
    charc.hp = charc.hp - type;
    return `${this.name} deal ${type} damage to ${charc.name}`;
  }
  defend(charc, type) {
    this.hp = this.hp - type;
    return `${this.name} take ${type} damage from ${charc.name}`;
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
    scoreText.textContent = `Score: ${score} | Experience: ${warriorPlayer.Experience}/(${limit})`;
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
    levelingUp(true);
  }
}

function levelingUp(state) {
  if (state == true) {
    // enable leveling up stats
    healthUp.disabled = false;
    attackUp.disabled = false;
    defenseUp.disabled = false;
    speedUp.disabled = false;
    healthUp.style.visibility = "visible";
    attackUp.style.visibility = "visible";
    defenseUp.style.visibility = "visible";
    speedUp.style.visibility = "visible";
    levelUpText.style.visibility = "visible";
    // disable gameplay to level up
    attButton.disabled = true;
    defButton.disabled = true;
    quickButton.disabled = true;
  } else {
    // disable leveling up stats
    healthUp.disabled = true;
    attackUp.disabled = true;
    defenseUp.disabled = true;
    speedUp.disabled = true;
    healthUp.style.visibility = "hidden";
    attackUp.style.visibility = "hidden";
    defenseUp.style.visibility = "hidden";
    speedUp.style.visibility = "hidden";
    levelUpText.style.visibility = "hidden";
    // enable gameplay
    attButton.disabled = false;
    defButton.disabled = false;
    quickButton.disabled = false;
  }
}

playButton.addEventListener("click", function (event) {
  playButton.disabled = true;
  playButton.style.visibility = "hidden";
  playBox.style.visibility = "hidden";
  playerStat();
  scoreText.textContent = `Score: ${score} | Experience: ${warriorPlayer.Experience}/(${limit})`;
});

restartButton.addEventListener("click", function (event) {
  warriorPlayer = new Character({
    name: "Regulius",
    hp: 12,
    damage: 5,
    defense: 4,
    speed: 3,
  });
  attButton.disabled = false;
  defButton.disabled = false;
  quickButton.disabled = false;
  restartButton.disabled = true;
  restartButton.style.visibility = "hidden";
  restartScreenText.style.visibility = "hidden";
  level = 1;
  limit = 3;
  score = 0;
  playerText.textContent = `Player: `;
  enemyText.textContent = `Enemy: `;
  npcNew.textContent = "";
  npcStat.textContent = "";
  scoreText.textContent = `Score: ${score} | Experience: ${warriorPlayer.Experience}/(${limit})`;
  playerStat();
});

attButton.addEventListener("click", function (event) {
  player = "Attack";
  playerTypeDamage = warriorPlayer.damage;
  enemyTurn();
  playerText.textContent = `Player: ${player}`;
  enemyText.textContent = `Enemy: ${enemy}`;
  npcNew.textContent = "";
  npcStat.textContent = conditionWinLose();
  playerStat();
});

defButton.addEventListener("click", function (event) {
  player = "Defend";
  playerTypeDamage = warriorPlayer.defense;
  enemyTurn();
  playerText.textContent = `Player: ${player}`;
  enemyText.textContent = `Enemy: ${enemy}`;
  npcNew.textContent = "";
  npcStat.textContent = conditionWinLose();
  playerStat();
});

quickButton.addEventListener("click", function (event) {
  player = "Quick Attack";
  playerTypeDamage = warriorPlayer.speed;
  enemyTurn();
  playerText.textContent = `Player: ${player}`;
  enemyText.textContent = `Enemy: ${enemy}`;
  npcNew.textContent = "";
  npcStat.textContent = conditionWinLose();
  playerStat();
});

healthUp.addEventListener("click", function (event) {
  warriorPlayer.hp += 6;
  playerStat();
  levelingUp(false);
});

attackUp.addEventListener("click", function (event) {
  warriorPlayer.damage += 1;
  playerStat();
  levelingUp(false);
});

defenseUp.addEventListener("click", function (event) {
  warriorPlayer.defense += 1;
  playerStat();
  levelingUp(false);
});

speedUp.addEventListener("click", function (event) {
  warriorPlayer.speed += 1;
  playerStat();
  levelingUp(false);
});

function enemyTurn() {
  const num = Math.floor(Math.random() * 3) + 1;
  switch (num) {
    case 1:
      enemy = "Attack";
      enemyTypeDamage = soldierEnemy.damage;
      break;
    case 2:
      enemy = "Defend";
      enemyTypeDamage = soldierEnemy.defense;
      break;
    case 3:
      enemy = "Quick Attack";
      enemyTypeDamage = soldierEnemy.speed;
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
    return warriorPlayer.attack(soldierEnemy, playerTypeDamage);
  } else if (
    (player == "Attack" && enemy == "Defend") ||
    (player == "Defend" && enemy == "Quick Attack") ||
    (player == "Quick Attack" && enemy == "Attack")
  ) {
    playerLost();
    return warriorPlayer.defend(soldierEnemy, enemyTypeDamage);
  }
}
