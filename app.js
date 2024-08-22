let slayingHero;
let totalGold = 50;
let nameOptions = ['Craig', 'Eduardo', 'Matt', 'Mick', 'Jeremy', 'Steve', 'Joe', 'Billy', 'Savannah', 'Hannah', 'Amber']
let raceOptions = ['dwarf', 'elf', 'human', 'gnome', 'halfling', 'dragonborn', 'argonian', 'giant', 'khajiit', 'sentinel']


const heroes = [
  {
    name: 'Slate Slabrock',
    type: 'dwarf',
    damage: 5,
    health: 100,
    //gold: 0
  },
  {
    name: 'Swift Ironstag',
    type: 'elf',
    damage: 10,
    health: 50,
    // gold: 0
  }
]

const boss = {
  health: 100,
  maxHealth: 100,
  damage: 5,
  level: 1
}


drawHeroes();

//  These are the event listeners
const dragonBoss = document.getElementById('boss');
dragonBoss.addEventListener('click', () => attackBoss());
const buyPotion = document.getElementById("buy-potion")
buyPotion.addEventListener("click", () => heroHealthpack())



function attackBoss() {
  heroes.forEach((hero) => {
    boss.health -= hero.damage
    console.log(boss.health)
    if (boss.health <= 0) {
      rewardHeroes(hero)
      drawGold()
      levelUpBoss()
    }
  });
}

function levelUpBoss() {
  boss.level++
  boss.maxHealth = 100 * boss.level
  boss.health = boss.maxHealth
  boss.damage++
}

function rewardHeroes(hero) {
  slayingHero = hero;
  //slayingHero.gold += boss.level * 5
  totalGold += boss.level * 5
  console.log(slayingHero.name, slayingHero.gold)
}

function attackHeroes() {
  heroes.forEach((hero) => {
    hero.health -= boss.damage
    if (hero.health <= 0) {
      heroDies(hero)
    }
  })
  drawHeroes();
}

setInterval(attackHeroes, 5000)

function generateHero() {
  let randHealth = Math.floor(Math.random() * 100) + 50
  let randDmg = Math.floor(Math.random() * 20) + 5
  let randNameSelector = Math.floor(Math.random() * heroes.length)
  let randRaceSelector = Math.floor(Math.random() * heroes.length)
  let randName = nameOptions[randNameSelector]
  let randRace = raceOptions[randRaceSelector]

  heroes.push({ name: randName, type: randRace, damage: randDmg, health: randHealth })
}

function heroHealthpack() {
  if (totalGold >= 20) {
    for (let i = 0; i < heroes.length; i++) {
      let hero = heroes[i];
      hero.health += 50
      console.log(hero.health)
    }
    totalGold -= 20
    drawGold()
    drawHeroes();
  }
  else {
    console.log('Not enough')
  }
}

function drawHeroes() {
  let heroList = document.getElementById('hero-list');
  heroList.innerHTML = '';
  heroes.forEach(hero => {
    heroList.innerHTML += `<div class="col-md-3">
        <div class="hero">
          <p>${hero.name} 😊</p>
          <p>HP:<span>${hero.health}</span></p>
        </div>
      </div>`
  });
}

function drawGold() {
  let goldElem = document.getElementById('gold');
  goldElem.textContent = totalGold;
}

function heroDies(hero) {
  console.log(hero)
}
