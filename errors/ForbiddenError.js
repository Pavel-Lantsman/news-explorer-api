const { FORBIDDEN } = require('../enums/response-statuses');

class ForbiddenError extends Error {
  constructor() {
    super('Not allowed to perform requested action.');
    this.statusCode = FORBIDDEN;
  }
}

module.exports = ForbiddenError;
