// Enviromental Variables
const port = process.env.PORT || 3000
// required Module
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

var express = require('express');
var { engine } = require('express-handlebars')

// Coustom Module
var pool = require('./config/db_con.js');
const {getVerify} = require('./controllers/verify.js');

const app = express();

// View Engine Configuration
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Expose This directory
app.use(express.static(path.join(__dirname, './assets/')));
// Use bodyParser Middleware

// a variable to save a session
var session;

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

// Session middleware
app.use(sessions({
    resave: true,
    saveUninitialized: true,
    secret: "Keep it Secret",
    cookie: { maxAge: oneDay }
}));



// Router Imports
var register = require('./routers/register.js')

// Routes Use
app.use('/register', bodyParser.urlencoded({ extended: true, }));
app.use('/register', register)


app.get('/', (req, res) => {
    res.render('home', {});
});

app.get('/watch', (req, res) => {
    res.render('watch', {});
});

app.get('/phone', (req, res) => {
    res.render('watch', {})
})

app.get('/products', (req, res) => {
    res.render('products', {})
})

app.get('/shop', (req, res) => {
    res.render('watch', {})
})

app.get('/contact', (req, res) => {
    res.render('contact', {})
})

app.get('/detail', (req, res) => {
    res.render('detail', {})
})

app.get('/wishlist', (req, res) => {
    res.render('wishlist', {});
});

app.get('/cart', (req, res) => {
    res.render('cart', {});
})


app.get('/verify', getVerify);

app.use('/login', bodyParser.urlencoded({ extended: true, }));
app.get('/login', (req, res) => {
    res.render('login', {});
})

app.get('/forget_password', (req, res) => {
    res.render('forget_password', {});
})

app.listen( port , function() {
    console.log('Listening on port ' + port);
})