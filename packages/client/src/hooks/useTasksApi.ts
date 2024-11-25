import { useCallback, useState } from 'react';

import fetchApi from '../helpers/fetchApi';
import { Task } from '../taskType';

export type responseData = { hasError: boolean | undefined, message: string }

const unexpectedErrorResponse = {
  hasError: true,
  message: 'An unexpected error has occurred. Please try again later.'
} as responseData;

const useTasksApi = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const sortTasks = (tasks: Task[]) => {
    return tasks.sort((a, b) => b.id - a.id);
  };

  const fetchTasks = useCallback(async (): Promise<responseData> => {
    return fetchApi<Task[], null>({ method: 'GET', config: { path: 'tasks' } })
      .then(({ data, message, hasError }) => {
        if (!hasError) setTasks(sortTasks(data));
        return { message, hasError };
      })
      .catch((error) => {
        console.error(error);
        return unexpectedErrorResponse;
      });
  }, []);

  const createTask = async (name: string): Promise<responseData> => {
    return fetchApi<Task, { name: string }>({ method: 'POST', config: { path: 'tasks', payload: { name } } })
      .then(({ data, message, hasError }) => {
        if (!hasError) setTasks(prevState => sortTasks([...prevState, data]));
        return { message, hasError };
      })
      .catch((error) => {
        console.error(error);
        return unexpectedErrorResponse;
      });
  };

  const renameTask = async (id: number, name: string): Promise<responseData> => {
    return fetchApi<Task, { name: string }>({ method: 'PUT', config: { path: `tasks/${id}`, payload: { name } } })
      .then(({ data, message, hasError }) => {
        if (!hasError) setTasks(prevState => sortTasks(prevState.map(task => task.id === id ? data : task)));
        return { message, hasError };
      })
      .catch((error) => {
        console.error(error);
        return unexpectedErrorResponse;
      });
  };

  const toggleTask = async (id: number, checked: boolean): Promise<responseData> => {
    return fetchApi<Task, { checked: boolean }>({
      method: 'PUT',
      config: { path: `tasks/${id}`, payload: { checked } }
    })
      .then(({ data, message, hasError }) => {
        if (!hasError) setTasks(prevState => sortTasks(prevState.map(task => task.id === id ? data : task)));
        return { message, hasError };
      })
      .catch((error) => {
        console.error(error);
        return unexpectedErrorResponse;
      });
  };

  const deleteTask = async (id: number): Promise<responseData> => {
    return fetchApi<Task, null>({ method: 'DELETE', config: { path: `tasks/${id}` } })
      .then(({ message, hasError }) => {
        if (!hasError) setTasks(prevState => sortTasks(prevState.filter(task => task.id !== id)));
        return { message, hasError };
      })
      .catch((error) => {
        console.error(error);
        return unexpectedErrorResponse;
      });
  };

  return { tasks, fetchTasks, createTask, toggleTask, renameTask, deleteTask };
};

export default useTasksApi;