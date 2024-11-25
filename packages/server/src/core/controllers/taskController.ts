import { NextFunction, Request, Response } from 'express';

import { responseResult, Task } from '../../types';
import * as taskRepository from '../repositories/taskRepository.js';

export const getTasks = async (_req: Request, res: Response, next: NextFunction) => {
  let result: responseResult<Task[]>;

  try {
    const tasks = await taskRepository.getTasks();
    result = { statusCode: 200, message: 'Tasks retrieved successfully', data: tasks, };

    res.locals = { result };
    next();
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  let result: responseResult<Task>;

  try {
    const newTask = await taskRepository.createTask(name, false);
    result = { statusCode: 201, message: 'Task created successfully', data: newTask };

    res.locals = { result };
    next();
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, checked } = req.body;
  let result: responseResult<Task>;

  try {
    const updatedTask = await taskRepository.updateTask(id, name, checked);

    result = updatedTask
      ? { statusCode: 200, message: 'Task updated successfully', data: updatedTask }
      : { statusCode: 404, message: 'Task not found', data: updatedTask };

    res.locals = { result };
    next();
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  let result: responseResult<Task>;

  try {
    const deletedTask = await taskRepository.deleteTask(id);

    result = deletedTask
      ? { statusCode: 200, message: 'Task deleted successfully', data: deletedTask }
      : { statusCode: 404, message: 'Task not found', data: deletedTask };

    res.locals = { result };
    next();
  } catch (err) {
    next(err);
  }
};
