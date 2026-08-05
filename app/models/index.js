const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

let sequelize;

if(dbConfig.URL){
    sequelize = new Sequelize(dbConfig.URL, {
        dialect: dbConfig.dialect,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    });
} else {
    const sequelizeOptions = {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    };

    if(dbConfig.ssl){
        sequelizeOptions.dialectOptions = {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }

    sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, sequelizeOptions)
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Registro de modelos
db.clientes = require("./cliente.model.js")(sequelize, Sequelize);

module.exports = db;