const airportController = require('../controllers/AirportController');

class SiteController {
    async index(req, res, next) {
      let airports = await airportController.getAllAirport();
      
        // console.log("sesion: " + JSON.parse(req.session.user));
        if(req.session.user){
          const user = JSON.parse(req.session.user);
          res.render("pages/client/index", {airports, user});
        }
        else{
          res.render("pages/client/index", {airports});
        }
       
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
        if(req.session.user){
          const user = JSON.parse(req.session.user);
          res.render("pages/client/personal-info-verify", {flightData: flightData, passengerInfo: passenger,user});
        }
        else{
          res.render("pages/client/personal-info-verify", {flightData: flightData, passengerInfo: passenger});
        }
    
    }
    showPaymentBooking(req, res, next){
        const flightData = JSON.parse(req.body.flightData);
        const passengerInfo = JSON.parse(req.body.passengerInfo);
        // console.log(flightData)
        // console.log(passengerInfo)
        if(req.session.user){
          const user = JSON.parse(req.session.user);
          res.render("pages/client/booking-detail", {flightData, passengerInfo,user});
        }
        else{
          res.render("pages/client/booking-detail", {flightData, passengerInfo});
        }
        res.render("pages/client/booking-detail", {flightData, passengerInfo});
    }
    showTicket(req,res,next){
      const flightData = JSON.parse(req.body.flightData);
      const passengerInfo = JSON.parse(req.body.passengerInfo);
      res.render('pages/client/ticket-info', {flightData, passengerInfo});
    }
}

module.exports = new SiteController;