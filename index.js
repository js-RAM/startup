const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get('/adventures', (_req, res) => {
  res.send(adventures);
});

// SubmitFinishedAdventure
apiRouter.post('/adventure', (req, res) => {
  adventures = updateAdventure(req.body, adventures);
  res.send(adventures);
});

apiRouter.post('/adventuress', (req, res) => {
    adventures = req.body;
    res.send(req.body);
  });

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//Updates previous play adventures
let adventures = [{playerHealth: 55, playerStrength: 5, playerArmor: 1, playerMagic: 5, playerMaxMagic: 5, enemyLv: 1}];
function updateAdventure(newAdventure, adventures) {
  for (let i = 0; i < 3; i++) {
    if (adventures.length > i) {     
        if (adventures.length > (i + 1)) {
            adventures[i+1] = adventures[i];
        } else {
            adventures.push(adventures[i])
        }
        adventures[i] = newAdventure;
    }
  }
  return adventures;
}
