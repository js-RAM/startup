function getUserName() {
    return localStorage.getItem('userName');
}
const playerName = document.querySelector('.player-name');
playerName.textContent = this.getUserName();

async function populateAdventures() {
    let adventures = [];
    console.log("Beginning...");
    try {
        console.log("Attempting...");
        const response = await fetch('/api/adventures');
        adventures = await response.json();
        console.log("success");
        localStorage.setItem('adventures', JSON.stringify(adventures));
    } catch {
        console.log("I am here!")
        const adventureData = localStorage.getItem('adventures');
        if (adventureData) {
            adventures = JSON.parse(adventureData)
        }
    }

    populateCurrAdvent(adventures);
}

function populateCurrAdvent(adventures) {
    if (adventures.length == 0) {
        adventures = [{playerHealth: 65, playerStrength: 5, playerArmor: 1, playerMagic: 5, playerMaxMagic: 5}, 
            {playerHealth: 50, playerStrength: 5, playerArmor: 1, playerMagic: 5, playerMaxMagic: 5}, {playerHealth: 50, playerStrength: 5, playerArmor: 1, playerMagic: 5, playerMaxMagic: 5}];
    }
        currAdventure = adventures[0]
        document.querySelector('.curr-health').textContent = currAdventure.playerHealth;
        document.querySelector('.curr-stren').textContent = currAdventure.playerStrength;
        document.querySelector('.curr-arm').textContent = currAdventure.playerArmor;
        document.querySelector('.curr-mag').textContent = currAdventure.playerMagic + '/' + currAdventure.playerMaxMagic;
        populatePrevAdventures(adventures);
        updateDataBase(adventures);
}

function populatePrevAdventures(adventures) {
    for (let i = 1; i < 4; i++) {
        if (adventures.length > i) {
            console.log("I am here")
            adventure = adventures[i];
            document.querySelector('.prev-health' + i).textContent = adventure.playerHealth;
            document.querySelector('.prev-stren' + i).textContent = adventure.playerStrength;
            document.querySelector('.prev-arm' + i).textContent = adventure.playerArmor;
            document.querySelector('.prev-mag' + i).textContent = adventure.playerMagic + '/' + adventure.playerMaxMagic;
        }
    }
}

function newAdventure() {
    adventures = []
    const adventureData = localStorage.getItem('adventures');
    if (adventureData) {
        adventures = JSON.parse(adventureData);
    }
    adventures[0] = {playerHealth: 60, playerStrength: 5, playerArmor: 1, playerMagic: 5, playerMaxMagic: 5};
    updateDataBase(adventures);
}

function updateDataBase(adventures) {
    localStorage.setItem('adventures',JSON.stringify(adventures));
    saveData();
}

async function saveData() {
    try {
        const response = await fetch('/api/adventures', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: localStorage.getItem('adventures'),
        });
    } catch {

    }
}

populateAdventures();