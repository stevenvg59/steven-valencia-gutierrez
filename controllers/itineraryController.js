// itinerariosController.js
const pool = require('../dbConfig');

module.exports = {
  getAllItinerarios: async (req, res) => {
    try {
      const query = 'SELECT * FROM itinerarios';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Resto de los métodos del controlador

};