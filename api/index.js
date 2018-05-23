import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// main route handler
import router from './router';

// load in our environment variables from .env in root dir
require('dotenv').load();

// ===========
// express
// ===========

module.exports = () => {
  // instance of express
  const app = express();

  // if we are on a production environment (aws, etc), we are likely behind a proxy
  if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy');
  }

  // disallow OPTIONS calls
  app.all('*', (req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.status(409).end();
    } else {
      next();
    }
  });

  // such easy params
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  // such easy cookies
  app.use(cookieParser());

  // serve static files (html, js, css, images, etc)
  app.use(express.static(path.join(__dirname, '../dist/public'), {
    index: 'index.html',
    redirect: false,
  }));

  // register api route handler
  app.use('/api', router);

  // serve the index.html over all unmatched Routes.js
  app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../dist/public/index.html'));
  });

  // handle errors (last middleware to catch all)
  app.use((err, req, res, next) => {
    if (err) {
      // TODO: replace with logging util/service
      console.error('ERROR - %s, %s', req.method, req.url);

      // TODO: replace with logging util/service
      console.error(err.stack);

      // determine whether we want to return the error message to the client
      let errorMessage;
      if (process.env.NODE_ENV === 'development') {
        errorMessage = err.message;
      }

      // return 500 error code
      res.status(500).send({ errorMessage });
    }

    next();
  });

  return app;
};
