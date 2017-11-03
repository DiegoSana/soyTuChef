var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DireccionSchema = new Schema({
	pais: {
	    type: String,
        enum: ["Argentina"],
        required: [true, "Debe ingresar el pais"]
    },
	ciudad: {
        type: String,
        required: [true, "Debe ingresar la ciudad"]
    },
    calle: {
        type: String,
        required: [true, "Debe ingresar la calle"]
    },
    numero: {
        type: String,
        required: [true, "Debe ingresar el número"]
    },
    adicional: String,
    latitud: {
        type: String,
        required: [true, "No se pudo identificar la latitud de la ubicación"]
    },
    longitud: {
        type: String,
        required: [true, "No se pudo identificar la longitud de la ubicación"]
    },
});

module.exports = mongoose.model('Direccion', DireccionSchema);