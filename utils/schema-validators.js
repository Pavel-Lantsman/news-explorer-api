const validator = require('validator');

const emailValidator = {
  validator: (value) => validator.isEmail(value),
  message: (props) => `${props.value} is not a valid email address!`,
};

const urlValidator = {
  validator: (value) => validator.isURL(value),
  message: (props) => `${props.value} is not a valid URL!`,
};

module.exports = {
  emailValidator,
  urlValidator,
};
