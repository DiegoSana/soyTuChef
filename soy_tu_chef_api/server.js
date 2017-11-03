var express             = require('express');
var app                 = express();
var bodyParser          = require('body-parser');
var morgan              = require('morgan');
var mongoose            = require('mongoose');
var passport	        = require('passport');
var config              = require('./config/database');
process.env.PORT        = 8080;
var usuariosRouter      = require('./app/routes/usuariosRouter');
var menuRouter          = require('./app/routes/menuRouter');
var apiRoutes           = require('./app/routes/apiRouter');

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());
// pass passport for configuration
require('./config/passport')(passport);

// connect to database
mongoose.connect(config.database);

// bundle our routes
app.use('/api', apiRoutes);
app.use('/api/usuarios',usuariosRouter);
app.use('/api/menu',menuRouter);


// Start the server
app.listen(process.env.PORT);
console.log('Servidor corriendo en: http://localhost:' + process.env.PORT);
