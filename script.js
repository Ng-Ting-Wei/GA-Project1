// create two player can also well
// level up system
// random stat generation
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

function gameSet() {
  if (soldierEnemy.hp <= 0) {
    soldierEnemy = new Character({
      name: "Soldier",
      hp: Math.floor(Math.random() * 4) + 1,
      damage: Math.floor(Math.random() * 3) + 1,
      defense: Math.floor(Math.random() * 3) + 1,
      speed: Math.floor(Math.random() * 3) + 1,
    });
    warriorPlayer.Experience += 1;
    scoreText.textContent = `Score: ${warriorPlayer.Experience}`;
    return `Soldier was defeated! More Soldier arrived!`;
  }
}

// hp: Math.floor(Math.random() * 4) + 1,
// damage: Math.floor(Math.random() * 3) + 1,
// defense: Math.floor(Math.random() * 3) + 1,
// speed: Math.floor(Math.random() * 3) + 1,

// break
const scoreText = document.getElementById("score");

const playerText = document.getElementById("playerText");
const enemyText = document.getElementById("enemyText");
const npcStat = document.getElementById("npcStat");

const attButton = document.querySelector("#attButton");
const defButton = document.querySelector("#defButton");
const quickbutton = document.querySelector("#quickbutton");
let player;
let enemy;

attButton.addEventListener("click", function (event) {
  player = "Attack";
  enemyTurn();
  playerText.textContent = `Player: ${player}`;
  enemyText.textContent = `Enemy: ${enemy}`;
  npcStat.textContent = conditionWinLose();
});

defButton.addEventListener("click", function (event) {
  player = "Defend";
  enemyTurn();
  playerText.textContent = `Player: ${player}`;
  enemyText.textContent = `Enemy: ${enemy}`;
  npcStat.textContent = conditionWinLose();
});

quickbutton.addEventListener("click", function (event) {
  player = "Quick Attack";
  enemyTurn();
  playerText.textContent = `Player: ${player}`;
  enemyText.textContent = `Enemy: ${enemy}`;
  npcStat.textContent = conditionWinLose();
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
    return warriorPlayer.attack(soldierEnemy), gameSet();
  } else if (
    (player == "Attack" && enemy == "Defend") ||
    (player == "Defend" && enemy == "Quick Attack") ||
    (player == "Quick Attack" && enemy == "Attack")
  ) {
    return warriorPlayer.defend(soldierEnemy);
  }
}
