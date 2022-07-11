require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./common/config');
const routes = require('./routes');

const { DB, PORT = 3000 } = process.env;

const app = express();

app.use(rateLimit(config.rateLimiter));
app.use(helmet());

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB)
  .then(() => console.log('MongoDB connected.'))
  .catch((error) => console.log(error));

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
