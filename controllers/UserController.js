const userService = require('../services/UserService');
const airportController = require('../controllers/AirportController');

class UserController{
    getAllUser(req, res, next) {
        userService.getAllUser()
            .then((users) => {
                res.status(200).json({ message: "ok", data: users });//api
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Internal Server Error" });
            });
    }
    getUserById(req,res, next) {
        const id = req.params.id;
        userService.getUserById(id)
        .then((user) => {
            res.status(200).json({ message: "ok", data: user });//api
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        });
    }
    login(req,res,next) {
        res.render('pages/authentication/login', {layout: null});
    }
    async loginAccount(req,res,next) {
        const {email, password} = req.body;
        let airports = await airportController.getAllAirport();
        userService.loginAccount(email, password)
        .then((user) => {
            // res.status(200).json({ message: "ok", data: user });//api
            // console.log(user);
            const userJSON = JSON.stringify(user);

            req.session.user = userJSON;
            res.render("pages/client/index", {airports, user});
        })
        .catch((error) => {
            res.render("pages/authentication/login", {error: "Sai tài khoản hoặc mật khẩu", layout:null});            
        });
    }
    logoutAccount(req,res,next){
        delete req.session.user;
        res.redirect("/");
        res.end();
    }
}


module.exports = new UserController;