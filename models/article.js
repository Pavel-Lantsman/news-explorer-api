const mongoose = require('mongoose');
const User = require('./user');
const { urlValidator } = require('../utils/schema-validators');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: urlValidator,
    required: true,
  },
  image: {
    type: String,
    validate: urlValidator,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
