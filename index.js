const express = require("express");
const mongoose = require("mongoose");
const conectarDB = require("./config/db");
const home = require("./routes/home");
const authRoutes = require("./routes/auth");

// Creación del servidor
const app = express();

// Conectar base de datos
conectarDB();

app.use(express.json());

mongoose.connect(process.env.DB_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/home", home);
app.use("/api/auth", authRoutes);

app.listen(4000, () => {
  console.log("El servidor esta corriendo en el puerto 4000");
});
