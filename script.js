// create two player can also well
// level up system
let character1 = {
  namePlayer: "fighter",
  health: 6,
  attack: 2,
  defense: 1,
  speed: 1,
  experience: 0,
  progress: 0,
};

let character2 = {
  namePlayer: "warrior",
  health: 6,
  attack: 2,
  defense: 1,
  speed: 1,
  experience: 0,
  progress: 0,
};

// random stat generation
let enemy1 = {
  nameEnemy: "soldier",
  health: 1,
  attack: 1,
  defense: 1,
  speed: 1,
};

class Character {
  constructor(health, attack, defense, speed) {
    (this.health = health),
      (this.attack = attack),
      (this.defense = defense),
      (this.speed = speed);
  }
}

class Warrior extends Character {
  constructor(health = 6, attack = 1, defense = 1, speed = 1) {
    super(health, attack, defense, speed);
  }
  takeDamage(damage) {
    this.health = this.health - damage;
    return this.health;
  }
  dealDamage(defense) {
    this.attack = this.attack - defense;
    return this.attack;
  }
}

// Math.floor(Math.random() * 2)

const warrior1 = new Warrior();

// console.log(warrior1);
// const attacking = warrior1.dealDamage(1);
// console.log(attacking);
// const defending = warrior1.takeDamage(2);
// console.log(defending);

const playerText = document.querySelector("#playerText");
const enemyText = document.querySelector("#enemyText");
const npcStat = document.querySelector("#npcStat");

let player;
let enemy;

function attackButton() {
  player = "Attack";
  console.log(player);
  // const defending = warrior1.takeDamage(2);
  // console.log(defending);
}

function defendButton() {
  player = "Defend";

  console.log(player);
}

function quickButton() {
  player = "Quick Attack";
  console.log(player);
}

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
    return "You deal damage";
  } else if (
    (player == "Attack" && enemy == "Defend") ||
    (player == "Defend" && enemy == "Quick Attack") ||
    (player == "Quick Attack" && enemy == "Attack")
  ) {
    return "You take damage";
  }
}
