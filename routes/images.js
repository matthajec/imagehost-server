const express = require('express');

const router = express.Router();

const imagesController = require('../controllers/images');

router.post('/', imagesController.postImage);

module.exports = router;