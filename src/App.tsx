import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import { getUserById } from './utils/functions';
import { Todo } from './utils/types';

export const initialToDos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialToDos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: Math.max(...todos.map(td => td.id)) + 1,
    };

    setTodos(current => [...current, newTodo]);
  };

  // eslint-disable-next-line no-console
  console.log(todos);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodo onAdd={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
