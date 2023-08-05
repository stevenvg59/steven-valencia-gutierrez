const express = require('express');
const router = express.Router();

const pool = require('../dbConfig');


/* const itineraryController = require('../controllers/itineraryController');

router.get('/itinerarios', itineraryController.getAllItinerarios);
router.get('/:id', itineraryController.getItinerarioById);
router.post('/', itineraryController.createItinerario);
router.put('/:id', itineraryController.updateItinerario);
router.delete('/:id', itineraryController.deleteItinerario); */


router.get('/itinerarios', async (req, res) => {
    //const query = 'SELECT * FROM itinerarios';
    //const result = await pool.query(query);
    //const data = result.rows;


    await pool.query(`SELECT * FROM itinerarios`, (err, result) => {

        if (err) {
            throw err;
        }

        console.log(result.rows);
        const data = JSON.stringify(result.rows[0]);
        const data2 = JSON.parse(data);
        res.render('itinerarios', { data: data});
    })

    //res.render('itinerarios', { data: data});
});


module.exports = router;