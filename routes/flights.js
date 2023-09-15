const express = require('express');
const route = express.Router();
const flightController = require('../controllers/FlightController');
const airportService = require('../services/AirportService');
const airlineService = require('../services/AirlineService');

route.post('/booking-seat', flightController.showSeats);

route.post('/flight-detail-booking', flightController.showDetailFlightBooking);

route.post('/', flightController.getFlightsBySearch);

// route.get('/airline/:id', (req, res) => {
//   const airportId = req.params.id;

//   airlineService.getAirlineById()
//     .then((airport) => {
//       if (!airport) {
//         return res.status(404).json({ message: 'Airport not found' });
//       }

//       res.json(airport); // Send the airport data as a JSON response
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });// api

// route.get('/airport/:id', (req, res) => {
//     const airportId = req.params.id;
  
//     airportService.getAirportById(airportId)
//       .then((airport) => {
//         if (!airport) {
//           return res.status(404).json({ message: 'Airport not found' });
//         }
  
//         res.json(airport); // Send the airport data as a JSON response
//       })
//       .catch((error) => {
//         res.status(500).json({ error: 'An error occurred' });
//       });
//   });



module.exports = route;