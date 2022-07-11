const { CREATED } = require('../enums/response-statuses');
const ForbiddenError = require('../errors/ForbiddenError');
const Article = require('../models/article');

const getAllArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .orFail()
    .then((data) => res.send(data))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((data) => res.status(CREATED).send(data))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { id } = req.params;

  Article.findById(id)
    .select('+owner')
    .orFail()
    .then((data) => {
      if (!data.owner.equals(req.user._id)) {
        throw new ForbiddenError();
      }

      return Article.findByIdAndDelete(id).orFail();
    })
    .then((data) => res.send(data))
    .catch(next);
};

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle,
};
