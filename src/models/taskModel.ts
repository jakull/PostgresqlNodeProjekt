//import { Pool } from 'pg';
import pool from '../config/database';

interface Task {
  id?: number;
  title: string;
  description: string;
}

const getAllTasks = async (): Promise<Task[]> => {
  const result = await pool.query('SELECT * FROM angestellte');
  return result.rows;
};

const getTaskById = async (id: number): Promise<Task | null> => {
  const result = await pool.query('SELECT * FROM angestellte WHERE id = $1', [id]);
  return result.rows[0] || null;
};

const createTask = async (task: Task): Promise<Task> => {
  const result = await pool.query(
    'INSERT INTO angestellte (title, description) VALUES ($1, $2) RETURNING *',
    [task.title, task.description]
  );
  return result.rows[0];
};

const updateTask = async (id: number, task: Task): Promise<Task | null> => {
  const result = await pool.query(
    'UPDATE angestellte SET title = $1, description = $2 WHERE id = $3 RETURNING *',
    [task.title, task.description, id]
  );
  return result.rows[0] || null;
};

const deleteTask = async (id: number): Promise<Task | null> => {
  const result = await pool.query('DELETE FROM angestellte WHERE id = $1 RETURNING *', [id]);
  return result.rows[0] || null;
};

export {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
