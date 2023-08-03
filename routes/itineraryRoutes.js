const express = require('express');
const router = express.Router();

const pool = require('../dbConfig');
const itineraryController = require('../controllers/itineraryController');

router.get('/itinerarios', itineraryController.getAllItinerarios);
router.get('/:id', itineraryController.getItinerarioById);
router.post('/', itineraryController.createItinerario);
router.put('/:id', itineraryController.updateItinerario);
router.delete('/:id', itineraryController.deleteItinerario);

module.exports = router;