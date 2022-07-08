const { UNAUTHORIZED } = require('../enums/response-statuses');

class IncorrectCredentialsError extends Error {

  constructor() {
    super('Incorrect password or email.');
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = IncorrectCredentialsError;
