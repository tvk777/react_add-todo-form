import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
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

  const addTodo = (title: string, userId: number) => {
    const newTodo = {
      id: Math.max(0, ...todos.map(td => td.id)) + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos(current => [...current, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodo onAdd={addTodo} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
