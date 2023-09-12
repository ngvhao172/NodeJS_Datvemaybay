const airline = require('../models/Airline');
const {multipleMongooseToObject} = require('../util/mongoose');
class AirlineService {
    getAllAirlines = () => {
        return airline.find({})
            .then((airlines) => {
                return multipleMongooseToObject(airlines);
            })
            .catch((error) => {
                throw error;
            });
    }
    getAirlineById = async (req,res,next) => {
        try {
          const airportDatas = await airline.findOne({airline_id_data: "1"});
      
          // if (!airportData) {
          //   return null; 
          // }
      
          return mongooseToObject(airportDatas);
        } catch (error) {
          // console.error(`Error fetching airport by ID: ${error.message}`);
          // throw error; // Rethrow the error or handle it based on your application's needs
        }
      };
}

module.exports = new AirlineService;

