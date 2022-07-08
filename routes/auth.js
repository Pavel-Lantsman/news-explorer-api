const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { loginUser, registerUser } = require('../controllers/users');

router.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), loginUser);

router.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), registerUser);

module.exports = router;
