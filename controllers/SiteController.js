const airportController = require('../controllers/AirportController');
const {mongooseToObject} = require('../util/mongoose');

class SiteController {
    async index(req, res, next) {

      const user = await req.user;
      let airports = await airportController.getAllAirport();
      res.render("pages/client/index", {airports, user: mongooseToObject(user)});
       
    }
    async showPassengerInfo(req,res,next){
        const {
            firstName,lastName,phoneNumber,address,Dob,seatNo
          } = req.body;
        
          const passenger = {
            firstName,lastName,phoneNumber,address,Dob, seatNo
          };
          let seatNoValue = JSON.parse(seatNo);
          passenger.seatNo = seatNoValue;
        const flightData = JSON.parse(req.body.flightData);
        const user = await req.user;
        res.render("pages/client/personal-info-verify", {flightData: flightData, passengerInfo: passenger, user: mongooseToObject(user)});
        // if(req.session.user){
        //   const user = JSON.parse(req.session.user);
        //   res.render("pages/client/personal-info-verify", {flightData: flightData, passengerInfo: passenger,user});
        // }
        // else{
        //   res.render("pages/client/personal-info-verify", {flightData: flightData, passengerInfo: passenger});
        // }
    
    }
    async showPaymentBooking(req, res, next){
        const flightData = JSON.parse(req.body.flightData);
        let passengerInfo;
        if(req.body.passengerInfo){
           passengerInfo = JSON.parse(req.body.passengerInfo);
        }
        else{
           passengerInfo = null
           let seatNoValue = JSON.parse(req.body.seatNo);
           flightData.seatNo = seatNoValue;
        }
        const user = await req.user;
        res.render("pages/client/booking-detail", {flightData, passengerInfo, user: mongooseToObject(user)});
    }
    async showTicket(req,res,next){
      const flightData = JSON.parse(req.body.flightData);
        let passengerInfo;
        if(req.body.passengerInfo){
          passengerInfo = JSON.parse(req.body.passengerInfo);
        }
        else{
          passengerInfo = null
        }
      const user = await req.user;
      res.render('pages/client/ticket-info', {flightData, passengerInfo, user: mongooseToObject(user)});
    }
   
}

module.exports = new SiteController;