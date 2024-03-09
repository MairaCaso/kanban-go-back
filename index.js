const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const conectarDB = require("./config/db");
const home = require("./routes/home");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const app = express();

const port = process.env.PORT || 3000;

// Configuración de CORS para permitir solicitudes desde localhost:4200
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"], // Puedes ajustar los métodos permitidos según tu necesidad
    allowedHeaders: ["Content-Type", "Authorization"], // Puedes ajustar los encabezados permitidos según tu necesidad
  })
);

// Conectar base de datos
conectarDB();

app.use(express.json());

mongoose.connect(process.env.DB_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/home", home);
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
