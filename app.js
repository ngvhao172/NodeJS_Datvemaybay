const express = require('express')
const hbs = require('express-handlebars').engine;
const session = require('express-session');
const app = express()
// Connect to Database
const db = require('./config/db');
db.connect();
const port = 3000;
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
app.use(express.json());
// session initialization
app.use(session({
    secret: 'mysecretkey', 
    resave: false,        
    saveUninitialized: false,
    cookie: {
        secure: false,
    }
}));

// init Route middle
const initRoute = require('./routes');
initRoute(app);


app.listen(port, ()=> console.log(`Server listening on port: ${port}`));
