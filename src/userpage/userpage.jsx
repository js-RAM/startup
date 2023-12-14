import React from 'react';
import './user-page.css';
import { useNavigate } from 'react-router-dom';

export function UserPage({ currAdventure }) {
  const navigate = useNavigate();
  function getUserName() {
    return localStorage.getItem('userName');
  }
  
  const userName = getUserName();
  currAdventure = {playerHealth: 60, playerStrength: 5, playerArmor: 1, playerMagic: 5, playerMaxMagic: 5, enemyLv: 1};

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
          adventures = [{playerHealth: 50, playerStrength: 5, playerArmor: 1, playerMagic: 5, playerMaxMagic: 5, enemyLv:1}];
      }
          currAdventure = adventures[0]
          console.log("See!", adventures[0])
          document.querySelector('.curr-lv').textContent = currAdventure.enemyLv
          document.querySelector('.curr-health').textContent = currAdventure.playerHealth
          document.querySelector('.curr-stren').textContent = currAdventure.playerStrength
          document.querySelector('.curr-arm').textContent = currAdventure.playerArmor
          document.querySelector('.curr-mag').textContent = currAdventure.playerMagic
          populatePrevAdventures(adventures);
          updateDataBase(adventures);
  }

  function populatePrevAdventures(adventures) {
    console.log("Nope", currAdventure)
    for (let i = 1; i < 4; i++) {
          if (adventures.length > i) {
              console.log("I am here")
              let adventure = adventures[i];
              
          }
      }
  }

  async function newAdventure() {
      let adventures = []
      const adventureData = localStorage.getItem('adventures');
      if (adventureData) {
          adventures = JSON.parse(adventureData);
      }
      adventures[0] = {playerHealth: 60, playerStrength: 5, playerArmor: 1, playerMagic: 5, playerMaxMagic: 5, enemyLv: 1};
      localStorage.setItem('adventures',JSON.stringify(adventures));
      try {
          const response = await fetch('/api/adventuress', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: localStorage.getItem('adventures'),
          });
          console.log(response);
      } catch {
          console.log("Failed to save Data!");
      } finally {
          loadNextPage();
      }
  }

  function updateDataBase(adventures) {
      localStorage.setItem('adventures',JSON.stringify(adventures));
      saveData();
  }

  async function saveData() {
      try {
          console.log(JSON.parse(localStorage.getItem('adventures'))[0]);
          const response = await fetch('/api/adventures', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(JSON.parse(localStorage.getItem('adventures'))[0]),
          });
      } catch {
          console.log("Failed to save Data!");
      }
  }

  function loadNextPage() {
    navigate('/adventurepage')
  }

  populateAdventures();
  return (
    <main className="container-fluid bg-light">
        <span className="player-name">{userName}</span>
        <div className='main-body'>  

            <div className='prev-body'>  
                <h2 className='margin'>Past Adventures:</h2>
                    <div className= "past-adventure">
                        <h5>Made it to Level xx with:</h5>
                        <div className= "container-fluid">
                            <div>Health: <span className="prev-health1">xxx</span></div>
                            <div>Strength: <span className="prev-stren1">xxx</span></div>
                            <div>Armor: <span className="prev-arm1">xxx</span></div>
                            <div>Magic: <span className="prev-mag1">xxx</span></div>
                        </div>
                    </div>
                <p></p>
                <div className= "past-adventure">
                    <h5>Made it to Level xx with:</h5>
                    <div className= "container-fluid">
                      <div>Health: <span className="prev-health2">xxx</span></div>
                      <div>Strength: <span className="prev-stren2">xxx</span></div>
                      <div>Armor: <span className="prev-arm2">xxx</span></div>
                      <div>Magic: <span className="prev-mag2">xxx</span></div>
                    </div>
                </div>
                <p></p>
                <div className= "past-adventure" >
                    <h5>Made it to Level xx with:</h5>
                    <div className= "container-fluid">
                      <div>Health: <span className="prev-health3">xxx</span></div>
                      <div>Strength: <span className="prev-stren3">xxx</span></div>
                      <div>Armor: <span className="prev-arm3">xxx</span></div>
                      <div>Magic: <span className="prev-mag3">xxx</span></div>
                    </div>
                </div>
            </div>
            <div className='curr-body'>
                <h2 className='margin'>Current Adventure:</h2>
                <div className= "current-adventure">
                    <p></p>
                    <h4>Made it to Level <span className="curr-lv">{currAdventure.enemyLv}</span> with:</h4>
                    <div className= "container-fluid">
                        <div>Health: <span className="curr-health">{currAdventure.playerHealth}</span></div>
                        <div>Strength: <span className="curr-stren">{currAdventure.playerStrength}</span></div>
                        <div>Armor: <span className="curr-arm">{currAdventure.playerArmor}</span></div>
                        <div>Magic: <span className="curr-mag">{currAdventure.playerMagic}/{currAdventure.playerMaxMagic}</span></div>
                    </div>
                </div>
                <span className= "btn">
                    <button type="submit" onClick={() => loadNextPage()}>Continue</button>
                    <button type="submit" onClick={() => newAdventure()}>Start a New Adventure</button>
                </span>
            </div>
        </div>
    </main>
  );
}