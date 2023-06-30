import * as usersRepository from './users.mongo.repository';
import dayjs from 'dayjs';

export const readUserById = async (userId: string) => {
  const user = await usersRepository.readUserById(userId);

  if (!user) {
    throw new Error(`User not found`);
  }

  return user;
};

export const readUsers = async () => {
  return await usersRepository.readUsers();
};

export const updateUser = async (userId: string, user: any) => {
  return await usersRepository.updateUser(userId, user);
};