const Task = require("../models/task");

// Función para crear tarea
exports.createTask = async (req, res) => {
  try {
    // Creamos la variable task
    let task;

    // Creamos nuestra tarea

    // ↓ Le asignamos a la variable que nos cree un nuevo objeto con
    // los valores definidos en nuestro modelo task
    task = new Task(req.body);

    // Almacenamos la tarea
    await task.save();
    // Devolvemos una respuesta con la tarea guardada
    res.send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Función para obtener todas las tareas
exports.getAllTasks = async (req, res) => {
  try {
    // Creamos una constante y le asignamos como valor el modelo
    // task que estamos importando con el metodo find (buscar)
    const tasks = await Task.find();
    // La respuesta será un json hacia el cliente con las tareas encontradas
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Función para actualizar tareas
exports.updateTask = async (req, res) => {
  try {
    // Creamos una constante para hacer desestructuración de objetos
    // esto es para extraer los valores que nos envia el usuario
    const { title, description, status } = req.body;
    // Para acceder al id de la tarea
    let taskToUpdate = await Task.findById(req.params.id);
    // Si la tarea no existe
    if (!taskToUpdate) {
      res.status(400).json({ msg: "No existe la tarea" });
    }
    // Cuando se encuentre la tarea se podrá actualizar los datos
    taskToUpdate.title = title;
    taskToUpdate.description = description;
    taskToUpdate.status = status;
    // Se actualiza la nueva tarea
    taskToUpdate = await Task.findOneAndUpdate(
      { _id: req.params.id },
      taskToUpdate,
      {
        new: true,
      }
    );
    res.json(taskToUpdate);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Hubo un error");
  }
};

// Función para obtener una tarea por id
exports.getTask = async (req, res) => {
  try {
    // Buscamos una tarea por id
    let task = await Task.findById(req.params.id);
    // Si la tarea no existe muestra un mensaje
    if (!task) {
      res.status(400).json({ msg: "No existe la tarea" });
    }
    // Si existe la tarea responde con json de la tarea
    res.json(task);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Hubo un error");
  }
};

// Función para eliminar una tarea por id
exports.deleteTask = async (req, res) => {
  try {
    // Buscamos la tarea por id
    let taskToDelete = await Task.findById(req.params.id);
    // Si la tarea no existe muestra un mensaje
    if (!taskToDelete) {
      res.status(400).json({ msg: "No existe la tarea" });
    }
    // Si el producto existe lo elimina y muestra un mensaje
    await Task.findOneAndDelete({ _id: taskToDelete._id });
    res.json({ msg: "Tarea eliminada con exito" });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Hubo un error");
  }
};
