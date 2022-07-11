const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../common/config');
const { CREATED } = require('../enums/response-statuses');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((data) => res.send({
      token: jwt.sign(
        { _id: data._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: config.auth.loginDuration },
      ),
    }))
    .catch(next);
};

const registerUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => User.create({
      email,
      password: hashedPassword,
      name,
    }))
    .then((user) => res.status(CREATED).send({ _id: user._id, email: user.email }))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .then((user) => {
      res.send({ email: user.email, name: user.name });
    })
    .catch(next);
};

module.exports = {
  loginUser,
  registerUser,
  getCurrentUser,
};
