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
        this.battleText = "Battle Log";
        this.enemy = new Enemy(this.enemyLv, this.enemyHealth, this.enemyStrength, this.enemyArmor, this.enemyMagic);
        this.updateUI();
    }

    attack(type) {
        if (this.playerHealth > 0) {
            var damage = 0;
            var effect = '';
            this.battleText = "Battle Log";
            console.log("Attempted Strike!");
            if (type == "strike") {
                damage = this.playerStrength;
                this.battleText = "You striked the enemy!";
            } else if (type == "fire") {
                if (this.playerMagic >= 1) {
                    damage = this.playerMaxMagic*0.7;
                    this.playerMagic = Number(this.playerMagic) -1;
                    effect = 'fire';
                    this.battleText = "You used fire!"
                } else {
                    this.battleText = "Not enough magic to use Fire!"
                    this.updateUI();
                    return;
                }
            } else if (type == "freeze") {
                if (this.playerMagic >= 1) {
                    damage = Number(this.playerMaxMagic)*0.2;
                    this.playerMagic = Number(this.playerMagic) -1;
                    effect = 'freeze';
                    this.battleText = "You used freeze!"
                } else {
                    this.battleText = "Not enough magic to use Freeze!"
                    this.updateUI();
                    return;
                }
            } else if (type == "thunder") {
                if (this.playerMagic > 0) {
                    damage = this.playerMagic*2;
                    this.playerMagic = 0;
                    this.battleText = "You used thunder!"
                } else {
                    this.battleText = "Not enough magic to use Thunder!"
                    this.updateUI();
                    return;
                }
            }
            this.playerHealth -= (this.enemy.damage(damage, effect)-this.playerArmor);
            this.battleText += "\n The enemy struck back!";
            this.enemyHealth = this.enemy.getHealth();
            if (this.enemy.isDead()) this.nextEnemy();
            if (this.playerHealth <= 0) this.battleText = "YOU DIED! Press an attack to restart...";
            this.updateData()
            this.updateUI();
        } else {
            this.newAdventure();
            this.playerHealth = localStorage.getItem('playerHealth');
            this.playerStrength = localStorage.getItem('playerStrength');
            this.playerArmor = localStorage.getItem('playerArmor');
            this.playerMagic = localStorage.getItem('playerMagic');
            this.playerMaxMagic = localStorage.getItem('playerMaxMagic');
            this.enemyLv = localStorage.getItem('enemyLv');
            this.enemyHealth = localStorage.getItem('enemyHealth');
            this.enemyStrength = localStorage.getItem('enemyStrength');
            this.enemyArmor = localStorage.getItem('enemyArmor');
            this.enemyMagic = localStorage.getItem('enemyMagic');
            this.battleText = "Battle Log";
            this.enemy = new Enemy(this.enemyLv, this.enemyHealth, this.enemyStrength, this.enemyArmor, this.enemyMagic);
            this.updateUI();
        }
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
        localStorage.setItem("enemyLv", 1.0);
        localStorage.setItem("enemyHealth", 25);
        localStorage.setItem("enemyStrength", 3);
        localStorage.setItem("enemyArmor", 1);
        localStorage.setItem("enemyMagic", 0);
    }

    nextEnemy() {
        this.battleText += "\n The enemy died!"
        let x = Math.floor(Math.random()*4)+1;
        if (x == 1) this.playerHealth = Math.round(this.playerHealth*2);
        if (x == 2) this.playerStrength = Math.round(this.playerStrength*1.25);
        if (x == 3) this.playerArmor = Number(this.playerArmor) + 1;
        if (x == 4) this.playerMaxMagic = Math.round(this.playerMaxMagic*1.25);
        this.enemyLv = Number(this.enemyLv)+1.0;
        this.enemyHealth = 20 + Math.floor(Math.random()*Number(this.enemyLv) * 5);
        this.enemyStrength = 3 + Number(this.enemyLv);
        this.enemyArmor = 1 + 0.2 * Number(this.enemyLv);
        this.enemyMagic = 0.5 * Number(this.enemyLv);
        this.playerMagic = this.playerMaxMagic;
        this.enemy = new Enemy(this.enemyLv, this.enemyHealth, this.enemyStrength, this.enemyArmor, this.enemyMagic);
    }

    updateData() {
        localStorage.setItem("playerHealth", this.playerHealth);
        localStorage.setItem("playerStrength", this.playerStrength);
        localStorage.setItem("playerArmor", this.playerArmor);
        localStorage.setItem("playerMagic", this.playerMagic);
        localStorage.setItem("playerMaxMagic", this.playerMaxMagic);
        localStorage.setItem("enemyLv", this.enemyLv);
        localStorage.setItem("enemyHealth", this.enemyHealth);
        localStorage.setItem("enemyStrength", this.enemyStrength);
        localStorage.setItem("enemyArmor", this.enemyArmor);
        localStorage.setItem("enemyMagic", this.enemyMagic);
    }

    updateUI() {
        document.querySelector('.char-health').textContent = this.playerHealth;
        document.querySelector('.char-strength').textContent = this.playerStrength;
        document.querySelector('.char-armor').textContent = this.playerArmor;
        document.querySelector('.char-magic').textContent = this.playerMagic + "/" + this.playerMaxMagic;
        document.querySelector('.enemy-lv').textContent = this.enemyLv;
        document.querySelector('.enemy-health').textContent = this.enemyHealth;
        document.querySelector('.battle-log').textContent = this.battleText;
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
        let arm = Math.floor(Math.random()*(Number(this.armor)+1))
        this.health = Number(this.health) - (Number(dmg) - Number(arm));
        this.eff = "";
        if (this.health <= 0) this.isdead = true;
        return Math.floor(Math.random() * Number(this.strength)) + 1;
    }

    getHealth() {
        return (this.health > 0)?this.health: 0;
    }

    isDead() {
        return this.isdead;
    }

}

adventure = new Adventure();