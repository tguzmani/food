import UserModel from './users.mongo.model';
import dayjs from 'dayjs';

export const readUserById = async (userId) => {
  return await UserModel.findById(userId).select('-password');
};

export const readUsers = async () => {
  return await UserModel.find();
};

export const readUserByEmail = async (email) => {
  return await UserModel.findOne({ email });
};

export const createUser = async (user) => {
  return await UserModel.create({
    ...user,
    name: `${user.firstName} ${user.lastName}`,
    sex: user.gender,
  });
};

export const updateUser = async (userId, userData) => {
  let user = await UserModel.findByIdAndUpdate(userId, userData, {
    new: true,
  });

  if (user)
    user = await UserModel.findByIdAndUpdate(
      userId,
      { goals: user.macroGoals },
      { new: true }
    );

  return user;
};