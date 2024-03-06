const express = require("express");
const mongoose = require("mongoose");
const conectarDB = require("./config/db");
const home = require("./routes/home");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

const port = process.env.PORT || 3000;

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
app.use("/api/task", taskRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
