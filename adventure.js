class Adventure {
    playerHealth;
    playerStrength;
    playerArmor;
    playerMaxMagic;
    playerMagic;

    enemyLv;
    enemyHealth;
    enemyStrength;
    enemyArmor;
    enemyMagic;
    enemy;

    battleText;

    constructor() {
        if (localStorage.getItem('playerHealth') == null) {
            this.newAdventure();
        }
        this.playerHealth = localStorage.getItem('playerHealth');
        this.playerStrength = localStorage.getItem('playerStrength');
        this.playerArmor = localStorage.getItem('playerArmor');
        this.playerMagic = localStorage.getItem('playerMagic');
        this.playerMaxMagic = localStorage.getItem('playerMaxMagic');
        if (localStorage.getItem('enemyLv') == null) {
            this.newEnemy();
        }
        this.enemyLv = localStorage.getItem('enemyLv');
        this.enemyHealth = localStorage.getItem('enemyHealth');
        this.enemyStrength = localStorage.getItem('enemyStrength');
        this.enemyArmor = localStorage.getItem('enemyArmor');
        this.enemyMagic = localStorage.getItem('enemyMagic');
        this.enemy = new Enemy(this.enemyLv, this.enemyHealth, this.enemyStrength, this.enemyArmor, this.enemyMagic);
        this.updateUI();
    }

    attack(type) {
        var damage = 0;
        var effect = ''
        console.log("Attempted Strike!");
        if (type == "strike") {
            damage = this.playerStrength
        } else if (type == "fire") {
            damage = this.playerMaxMagic*0.7;
            this.playerMagic -= 1;
            effect = 'fire';
        } else if (type == "freeze") {
            damage = this.playerMaxMagic*0.2;
            this.playerMagic -= 1;
            effect = 'freeze';
        } else if (type == "thunder") {
            damage = this.playerMagic*2;
            this.playerMagic = 0;
        }
        this.playerHealth -= this.enemy.damage(damage, effect);
        this.updateUI();
    }
    

    newAdventure() {
        localStorage.setItem("playerHealth", 50);
        localStorage.setItem("playerStrength", 5);
        localStorage.setItem("playerArmor", 1);
        localStorage.setItem("playerMagic", 5);
        localStorage.setItem("playerMaxMagic", 5);
        localStorage.setItem("enemyLv", 1);
        localStorage.setItem("enemyHealth", 25);
        localStorage.setItem("enemyStrength", 3);
        localStorage.setItem("enemyArmor", 1);
        localStorage.setItem("enemyMagic", 0);
    }

    newEnemy() {
        localStorage.setItem("enemyLv", 1);
        localStorage.setItem("enemyHealth", 25);
        localStorage.setItem("enemyStrength", 3);
        localStorage.setItem("enemyArmor", 1);
        localStorage.setItem("enemyMagic", 0);
    }

    updateUI() {
        document.querySelector('.char-health').textContent = this.playerHealth;
        document.querySelector('.char-strength').textContent = this.playerStrength;
        document.querySelector('.char-armor').textContent = this.playerArmor;
        document.querySelector('.char-magic').textContent = this.playerMagic + "/" + this.playerMaxMagic;
        document.querySelector('.enemy-lv').textContent = this.enemyLv;
    }
}

class Enemy {
    level;
    health;
    strength;
    armor;
    magic;
    effect;
    isdead;

    constructor(level=1, health=25, strength=3, armor=1, magic=0) {
        this.level = level;
        this.health = health;
        this.strength = strength;
        this.armor = armor;
        this.magic = magic;
        this.effect = "";
        this.isdead = false;
    }

    damage(dmg, eff) {
        this.health -= dmg;
        this.eff = "";
        return Math.floor(Math.random() * this.strength) + 1
    }

    isDead() {
        return this.isdead;
    }

}

adventure = new Adventure();