const express = require('express')
const app = express()
const hbs = require('express-handlebars').engine;
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
// config passport
const initializeGooglePassport = require('./config/oauth2');
const initializePassport = require('./config/passport-config');
// config gg passport


require('dotenv').config({path: './config/.env'});

// Connect to Database
const db = require('./config/db');
db.connect();
const port = process.env.PORT;
const customHelpers = require('./util/customHelpers');
app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        ...customHelpers.helpers
    }
}))
app.set('view engine', 'hbs')
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
app.use('/select-flight', express.static(__dirname + '/public'));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(session({
    secret: 'mysecretkey', 
    resave: false,        
    saveUninitialized: false,
    cookie: {
        secure: false,
    }
}));
app.use(express.json());
app.use(flash());
app.use(passport.initialize()) 
app.use(passport.session())

// init Google passport
initializeGooglePassport(passport);


// // innitalizepassport config
initializePassport(passport);




// init Route middle
const initRoute = require('./routes');
initRoute(app);


app.listen(port, ()=> console.log(`Server listening on port: ${port}`));
