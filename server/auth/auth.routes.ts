import { Router } from 'express';
import isAuth from '../middleware/is-auth';
import { signUp, signIn, signOut } from './auth.controller';
import { signInValidator, signUpValidator } from './auth.validators';

const router = Router();

router.post('/sign-up', signUpValidator, signUp);
router.post('/sign-in', signInValidator, signIn);
router.post('/sign-out', isAuth, signOut);

export default router;