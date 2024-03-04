// Rutas para tarea
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// /home
router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.put("/:id", taskController.updateTask);
router.get("/:id", taskController.getTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
