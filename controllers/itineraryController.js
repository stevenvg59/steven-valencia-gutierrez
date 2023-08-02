// itinerariosController.js
const pool = require('../dbConfig');
const Itinerario = require('../models/itinerary');

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

  // Resto de los métodos del controlador...
  //

  createItinerario: async (req, res) => {
    try {
      const { ciudadOrigen, ciudadDestino, horarioSalida, horarioLlegada, precioPasaje, busAsignado } = req.body;

      // Crear una instancia de Itinerario
      const itinerario = new Itinerario(ciudadOrigen, ciudadDestino, horarioSalida, horarioLlegada, precioPasaje, busAsignado);

      // Realizar la operación de creación en la base de datos
      const query = 'INSERT INTO itinerarios (ciudadOrigen, ciudadDestino, horarioSalida, horarioLlegada, precioPasaje, busAsignado) VALUES ($1, $2, $3, $4, $5, $6)';
      const values = [itinerario.ciudadOrigen, itinerario.ciudadDestino, itinerario.horarioSalida, itinerario.horarioLlegada, itinerario.precioPasaje, itinerario.busAsignado];
      await pool.query(query, values);

      res.status(201).json({ message: 'Itinerario created successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};