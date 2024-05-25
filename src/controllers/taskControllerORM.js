const { getRepository } = require('typeorm');
const Angestellte = require('../models/taskModelORM');

const getTasks = async (req, res) => {
  const taskRepository = getRepository(Angestellte);
  const tasks = await taskRepository.find();
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title, description, completed } = req.body;
  const taskRepository = getRepository(Angestellte);
  const task = taskRepository.create({ title, description, completed });
  await taskRepository.save(task);
  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const taskRepository = getRepository(Angestellte);
  const task = await taskRepository.findOne(id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  task.title = title;
  task.description = description;
  task.completed = completed;
  await taskRepository.save(task);
  res.json(task);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const taskRepository = getRepository(Angestellte);
  const task = await taskRepository.findOne(id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  await taskRepository.remove(task);
  res.json({ message: 'Task deleted successfully' });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
