const mongoose = require("mongoose");

const taskStatus = {
  PENDING: "Pendiente",
  ACTIVE: "Activa",
  COMPLETED: "Finalizada",
};

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: [taskStatus.PENDING, taskStatus.ACTIVE, taskStatus.COMPLETED],
    default: taskStatus.PENDING,
  },
  creationDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Task", TaskSchema);
