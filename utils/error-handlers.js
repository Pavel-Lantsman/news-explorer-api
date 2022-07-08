const mongoose = require('mongoose');
const {
  INVALID_DATA,
  NOT_FOUND,
  CONFLICT,
  SERVER_ERROR,
} = require('../enums/response-statuses');

const dbErrorHandler = (error, req, res, next) => {
  const { ValidationError, DocumentNotFoundError } = mongoose.Error;

  if (error instanceof ValidationError) {
    res.status(INVALID_DATA).send({ message: error.message });
    return;
  }

  if (error instanceof DocumentNotFoundError) {
    res.status(NOT_FOUND).send({ message: 'Requested resource not found.' });
    return;
  }

  if (error.name === 'MongoServerError' && error.code === 11000) {
    res.status(CONFLICT).send({ message: 'Email address is already in use.' });
    return;
  }

  next(error);
};

const appErrorHandler = (error, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = error;

  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR ? 'An error has occurred on the server.' : message,
  });
};

module.exports = {
  dbErrorHandler,
  appErrorHandler,
};
