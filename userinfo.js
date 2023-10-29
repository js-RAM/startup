function getUserName() {
    return localStorage.getItem('userName');
}
const playerName = document.querySelector('.player-name');
playerName.textContent = this.getUserName();
function populateCurrAdvent() {
    if (localStorage.getItem('playerHealth') == null) {
        localStorage.setItem("playerHealth", 50);
        localStorage.setItem("playerStrength", 5);
        localStorage.setItem("playerArmor", 1);
        localStorage.setItem("playerMagic", 5);
        localStorage.setItem("playerMaxMagic", 5);
    } 
    document.querySelector('.curr-health').textContent = localStorage.getItem('playerHealth');
    document.querySelector('.curr-stren').textContent = localStorage.getItem('playerStrength');
    document.querySelector('.curr-arm').textContent = localStorage.getItem('playerArmor');
    document.querySelector('.curr-mag').textContent = localStorage.getItem('playerMagic') + '/' + localStorage.getItem('playerMaxMagic');
}

function newAdventure() {
    localStorage.setItem("playerHealth", 50);
    localStorage.setItem("playerStrength", 5);
    localStorage.setItem("playerArmor", 1);
    localStorage.setItem("playerMagic", 5);
    localStorage.setItem("playerMaxMagic", 5);
    localStorage.setItem("enemyLv", 1.0);
    localStorage.setItem("enemyHealth", 25);
    localStorage.setItem("enemyStrength", 3);
    localStorage.setItem("enemyArmor", 1);
    localStorage.setItem("enemyMagic", 0);
}

populateCurrAdvent();