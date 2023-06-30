import { check, ValidationChain } from 'express-validator';
import { RequestHandler } from 'express';
import { validate } from '../middleware/validate';

export const signUpValidator: ValidationChain[] = [
  check('firstName', 'Please insert a first name').notEmpty(),
  check('lastName', 'Please insert a last name').notEmpty(),
  check('email', 'Please insert a valid email').isEmail(),
  check(
    'units',
    'Please insert a valid unit (metric, imperial [legacy: kg or lb])'
  ).isIn(['metric', 'imperial', 'kg', 'lb']),
  check('gender', 'Please insert a valid gender (m, f or o)').isIn([
    'm',
    'f',
    'o',
  ]),
  check('birthdate', 'Please insert a valid birthdate').isDate(),
  check('password', 'Please insert a password').notEmpty(),
  check('password', 'Password must be at least 6 characters long').isLength({
    min: 6,
  }),
  check('passwordConfirm', 'Please insert a confirmation password').notEmpty(),
];

export const signInValidator: ValidationChain[] = [
  check('email', 'Please insert a valid email').isEmail(),
  check('password', 'Password is required').notEmpty(),
];

export const addValidateMiddleware = (validator: ValidationChain[]): RequestHandler[] => {
  return [...validator, validate];
};

export const signUpMiddleware = addValidateMiddleware(signUpValidator);

export const signInMiddleware = addValidateMiddleware(signInValidator);