const express = require('express');
const images = require('./../controllers/image')

const imagesRoutes = express.Router();
imagesRoutes.route('/upload').post(images.uploadImage);
imagesRoutes.route('/:imageName').get(images.getImage);

module.exports = imagesRoutes;