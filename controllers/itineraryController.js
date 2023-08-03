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
  },


  getItinerarioById: async (req, res) => {
    try {
      const { id } = req.params;

      // Realizar la consulta a la base de datos utilizando el ID del itinerario
      const query = 'SELECT * FROM itinerarios WHERE id = $1';
      const values = [id];
      const result = await pool.query(query, values);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Itinerario not found' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateItinerario: async (req, res) => {
    try {
      const { id } = req.params;
      const { ciudadOrigen, ciudadDestino, horarioSalida, horarioLlegada, precioPasaje, busAsignado } = req.body;

      // Realizar la consulta a la base de datos para actualizar el itinerario
      const query = 'UPDATE itinerarios SET ciudadOrigen = $1, ciudadDestino = $2, horarioSalida = $3, horarioLlegada = $4, precioPasaje = $5, busAsignado = $6 WHERE id = $7';
      const values = [ciudadOrigen, ciudadDestino, horarioSalida, horarioLlegada, precioPasaje, busAsignado, id];
      await pool.query(query, values);

      res.json({ message: 'Itinerario updated successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteItinerario: async (req, res) => {
    try {
      const { id } = req.params;

      // Realizar la consulta a la base de datos utilizando el ID del itinerario
      const query = 'DELETE FROM itinerarios WHERE id = $1';
      const values = [id];
      const result = await pool.query(query, values);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Itinerario not found' });
      }

      res.json({ message: 'Itinerario deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};