import { FC, FormEvent, useState } from 'react';
import { Todo } from '../../utils/types';
import { getUserById } from '../../utils/functions';
import usersFromServer from '../../api/users';

type Props = {
  onAdd: (newTodo: Todo) => void;
};
export const NewTodo: FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState('');

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    field: string,
  ) => {
    const value = event.target.value;

    switch (field) {
      case 'userId':
        setUserId(+value);
        if (+value !== 0) {
          setUserError('');
        }

        break;
      case 'title':
        const sanitizedTitle = value.replace(
          /[^a-zA-Zа-яА-ЯґҐїЇєЄіІ0-9 ]/g,
          '',
        );

        setTitle(sanitizedTitle);
        if (sanitizedTitle.trim()) {
          setTitleError('');
        }

        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError('Please enter a title');
    }

    if (userId === 0) {
      setUserError('Please choose a user');
    }

    if (!title || !userId) {
      return;
    }

    onAdd({
      id: 0,
      title: title.trim(),
      completed: false,
      user: getUserById(userId),
    });
    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={event => handleChange(event, 'title')}
          placeholder="Enter a title"
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={event => handleChange(event, 'userId')}
        >
          <option value={0}>Choose a user</option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
