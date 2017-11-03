var mongoose            = require('mongoose');
var Schema              = mongoose.Schema;


var MenuSchema = new Schema({
    titulo: {
        type: String,
        minlength: [2, "El título es demasiado corto"],
        maxlength: [40, "El título no puede contener mas de 40 caracteres"],
        required: [true, "Debe ingresar un nombre para el menú"]
    },
    tipoMenu: {
        type: Number,
        //enum: [1,2,3,4],//["en casa del chef","domicilio","retiro","retiro o a domicilio"],
        min: [1, "Ingrese un tipo de menú válido"],
        max: [4, "Ingrese un tipo de menú válido"],
        required: [true, "Debe ingresar el tipo de menu"]
    },
    descripcion: {
        type: String,
        minlength: [2, "La descripción es demasiado corta"],
        maxlength: [300, "La descripción no puede contener mas de 300 caracteres"]
    },
    ubicacion: {
        type: mongoose.Schema.ObjectId,
        ref: 'Direccion'
    },
    cantidad: {
        type: Number,
        min: [1, "Debe ingresar una catidad adecuada"],
        max: [1000, "Debe ingresar una cantidad adecuada"]
    },
    precio: {
        type: String,
        min: [1, "Debe ingresar un precio adecuado"]
    },
    tags: [{
        type: String,
        enum: ["China", "Mexicana", "Argentina", "Peruana", "De autor"],
        trim: true
    }],
    fechaOferta: {
        type: Date
    },
    horarioDesde: {
        type: String
    },
    horarioHasta: {
        type: String
    },
    usuario: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    fotos: {
        type: [String]
    },
    fehca: {
        type: Date,
        default: Date.now()
    },
    estado: {
        type: String,
        enum: ["creado","publicado","cancelado","finalizado"],
        default: "creado"
    }
});

module.exports = mongoose.model('Menu', MenuSchema);