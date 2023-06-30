import { Request, Response } from 'express';
import * as usersServices from './users.services';

export const readUserById = async (req: Request, res: Response) => {
  try {
    const user = await usersServices.readUserById(req.userId);
    return res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const readUsers = async (req: Request, res: Response) => {
  try {
    const users = await usersServices.readUsers();
    return res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await usersServices.updateUser(req.userId, req.body);
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
};

export const updateUserByAdmin = async (req: Request, res: Response) => {
  try {
    const user = await usersServices.updateUser(req.params.userId, req.body);
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
};