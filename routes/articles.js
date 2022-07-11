const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { urlValidator } = require('../utils/route-validators');

router.get('/', getAllArticles);

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(urlValidator),
    image: Joi.string().required().custom(urlValidator),
  }),
}), createArticle);

router.delete('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24),
  }),
}), deleteArticle);

module.exports = router;
