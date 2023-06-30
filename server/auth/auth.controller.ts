import { Request, Response } from 'express';
import * as authServices from './auth.services';
import * as usersServices from '../users/users.services';
import signToken from '../common/signToken';
import { User } from '../users/user.model';

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const newUser: User = await authServices.signUp(req.body);

    const token = signToken({ _id: newUser._id });

    res.cookie('t', token, { maxAge: ONE_YEAR, httpOnly: true });

    return res.send(newUser);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

export const signIn = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const userId = await authServices.signIn(email, password);
    const user = await usersServices.readUserById(userId);

    const token = signToken({ _id: userId });

    res.cookie('t', token, { maxAge: ONE_YEAR, httpOnly: true });

    return res.send(user);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

export const signOut = (req: Request, res: Response): Response => {
  res.clearCookie('t');
  return res.json({ message: 'Sign out success' });
};