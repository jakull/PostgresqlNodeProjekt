const pool = require('../config/database');

const getAllTasks = async () => {
  const result = await pool.query('SELECT * FROM angestellte');
  return result.rows;
};

const getTaskById = async (id) => {
  const result = await pool.query('SELECT * FROM angestellte WHERE id = $1', [id]);
  return result.rows[0];
};

const createTask = async (task) => {
  const result = await pool.query('INSERT INTO angestellte (title, description) VALUES ($1, $2) RETURNING *', [task.title, task.description]);
  return result.rows[0];
};

const updateTask = async (id, task) => {
  const result = await pool.query('UPDATE angestellte SET title = $1, description = $2 WHERE id = $3 RETURNING *', [task.title, task.description, id]);
  return result.rows[0];
};

const deleteTask = async (id) => {
  const result = await pool.query('DELETE FROM angestellte WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
