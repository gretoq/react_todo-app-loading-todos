/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorType } from './types/ErrorType';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList/TodoList';

const USER_ID = 6749;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorType>(ErrorType.LOAD);

  const handlerErrorMessage = (error: ErrorType) => {
    setTimeout(() => {
      setErrorMessage(error);
    }, 3000);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos(USER_ID);

        setTodos(fetchedTodos);
      } catch {
        handlerErrorMessage(ErrorType.LOAD);
      }
    };

    fetchTodos();
  }, []);

  const onlyCompletedTodos = useMemo(
    () => todos.filter(todo => todo.completed),
    [todos],
  );

  const onlyUncompletedTodos = useMemo(
    () => todos.filter(({ completed }) => !completed),
    [todos],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  // useEffect(() => {
  //   const onlyCompletedTodos = todos.filter(todo => todo.completed);
  // }, [todos]);


  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={todos} />

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer">
          <span className="todo-count">
            3 items left
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a href="#/" className="filter__link selected">
              All
            </a>

            <a href="#/active" className="filter__link">
              Active
            </a>

            <a href="#/completed" className="filter__link">
              Completed
            </a>
          </nav>

          {/* don't show this button if there are no completed todos */}
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className="notification is-danger is-light has-text-weight-normal">
        <button type="button" className="delete" />

        {/* show only one message at a time */}
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
