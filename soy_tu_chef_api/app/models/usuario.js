var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
require("./direccion");



var UserSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "Debe ingresar su nombre"],
        minlength: [2, "El nombre es demasiado corto"],
        maxlength: [40, "El nombre no puede contener mas de 40 caracteres"]
    },
    password: {
        type: String,
        required: [true, "Debe ingresar su password"],
        minlength: [4, "La constraseña debe tener mas de 4 caracteres"],
        maxlength: [60, "La constraseña no puede tener mas de 60 caracteres"]
    },
    email: {
        type: String,
        unique: true,
        require: [true, "Debe ingresar su email"],
        maxlength: [40, "El email no puede contener mas de 40 caracteres"]
    },
    descripcion: {
        type: String,
        minlength: [2, "La descripción es demasiado corta"],
        maxlength: [300, "La descripción no puede contener mas de 300 caracteres"]        
    },
    estado: {
        type: Boolean,
        require: true,
        default: false
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    web: {
        type: String,
        minlength: [4, "La dirección del sitio es demasiado corta"],
        maxlength: [100, "La dirección del sitio no puede tener mas de 100 caracteres"]
    },
    facebook: {
        type: String,
        minlength: [4, "El link de facebook es demasiado corto"],
        maxlength: [100, "El link de facebook no puede tener mas de 100 caracteres"]
    },
    instagram: {
        type: String,
        minlength: [4, "El link de instagram es demasiado corto"],
        maxlength: [100, "El link de instagram no puede tener mas de 100 caracteres"]
    },
    image: {
        type: String
    }
});

UserSchema.plugin(uniqueValidator, { message: '{VALUE} ya existe.' });

UserSchema.pre('save', function (next, done) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.pre('validate', function(next){
    if (this.isModified('email') && !this.isNew)
        this.invalidate("email", "No se puede modificar el email");
    
    next();
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};



module.exports = mongoose.model('User', UserSchema);
