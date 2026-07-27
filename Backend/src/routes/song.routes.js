const express = require('express');
const upload = require('../middlewares/upload.middleware');
const songContoller = require('../controllers/song.controller');

const songRoter = express.Router();


songRoter.post("/", upload.single('song'), songContoller.uploadSongController);

songRoter.get("/", songContoller.getSongController)




module.exports = songRoter;