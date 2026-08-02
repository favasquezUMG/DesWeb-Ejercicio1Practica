require('dotenv').config();

if(!process.env.DATABASE_URL){
    console.error("ERROR: La variable DATABASE_URL no esta definida en las variables de entorno.")
}

module.exports = {
    URL: process.env.DATABASE_URL,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};