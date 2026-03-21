const { MongoClient } = require('mongodb');
const config = require('service/dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('storypolls');
const userCollection = db.collection('user');
const scoreCollection = db.collection('poll');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

async function addPoll(poll) {
  return pollCollection.insertOne(poll);
}

function getPollList() {
  const query = { poll: { $gt: 0, $lt: 500 } };
  const cursor = scoreCollection.find(query);
  return cursor.toArray();
}

// import { ObjectId } from "mongodb";
// async function deletePoll(id) {
//   return pollCollection.deleteOne({ _id: new ObjectId(id) });
// }
async function deletePoll(_id) {
  await pollCollection.deleteOne({ id: _id });
}

function getPoll(_id) {
  return pollCollection.findOne({ id: _id });
}

async function updatePoll(_id, poll){
  await userCollection.updateOne({ id: _id }, { $set: poll });
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  addPoll,
  getPollList,
  deletePoll,
  getPoll,
  updatePoll,
};
