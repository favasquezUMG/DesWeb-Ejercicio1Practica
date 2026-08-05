const db = require("../models");
const Cliente = db.clientes;
const Op = db.Sequelize.OP;

//Creacion de cliente
exports.create = (req, res) => {
    if(!req.body.nombre){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const cliente = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        correo: req.body.correo,
        telefono: req.body.telefono,
        ingreso: req.body.ingreso,
        status: req.body.status ? req.body.status : false
    };

    Cliente.create(cliente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error ocurred while creating the Client."
            });
        });
};

//Consulta de todos los clientes
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre : { [Op.iLike]: `%${nombre}%` } } : null;

    Cliente.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status.send({
                message: err.message || "Some error ocurred while retrieving clients"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Cliente.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Client with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Cliente.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if( num == 1 ){
            res.send({
                message: "Client was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Client with id=${id}. Cliente was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Client with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Cliente.destroy({
        where: { id: id }
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "Client was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Client with id=${id}. Client not founded.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Cold not delete Client with id=" + id
        });
    });
};

exports.deleteAll = (req, res) => {
    Cliente.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Clients were deleted successfully!` })
    })
    .cath(err => {
        res.status(500).send({
            message: err.message || "Some error ocurred while removing all clients."
        });
    });
};

exports.findAllStatus = (req, res) => {
    Cliente.findAll({ where: { status: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Client."
        });
    });
};