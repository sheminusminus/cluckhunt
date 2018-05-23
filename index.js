import express from './api';

// configure our express instance
const app = express();

const port = process.env.PORT || 3000;

// listen for http verbs
const server = app.listen(port, () => {
  console.info('\x1b[36m%s\x1b[0m', `The magic happens on port ${port}`);
});
