var express             = require('express');
var app                 = express();
var apiRouter           = express.Router();
var User                = require('./../models/usuario');
var jwt                 = require('jwt-simple');
var config              = require('./../../config/database');

// demo Route (GET http://localhost:8080)
apiRouter.get('/', function(req, res) {

  res.send('Hello! The API is at http://localhost:' + process.env.PORT + '/api');
});


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRouter.post('/autenticacion', function(req, res) {
  
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      return res.status(403).send({success: false, msg: 'Falló la autenticación. Usuario no encontrado.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          console.log('usuario autenticado -> nombre: '+user.nombre+', id: '+user._id);
          res.json({success: true, token: 'JWT ' + token, uid: user._id});
        } else {
          return res.status(403).send({success: false, msg: 'Password o usuario incorrecto.'});
        }
      });
    }
  });
});

module.exports = apiRouter;