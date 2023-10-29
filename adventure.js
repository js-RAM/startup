class Adventure {
    playerHealth;
    playerStrength;
    playerArmor;
    playerMagic;

    enemyLv;
    enemyHealth;
    enemyStrength;
    enemyArmor;
    enemyMagic;

    battleText;

    constructor() {
        if (localStorage.getItem('playerHealth') == null) {
            this.newAdventure();
        }
        this.playerHealth = localStorage.getItem('playerHealth');
        this.playerStrength = localStorage.getItem('playerStrength');
        this.playerArmor = localStorage.getItem('playerArmor');
        this.playerMagic = localStorage.getItem('playerMagic');
        if (localStorage.getItem('enemyLv') == null) {
            this.newEnemy();
        }
        this.enemyLv = localStorage.getItem('enemyLv');
        this.enemyHealth = localStorage.getItem('enemyHealth');
        this.enemyStrength = localStorage.getItem('enemyStrength');
        this.enemyArmor = localStorage.getItem('enemyArmor');
        this.enemyMagic = localStorage.getItem('enemyMagic');
        this.updateUI();
    }

    newAdventure() {
        localStorage.setItem("playerHealth", 50);
        localStorage.setItem("playerStrength", 5);
        localStorage.setItem("playerArmor", 1);
        localStorage.setItem("playerMagic", 5);
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
        document.querySelector('.char-magic').textContent = this.playerMagic;
    }
}

class Battle {
    constructor() {

    }

}

adventure = new Adventure();