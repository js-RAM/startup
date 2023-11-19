const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const adventureCollection = db.collection('adventures');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function setAdventures(newAdventures) {
  console.log("Im right here!");
  return await adventureCollection.replaceOne({}, newAdventures[0]);
    //return await adventureCollection.insertOne(newAdventures);
} 

function getAdventures() {
  const cursor = adventureCollection.find();
  return cursor.toArray();
}

module.exports = { setAdventures, getAdventures };