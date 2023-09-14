const airportController = require('../controllers/AirportController');

class SiteController {
    async index(req, res, next) {
        let airports = await airportController.getAllAirport();
        res.render("pages/index", {airports});
    }
    showPassengerInfo(req,res,next){
        const {
            firstName,lastName,phoneNumber,address,Dob,seatNo
          } = req.body;
        
          const passenger = {
            firstName,lastName,phoneNumber,address,Dob, seatNo
          };
          let seatNoValue = JSON.parse(seatNo);
          passenger.seatNo = seatNoValue;
        const flightData = JSON.parse(req.body.flightData);
        res.render("pages/personal-info-verify", {flightData: flightData, passengerInfo: passenger});
    }
    showPaymentBooking(req, res, next){
        const flightData = JSON.parse(req.body.flightData);
        const passengerInfo = JSON.parse(req.body.passengerInfo);
        // console.log(flightData)
        // console.log(passengerInfo)
        res.render("pages/booking-detail", {flightData, passengerInfo});
    }
    showTicket(req,res,next){
      const flightData = JSON.parse(req.body.flightData);
      const passengerInfo = JSON.parse(req.body.passengerInfo);
      res.render('pages/ticket-info', {flightData, passengerInfo});
    }
}

module.exports = new SiteController;