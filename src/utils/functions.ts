import usersFromServer from '../api/users';
import { User } from '../utils/types';

export const getUserById = (userId: number): User | null =>
  usersFromServer.find(user => user.id === userId) || null;
