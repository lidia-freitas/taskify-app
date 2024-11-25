import { FormEvent, useRef, useState } from 'react';
import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid';

type TProps = {
  mode: 'create' | 'update';
  defaultValue: string;
  onSubmit: (name: string) => Promise<{ hasError: boolean | undefined, message: string }>;
}

const TaskForm = ({ onSubmit, defaultValue, mode }: TProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [operationInvalid, setOperationInvalid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleValidationState = () => {
    setOperationInvalid(!inputRef.current?.validity.valid);
    setErrorMessage(inputRef?.current?.validationMessage ?? '');
    inputRef.current?.focus();
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleValidationState();

    if (!inputRef.current?.validity.valid) return;

    const formData = new FormData(e.currentTarget);
    const { taskName  } = Object.fromEntries(formData.entries());

    setIsLoading(true);
    onSubmit(taskName as string)
      .then(({ hasError, message }) => {
        if (hasError) {
          setOperationInvalid(true);
          setErrorMessage(message);
        } else {
          setOperationInvalid(false);
          setErrorMessage('');
          formRef.current?.reset();
        }
      }).finally(() => setIsLoading(false));
  };

  return (
    <form className="task-form" onSubmit={handleFormSubmit} ref={formRef} autoComplete="off" noValidate>
      <div className="wrapper">
        <input
          type="text"
          id="task-name-input"
          name="taskName"
          className={operationInvalid ? 'input input-invalid' : 'input'}
          defaultValue={defaultValue}
          required
          autoFocus
          onInput={handleValidationState}
          onBlur={() => setOperationInvalid(false)}
          maxLength={60}
          placeholder={mode === 'create' ? 'Enter Task' : 'Rename Task'}
          ref={inputRef}
        />
        <label htmlFor="task-name-input" className="label">
          {mode === 'create' ? 'Enter Task' : 'Rename Task'}
        </label>
      </div>
      <button
        className={`btn ${isLoading ? 'loading' : ''}`}
        aria-label={mode === 'create' ? 'Add task' : 'Confirm task rename'}
        type="submit"
      >
        {mode === 'create' ? (<PlusIcon/>) : (<CheckIcon strokeWidth={2} height={24} width={24}/>)}
      </button>
      {operationInvalid && <p className="error-msg">{errorMessage}</p>}
    </form>
  );
};

export default TaskForm;