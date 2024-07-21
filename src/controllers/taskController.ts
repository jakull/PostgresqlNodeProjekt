import { Request, Response } from 'express';
import {getAllTasks, getTaskById, createTask, updateTask, deleteTask,} from '../models/taskModel';

const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error});
  }
};
/*
const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await taskModel.getTaskById(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTask = await taskModel.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTask = await taskModel.updateTask(req.params.id, req.body);
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTask = await taskModel.deleteTask(req.params.id);
    if (deletedTask) {
      res.status(200).json(deletedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};*/

export { getTasks};
