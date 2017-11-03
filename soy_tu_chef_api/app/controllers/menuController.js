var Menu                    = require("./../models/menu");
var Direccion               = require('./../models/direccion');


module.exports.getMenu = function (req, res) {

    if(req.params.id)
    {
        Menu.findById(req.params.id)
        .populate('ubicacion')
        .populate('usuario','-_id -password -estado -fecha -__v')
        .exec(function (err, menu) {
            if (err) throw err;

            if(!menu){
                return res.status(403).send({success: false, msg: 'Menu no encontrado'});
            } else {
                return res.status(200).json({success: true, menu: menu});
            }
        });
    } else {

        Menu.find({"usuario": req.user._id})
        .populate('ubicacion')
        .populate('usuario','-_id -password -estado -fecha -__v')
        .exec(function (err, menues) {
            if (err) throw err;

            if(!menues.length){
                return res.status(403).send({success: true, msg: 'Menu no encontrado', menues: menues});
            } else {
                return res.status(200).json({success: true, menues: menues});
            }
        });
    }

}

module.exports.postMenu = function (req, res, next) {

    var newMenu = new Menu({
        usuario: req.user._id,
        titulo: req.body.titulo,
        tipoMenu: req.body.tipoMenu
    });    

    newMenu.save(function (err, menu) {
        if (err) {
            res.status(403).json({success: false, msg: err});
        } else {
            console.log("Menu creado! id: " + newMenu._id);
            res.json({success: true, menu: menu});
        }
    });
}

module.exports.putMenu = function (req, res) {

    if(req.param('id'))
    {
        Menu.findById(req.param('id'))
        .populate('ubicacion')
        .populate('usuario','-_id -password -estado -fecha -__v')
        .exec(function (err, menu) {
            if (err) 
                return res.status(403).send({success: false, msg: 'Error en la búsqueda'});
            if(!menu)
                return res.status(403).send({success: false, msg: 'Menu no encontrado'});

            if(!menu.ubicacion)
                var newUbicacion = new Direccion();
            else
                var newUbicacion = menu.ubicacion;        

            for (var key in req.body){
                if(menu.schema.path(key)) {
                    if(req.body[key].isArray){
                        for (var k in req.body[key])
                            menu[key][k] = req.body[key][k];
                    } else {
                        menu[key] = req.body[key];
                    }
                }
                if(newUbicacion.schema.path(key)) newUbicacion[key] = req.body[key];
            }

            if(req.body.fechaOferta){
                var fechaSplit = req.body.fechaOferta.split("-",3);
                var fechaOferta = new Date(fechaSplit[2],fechaSplit[1]-1,fechaSplit[0]);
                menu.fechaOferta = fechaOferta.toISOString();
            }

            if(newUbicacion.pais) {

                newUbicacion.save(function(err,ubicacion){
                    if(err)
                        return res.status(403).send({success: false, msg: "No se pudo guardar la ubicación", error:err});
                    else{
                        menu.ubicacion = ubicacion._id;
                        menu.save(function(err, men){
                            if(err){
                                return res.status(403).send({success: false, msg: 'No se pudo guardar el menú', error: err});
                            } else {
                                return res.status(200).json({success: true, menu: men});
                            }
                        });
                    }

                });

            } else {

                menu.save(function(err, men){
                    if(err){
                        return res.status(403).send({success: false, msg: 'No se pudo guardar el menú', error: err});
                    } else {
                        return res.status(200).json({success: true, menu: men});
                    }
                });

            }
        });
    }

}

module.exports.deleteMenu = function (req, res) {

}