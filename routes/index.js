const router = require('express').Router();
const { errors } = require('celebrate');
const authRoutes = require('./auth');
const articleRoutes = require('./articles');
const userRoutes = require('./users');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const authMiddleware = require('../middlewares/auth');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const { dbErrorHandler, appErrorHandler } = require('../utils/error-handlers');

router.use(requestLogger);

router.use(authRoutes);
router.use(authMiddleware);

router.use('/articles', articleRoutes);
router.use('/users', userRoutes);

router.use('*', () => {
  throw new ResourceNotFoundError();
});

router.use(errorLogger);

router.use(errors());
router.use(dbErrorHandler);
router.use(appErrorHandler);

module.exports = router;
