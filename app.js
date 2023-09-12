const express = require('express')
const hbs = require('express-handlebars').engine;
const app = express()
// Connect to Database
const db = require('./config/db');
db.connect();

const port = 3000;
app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
app.use('/flight', express.static(__dirname + '/public'));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// init Route middle
const initRoute = require('./routes');
initRoute(app);


app.listen(port, ()=> console.log(`Server listening on port: ${port}`));
