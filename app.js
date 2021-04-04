require('dotenv').config();
const express = require('express');

const app = express();

app.enable('trust proxy');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  res.setHeader('Access-Control-Allow-Headers', '*');
  console.log(req.socket.ip);
  next();
});

app.use('/image', require('./routes/images'));

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.listen(process.env.PORT);