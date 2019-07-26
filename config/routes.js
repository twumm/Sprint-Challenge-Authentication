const axios = require('axios');

const { authenticate, hashPassword, reversePasswordHash, generateToken } = require('../auth/authenticate');
const Users = require('./usersModel');

module.exports = server => {
  server.post('/api/register', hashPassword, register);
  server.post('/api/login', reversePasswordHash, login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res, next) {
  const { username } = req.body;
  const user = {
    username,
    password: req.hashedPassword
  }
  try {
    const newUser = await Users.addUser(user);
    res
      .status(201)
      .json(newUser);
  } catch (error) {
    next(new Error('Could not register user. Please try again'));
  }
}

async function login(req, res, next) {
  try {
    if (req.user) {
      const token = await generateToken(req.user);
      
      res
        .status(200)
        .json({
          user: {
            id: req.user.id,
            username: req.user.username,
          },
          token
        });
    } else {
      next(new Error("You are not authorised"));
    }
  } catch (error) {
    next(new Error('Login failed miserably. Kindly try again'));
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
