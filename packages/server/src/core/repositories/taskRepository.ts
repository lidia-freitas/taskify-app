import { Task } from '../../types';
import { client } from '../../config/databaseHandler.js';

export const getTasks = async (): Promise<Task[]> => {
  const query = 'SELECT * FROM tasks';
  const result = await client.query(query);

  return result.rows;
};

export const createTask = async (name: string, checked: boolean): Promise<Task> => {
  const query = 'INSERT INTO tasks (name, checked) VALUES ($1, $2) RETURNING *';
  const result = await client.query(query, [name, checked]);

  return result.rows[0];
};

export const updateTask = async (id: string, name?: string, checked?: boolean): Promise<Task> => {
  const query = 'UPDATE tasks SET name = COALESCE($2, name), checked = COALESCE($3, checked) WHERE id = $1 RETURNING *';
  const result = await client.query(query, [id, name, checked]);

  return result.rows[0];
};

export const deleteTask = async (id: string): Promise<Task> => {
  const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
  const result = await client.query(query, [id]);

  return result.rows[0];
};
