const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Función que genera un token de autenticación JWT
// Crea un objeto payload con los argumentos id y email
// Los datos del payload se codificarán en el token
function generateToken(id, email) {
  //Retorna el token generado
  return jwt.sign({ id, email }, process.env.SECRET, {
    expiresIn: "30d", // Tiempo de expiración del token
    algorithm: "HS256", // Algoritmo de hash utilizado
  });
}

// Función para crear usuario
exports.singin = async (req, res) => {
  try {
    // Extrae los datos del usuario
    const { name, lastName, email, password } = req.body;
    // valida si no hay contraseña y devuelve un mensaje
    if (!password) {
      throw new Error("La contraseña es requerida");
    }
    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // Crea un nuevo usuario con la contraseña encriptada
    const user = new User({
      name,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save(); // Guarda el nuevo usuario
    // Genera un token con el id y email del usuario
    const token = generateToken(user._id, user.email);
    res.status(201).json({
      success: true,
      message: "El usuario ha sido creado",
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// Función para loguear
exports.login = async (req, res) => {
  try {
    // Extrae los datos del usuario (email y password)
    const { email, password } = req.body;
    // Valida el formato del correo electrónico para prevenir vulnerabilidades de seguridad:
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      throw new Error("Formato de correo electrónico inválido");
    }
    // Busca el usuario por correo electrónico con búsqueda insensible a mayúsculas/minúsculas:
    const user = await User.findOne({
      email: { $regex: email, $options: "i" },
    });
    // Valida si el usuario no existe devuelve un error
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    // Compara la contraseña ingresada con la contraseña de la base de datos
    const isValidPassword = await bcrypt.compare(password, user.password);
    // Si la contraseña no es igual devuelve un error
    if (!isValidPassword) {
      throw new Error("Contraseña incorrecta");
    }
    // Genera token JWT con seguridad mejorada:
    const token = generateToken(user._id, user.email);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    // Registra el mensaje de error para depuración y monitoreo potencial de seguridad
    console.error(error.message);
    res.status(400).json({
      success: false,
      // Usa un mensaje de error más genérico por seguridad.
      message: "Error al iniciar sesión",
    });
  }
};
