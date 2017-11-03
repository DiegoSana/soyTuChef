var express 			= require('express'); 
var app 				= express();
var bodyParser 			= require('body-parser');
//var http 				= require('http');
var request 			= require('request');
//var querystring 		= require('querystring');
var cookieParser 		= require('cookie-parser');
var session 			= require('express-session');
var usuariosRouter      = require('./app/routes/usuariosRouter');
var menuesRouter      	= require('./app/routes/menuesRouter');
var siteRouter			= require('./app/routes/siteRouter');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'keyboard cat'}))
app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', require('ejs').renderFile);

// Routes
app.use('/usuarios', usuariosRouter);
app.use('/menues', menuesRouter);
app.use('/', siteRouter);

app.listen(3000);
console.log("Servidor corriendo en http://localhost:3000");