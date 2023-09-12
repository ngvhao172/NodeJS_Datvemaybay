const express = require('express');
const route = express.Router();
const flightController = require('../controllers/FlightController');
const airportService = require('../services/AirportService');
const airlineService = require('../services/AirlineService');

// route.get('/', flightController.index);
route.post('/flight-listing', flightController.getFlightsBySearch);
route.get('/airline/:id', (req, res) => {
  const airportId = req.params.id;

  airlineService.getAirlineById()
    .then((airport) => {
      if (!airport) {
        return res.status(404).json({ message: 'Airport not found' });
      }

      res.json(airport); // Send the airport data as a JSON response
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred' });
    });
});

route.get('/airport/:id', (req, res) => {
    const airportId = req.params.id;
  
    airportService.getAirportById(airportId)
      .then((airport) => {
        if (!airport) {
          return res.status(404).json({ message: 'Airport not found' });
        }
  
        res.json(airport); // Send the airport data as a JSON response
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred' });
      });
  });
// route.get('/flight-detail', flightController.show);


module.exports = route;