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

console.log(warrior1);
const attacking = warrior1.dealDamage(1);

console.log(attacking);

function attackButton() {
  let enemyChoice = Math.floor(Math.random() * 2);
  if (enemyChoice == 0) {
    num = "draw";
  } else if (enemyChoice == 1) {
    num = "lose";
  } else {
    num = "win";
  }

  // const defending = warrior1.takeDamage(2);
  // console.log(defending);
}

function defendButton() {
  console.log("defend");
}

function quickButton() {
  console.log("quick");
}

// win/lose/draw conditions
switch (num) {
  case "win":
    // win
    console.log("win");
    break;
  case "lose":
    // lose
    console.log("lose");
    break;
  case "draw":
    // draw
    console.log("draw");
    break;
}
