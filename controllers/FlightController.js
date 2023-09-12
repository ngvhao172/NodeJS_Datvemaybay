const flightServices = require('../services/FlightService')
const airlineService = require('../services/AirlineService');
const { getAirportById } = require('./AirportController');

class FlightController {
    // index(req, res, next) {
    //     // res.status(200).json({message:"ok"});
    //     // res.end();
    //     res.send("ok");
    // }
    // show(req, res, next) {
    //     // res.status(200).json({message:"ok"});
    //     // res.end();
    //     res.send("flight detail!!");
    // }
    async getFlightsBySearch(req, res, next) {
        try {
            const flights = await flightServices.getFlightsBySearch(req,res,next);
            const airlines = await airlineService.getAllAirlines(req,res,next);
            // res.json(flights);
            console.log(req.body.departure_airport_id)
            const airportDeparture = await getAirportById(req.body.departure_airport_id);
            const airportArrival = await getAirportById(req.body.arrival_airport_id);
            console.log(airportDeparture);
            console.log(airportArrival);
            const formData = req.body;
            formData.from = airportDeparture;
            formData.to = airportArrival;
            // res.status(200).json(airports);//api
            // return multipleMongooseToObject(airports);
            console.log(req.body); 
            res.render('flights-listing', {formData: formData, flights: flights, airlines: airlines});
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }
}

module.exports = new FlightController;