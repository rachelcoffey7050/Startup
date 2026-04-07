
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Serve up the applications static content
app.use(express.static('public'));

peerProxy(httpService);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  if (!user) {
    return res.status(404).send({ msg: "User not found" });
  }
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', async (req, res) => {
  const token = req.cookies[authCookieName];
  const user = token ? await findUser('token', token) : null;
  if (user) {
    await DB.updateUserRemoveAuth(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

//get all polls
apiRouter.get('/polls', async (req, res) => {
  const polls = await DB.getPollList();
  res.send(polls);
});

// create poll
apiRouter.post('/polls', async (req, res) => {
  const { title, description, options, voteCount } = req.body;
  if (!title|| !options || !Array.isArray(options)) {
    return res.status(400).send({ msg: "Invalid poll data" });
  }
  
  const newPoll = {
    id: uuid.v4(),
    title,
    description,
    options,
    voteCounts: voteCount || Array(options.length).fill(0),
  };
  await DB.addPoll(newPoll);
  
  const pollsList = DB.getPollList();
  peerProxy({ type: "pollsUpdated", polls: pollsList });
  
  res.send(newPoll);
});

apiRouter.delete('/polls/:id', verifyAuth, async (req, res) => {
  const id = req.params.id;
  await DB.deletePoll(id);
  res.status(204).end();

  const pollsList = DB.getPollList();
  peerProxy({ type: "pollsUpdated", polls: pollsList });
});

// get one poll
apiRouter.get("/polls/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Incoming request for poll:", id);
  const poll = await DB.getPoll(id);
  if (!poll) {
    res.status(404).send({ msg: 'Poll not found' });
    return;
  }
  res.send(poll)
})

// update poll
apiRouter.put("/polls/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updated = {
      voteCounts: req.body.voteCounts,
    };

    const result = await DB.updatePoll(id, updated);
    if (!result) {
      return res.status(500).send({ msg: "Failed to update poll" });
    }

    const pollsList = DB.getPollList();
    peerProxy({ type: "pollsUpdated", polls: pollsList });

    res.send(result);
  } catch (error) {
    console.error("Error updating poll:", error);
    res.status(500).send({ msg: "Internal server error" });
  }
})

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
