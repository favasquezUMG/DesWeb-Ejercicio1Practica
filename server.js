const dotenv = require("dotenv");
const envFile = process.env.NODE_ENV === "development" ? ".env.development" : ".env.production";
dotenv.config({ path: envFile });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

//app.use(cors(corsOptions));
app.use(cors());

//Registramos el modulo de pago antes del bodyParser porque Stripe no maneja objetos tipo JSON
app.post("/api/pago/webhook", express.raw({ type: "application/json" }),
    require("./app/controllers/pago.controller.js").webhook
)

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
    res.json({ message: "Ed Maverick es de lo mejor", Ambiente: process.env.NODE_ENV || "development" });
});

//Aqui se registran todos los componentes que se desean (de la carpeta Routes)
// Si agregas más recursos (ej. tutorial), regístralos igual:
// require("./app/routes/tutorial.route")(app);
require("./app/routes/cliente.route")(app);
require("./app/routes/auth.route")(app);
require("./app/routes/pago.route")(app);

//Setear un puerto, escucha para las consultas
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is runnig on port ${PORT}.`);
});
