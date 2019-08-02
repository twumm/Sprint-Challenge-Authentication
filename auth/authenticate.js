const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Users = require('../config/usersModel');

const jwtKey = process.env.JWT_SECRET;

// quickly see what this file exports
module.exports = {
  authenticate,
  hashPassword,
  reversePasswordHash,
  generateToken,
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}

async function hashPassword(req, res, next) {
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hashSync(password, 12);
    req.hashedPassword = hashedPassword;
    next();
  } catch (error) {
    next(new Error('Something went wrong. Please try again.'));
  }
}

async function reversePasswordHash(req, res, next) {
  const { username, password } = req.body;
  try {
    Users.findUserBy({username})
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          req.user = user;
          next();
        } else {
          res.status(401).json({ message: 'Invalid credentials '});
        }
      })
  } catch (error) {
    next(new Error('Something went wrong. Please try again'));
  }
}

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, jwtKey, options);
}
