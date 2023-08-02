const express = require('express');
const router = express.Router();

const pool = require('../dbConfig');
const itineraryController = require('../controllers/itineraryController');

router.get('/itinerarios', itineraryController.getAllItinerarios);

module.exports = router;