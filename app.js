require('dotenv').config();
const express = require('express');

const app = express();

app.use('/image', require('./routes/images'));

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.listen(process.env.PORT);