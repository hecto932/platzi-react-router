'use strict';

const debug = require('debug')('ssr:server');
const express = require('express');
const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

app.get('*', function (req, res) {
  console.log(req.url);
  fs.readFile('index.html', 'utf-8', function onReadFile(err, data) {
    if (err) {
      return res.status(500).send(err);
    }
    console.log(data);
    res.write(data);
    res.end();
  });
})

const server = http.createServer(app);

server.listen(port, () => {
  debug('Server listening on port ' + port);
})