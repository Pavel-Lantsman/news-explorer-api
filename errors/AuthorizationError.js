const { UNAUTHORIZED } = require('../enums/response-statuses');

class AuthorizationError extends Error {
  constructor() {
    super('Authorization could not be completed.');
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = AuthorizationError;
