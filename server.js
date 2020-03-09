const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();
app.use(history({
  verbose: true,
}));
app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(express.static('.'));
const port = process.env.PORT || 3000;
app.listen(port);
