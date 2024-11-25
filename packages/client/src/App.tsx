import { useEffect, useState } from 'react';

import TaskForm from './components/TaskForm.tsx';
import TaskItem from './components/TaskItem.tsx';
import useTasksApi from './hooks/useTasksApi';
import { Task } from './taskType';

import './App.css';

function App() {
  const [editedTask, setEditedTask] = useState<Task>();

  const [operationInvalid, setOperationInvalid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { tasks, fetchTasks, createTask, deleteTask, toggleTask, renameTask, } = useTasksApi();

  useEffect(() => {
    const closeModalIfEscaped = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setEditedTask(undefined);
    };

    const closeModalIfSubmitted = () => {
      setEditedTask(undefined);
    };

    const closeModalOnClickOut = (e: MouseEvent) => {
      if (e.target === document.querySelector('.dialog')) {
        setEditedTask(undefined);
      }
    };

    window?.addEventListener('keydown', closeModalIfEscaped);
    window?.addEventListener('reset', closeModalIfSubmitted);
    window?.addEventListener('click', closeModalOnClickOut);

    return () => {
      window?.removeEventListener('keydown', closeModalIfEscaped);
      window?.removeEventListener('reset', closeModalIfSubmitted);
      window?.removeEventListener('click', closeModalOnClickOut);
    };
  }, []);

  useEffect(() => {
    fetchTasks()
      .then(({ hasError, message }) => {
        if (hasError) {
          setOperationInvalid(true);
          setErrorMessage(message);
        } else {
          setOperationInvalid(false);
          setErrorMessage('');
        }
      }).finally(() => setIsLoading(false));
  }, [fetchTasks]);

  return (
    <div className="container">

      <a className="credits"
         href="https://github.com/coding-in-public/react-todo-app-with-local-storage" target="_blank">
        Original Project
      </a>

      <header>
        <img src="/vite.svg" alt="vite taskify"/>
        <h1>Taskify</h1>
      </header>

      {!operationInvalid && (
        <TaskForm
          mode="create"
          defaultValue=""
          onSubmit={(name) => createTask(name)}
        />
      )}

      {editedTask && (
        <dialog className="dialog">
          <TaskForm
            mode="update"
            defaultValue={editedTask.name}
            onSubmit={(name) => renameTask(editedTask?.id, name)}
          />
        </dialog>
      )}

      {isLoading && (<h2 className="loading-pulse">...</h2>)}

      {operationInvalid && (<h2 className="error">{errorMessage}</h2>)}

      <ul className="tasks">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onRenameClick={() => setEditedTask(task)}
            onDeleteClick={() => deleteTask(task.id)}
            onStatusToggle={() => toggleTask(task.id, !task.checked)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
