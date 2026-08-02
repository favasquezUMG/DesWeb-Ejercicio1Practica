const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//Parsear las request  de tipo application/JSON
app.use(bodyParser.json());

// Parsear requests de tipo application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
// // Si necesitas recrear las tablas desde cero (¡cuidado, borra los datos!):
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

//Ruta simple de prueba
app.get("/", (req, res) => {
    res.json({ message: "Ed Maverick es de lo mejor. Y la pagina si esta viva" });
});

//Aqui se registran todos los componentes que se desean
// Si agregas más recursos (ej. tutorial), regístralos igual:
// require("./app/routes/tutorial.route")(app);
require("./app/routes/cliente.route")(app);

//Setear un puerto, escucha para las consultas
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is runnig on port ${PORT}.`);
});
