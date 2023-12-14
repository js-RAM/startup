import React from 'react';
import './adventure-page.css'

export function AdventurePage() {
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
            
            this.populateLocalVariables();
            this.configureWebSocket();
            this.battleText = "Battle Log";
        }
    
        attack(type) {
            if (this.playerHealth > 0) {
                var damage = 0;
                var effect = '';
                this.battleText = "Battle Log";
                //console.log("Attempted Strike!");
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
                console.log("Here I am");
                this.updateData();
                this.updateUI();
            } else {
                this.newAdventure();
                this.battleText = "Battle Log";
                this.enemy = new Enemy(this.enemyLv, this.enemyHealth, this.enemyStrength, this.enemyArmor, this.enemyMagic);
                this.updateUI();
            }
        }
    
        async populateLocalVariables() {
            let adventures = []
            try {
                const response = await fetch('/api/adventures');
                adventures = await response.json();
    
                localStorage.setItem('adventures', JSON.stringify(adventures));
                
            } catch {
                console.log("Couldn't Fetch!");
            } finally {
                console.log("Please see this!");
                this.updateLocalVariables();
                this.updateUI();
            }
            
        }
        
        updateLocalVariables() {
            let adventures = []
            const adventureData = localStorage.getItem('adventures');
            if (adventureData) {
                adventures = JSON.parse(adventureData);
                let adventure = adventures[0]
                this.playerHealth = adventure.playerHealth;
                this.playerStrength = adventure.playerStrength;
                this.playerArmor = adventure.playerArmor;
                this.playerMagic = adventure.playerMagic;
                this.playerMaxMagic = adventure.playerMaxMagic;
                this.enemyLv = adventure.enemyLv;
                this.generateEnemy();
            } else {
                this.newAdventure();
            }
        }
    
        newAdventure() {
            this.playerHealth = 50;
            this.playerStrength = 5;
            this.playerArmor = 1;
            this.playerMagic = 5;
            this.playerMaxMagic = 5;
            this.enemyLv = 1;
            this.newEnemy();
            this.updateData();
        }
    
        newEnemy() {
            this.enemyHealth = 25;
            this.enemyStrength = 3;
            this.enemyArmor = 1;
            this.enemyMagic = 0;
            this.enemy = new Enemy(this.enemyLv, this.enemyHealth, this.enemyStrength, this.enemyArmor, this.enemyMagic);
        }
    
        nextEnemy() {
            this.battleText += "\n The enemy died!"
            this.broadcastEvent(localStorage.getItem('userName'), this.enemyLv)
            let x = Math.floor(Math.random()*4)+1;
            if (x == 1) this.playerHealth = Math.round(this.playerHealth*2);
            if (x == 2) this.playerStrength = Math.round(this.playerStrength*1.25);
            if (x == 3) this.playerArmor = Number(this.playerArmor) + 1;
            if (x == 4) this.playerMaxMagic = Math.round(this.playerMaxMagic*1.25);
            this.enemyLv = Number(this.enemyLv)+1.0;
            this.generateEnemy();
        }
    
        generateEnemy() {
            this.enemyHealth = 20 + Math.floor(Math.random()*Number(this.enemyLv) * 5);
            this.enemyStrength = 3 + Number(this.enemyLv);
            this.enemyArmor = 1 + 0.2 * Number(this.enemyLv);
            this.enemyMagic = 0.5 * Number(this.enemyLv);
            this.playerMagic = this.playerMaxMagic;
            this.enemy = new Enemy(this.enemyLv, this.enemyHealth, this.enemyStrength, this.enemyArmor, this.enemyMagic);
        }
    
        async updateData() {
            let adventures = []
            const adventureData = localStorage.getItem('adventures');
            adventures = JSON.parse(adventureData);
            const adventure = {playerHealth: this.playerHealth, playerStrength: this.playerStrength, playerArmor: this.playerArmor, 
                playerMagic: this.playerMagic, playerMaxMagic: this.playerMaxMagic, enemyLv: this.enemyLv};
            adventures[0] = adventure;
            localStorage.setItem('adventures', JSON.stringify(adventures));
            try {
                const response = await fetch('/api/adventuress', {
                  method: 'POST',
                  headers: {'content-type': 'application/json'},
                  body: localStorage.getItem('adventures'),
                });
            } catch {
                console.log("Failed to save Data!");
            }
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
    
        configureWebSocket() {
            const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
            this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
            this.socket.onopen = (event) => {
                document.querySelector('.connected').textContent = "Connected";
            };
            this.socket.onclose = (event) => {
                document.querySelector('.connected').textContent = "Disconnected";
            };
            this.socket.onmessage = async (event) => {
                const msg = JSON.parse(await event.data.text());
                document.querySelector('.user2').textContent = document.querySelector('.user1').textContent;
                document.querySelector('.user1').textContent = msg.from + " defeated a Lv " + msg.value + " monster!";
            };
        }
    
        broadcastEvent(from, value) {
            const event = {
                from: from,
                value: value,
            };
            this.socket.send(JSON.stringify(event));
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
    
    async function populateLocalVariables() {
        let adventures = [];
        const adventureData = localStorage.getItem('adventures');
        if (adventureData) {
            adventures = JSON.parse(adventureData)
        } else {
            try {
                const response = await fetch('/api/adventures');
                adventures = await response.json();
    
                localStorage.setItem('adventures', JSON.stringify(adventures));
            } catch {
                console.log("Couldn't Fetch!");
            }
        }
           
        updateLocalVariables();
    }
    
    function updateLocalVariables() {
        let adventures = []
        const adventureData = localStorage.getItem('adventures');
        if (adventureData) {
            adventures = JSON.parse(adventureData);
            let adventure = adventures[0]
            localStorage.setItem("playerHealth", adventure.playerHealth);
            localStorage.setItem("playerStrength", adventure.playerStrength);
            localStorage.setItem("playerArmor", adventure.playerArmor);
            localStorage.setItem("playerMagic", adventure.playerMagic);
            localStorage.setItem("playerMaxMagic", adventure.playerMaxMagic);
            localStorage.setItem("enemyLv", adventure.enemyLv);
    
        }
    }
    let adventureObj = new Adventure();

   

  return (
    <main>
        <div className="main-body">
            <div className = "adventure-card bottom-margin">
                <h3>Character Stats</h3>
                <p>Health: <span className="char-health">{adventureObj.playerHealth}</span></p>
                <p>Strength: <span className="char-strength">xxx</span></p>
                <p>Armor: <span className="char-armor">xxx</span></p>
                <p>Magic: <span className="char-magic">xxx</span></p>
            </div>
            <div className = "adventure-card">
                <h3>Player Options</h3>
                <button type="submit" onClick={() => adventureObj.attack('strike')}>Strike</button>
                <button type="submit" onClick={() => adventureObj.attack('fire')}>Fire</button>
                <br></br>
                <button type="submit" onClick={() => adventureObj.attack('freeze')}>Freeze</button>
                <button type="submit" onClick={() => adventureObj.attack('thunder')}>Thunder</button>
                <br></br>
                <br></br>
                <button type="submit">Item 1</button>
                <button type="submit">Item 2</button>
            </div>
            <div className = "adventure-card text-center">
                <h3>Enemy Lv. <span className="enemy-lv">x</span></h3>
                <p>Health: <span className="enemy-health">0</span></p>
                <div id="picture" className="enemyImage"><img width="80%" src="/Enemies/placeholder.png" alt="random" /></div>
                <h4>Battle Log</h4>
                <p><span className="battle-log">Battle Log</span></p>
            </div>
            <div className = "adventure-card bottom-margin">
                <h3>Global Log</h3>
                <p><span className="connected"></span></p>
                <p><span className="user1"></span></p>
                <p><span className="user2"></span></p>
            </div>
        </div>
    </main>
  );
}
