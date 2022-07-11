const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const IncorrectCredentialsError = require('../errors/IncorrectCredentialsError');
const { emailValidator } = require('../utils/schema-validators');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: emailValidator,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((data) => {
      if (!data) {
        throw new IncorrectCredentialsError();
      }

      return bcrypt.compare(password, data.password)
        .then((isMatched) => {
          if (!isMatched) {
            throw new IncorrectCredentialsError();
          }

          return data;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
