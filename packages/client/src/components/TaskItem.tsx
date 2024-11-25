import { CheckIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Task } from '../taskType';
import { useState } from 'react';

type TProps = {
  task: Task;
  onRenameClick: () => void;
  onStatusToggle: () => Promise<{ hasError: boolean | undefined, message: string }>;
  onDeleteClick: () => Promise<{ hasError: boolean | undefined, message: string }>;
}

const TaskItem = ({ task, onStatusToggle, onDeleteClick, onRenameClick }: TProps) => {
  const [operationInvalid, setOperationInvalid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isToggling, setIsToggling] = useState<boolean>(false);

  const handleStatusToggle = async () => {
    setIsToggling(true);
    onStatusToggle()
      .then(({ hasError, message }) => {
        if (hasError) {
          setOperationInvalid(true);
          setErrorMessage(message);
        } else {
          setOperationInvalid(false);
          setErrorMessage('');
        }
      }).finally(() => setIsToggling(false));
  };

  const handleDeleteClick = async () => {
    setIsDeleting(true);
    onDeleteClick()
      .then(({ hasError, message }) => {
        if (hasError) {
          setOperationInvalid(true);
          setErrorMessage(message);
        } else {
          setOperationInvalid(false);
          setErrorMessage('');
        }
      }).finally(() => setIsDeleting(false));
  };

  return (
    <li className="task">
      <div className="task-group">
        <input
          type="checkbox"
          className={`checkbox ${isToggling ? 'loading' : ''}`}
          defaultChecked={task.checked}
          onChange={handleStatusToggle}
          name={task.name}
          id={`task-${task.id}`}
        />
        <label htmlFor={`task-${task.id}`} className="task-label">
          {task.name}
          <p className="checkmark">
            <CheckIcon strokeWidth={2} width={24} height={24}/>
          </p>
        </label>
      </div>
      <div className="task-group">
        <button
          className="btn"
          aria-label={`Update ${task.name} Task`}
          onClick={onRenameClick}
        >
          <PencilSquareIcon width={24} height={24}/>
        </button>

        <button
          className={`btn ${isDeleting ? 'loading' : ''} delete`}
          aria-label={`Delete ${task.name} Task`}
          onClick={handleDeleteClick}
        >
          <TrashIcon width={24} height={24}/>
        </button>

      </div>
      {operationInvalid && <p className="error-msg">{errorMessage}</p>}
    </li>
  );
};
export default TaskItem;