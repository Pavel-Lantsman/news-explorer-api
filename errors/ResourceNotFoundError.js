const { NOT_FOUND } = require('../enums/response-statuses');

class ResourceNotFoundError extends Error {
  constructor() {
    super('Requested resource not found.');
    this.statusCode = NOT_FOUND;
  }
}

module.exports = ResourceNotFoundError;
