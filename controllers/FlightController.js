const flightServices = require('../services/FlightService')
const airlineService = require('../services/AirlineService');
const airportService = require('../services/AirportService');

class FlightController {
    async getFlightsBySearch(req, res, next) {
        try {
            const airportDeparture = await airportService.getAirportById(req.body.departure_airport_id);
            const airportArrival = await airportService.getAirportById(req.body.arrival_airport_id);
            const flights = await flightServices.getFlightsBySearch(req, res, next);

            for (const flight of flights) {
                const airline = await airlineService.getAirlineById(flight.airline_id);
                flight.airlineInfo = airline;
                flight.from = airportDeparture;
                flight.to = airportArrival;
            }
            const airlines = await airlineService.getAllAirlines(req,res,next);
           
            const formData = req.body;
            formData.from = airportDeparture;
            formData.to = airportArrival;
            res.render('pages/flights-listing', {formData: formData, flights: flights, airlines: airlines});
        } catch (error) {
            console.error(error);
            throw error; 
        }
    };
    showSeats(req, res, next) {
        res.render('pages/booking-seat',{flightData: JSON.parse(req.body.flightData), class: JSON.parse(req.body.inputData).class});
    }
    showDetailFlightBooking(req,res,next){
        const seat = req.body.seat;
        const classPricing = req.body.class;
        const flightData = JSON.parse(req.body.flightData);
        flightData.classValue = String(classPricing);
        if (classPricing == "Phổ Thông"){
            flightData.classPricing = flightData.economy_price;
        }   
        else{
            flightData.classPricing = flightData.business_price;
        }   
        res.render('pages/flight-booking-detail', {flightData: flightData, seatNo: seat});
    }
}

module.exports = new FlightController;