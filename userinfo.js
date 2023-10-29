function getUserName() {
    return localStorage.getItem('userName');
}
const playerName = document.querySelector('.player-name');
playerName.textContent = this.getUserName();