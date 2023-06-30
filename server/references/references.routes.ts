import { Router } from 'express';
import isAuth from '../middleware/is-auth';
import {
  createReferenceValidator,
  updateReferenceValidator,
} from './references.validators';
import referencesController from './references.controller';

const router = Router();

router.post(
  '/',
  [isAuth, ...createReferenceValidator],
  referencesController.createReference
);

router.post('/copy-to-user', isAuth, referencesController.copyReferencesToUser);

router.get('/', isAuth, referencesController.readReferencesByUserId);

router.put(
  '/:referenceId',
  [isAuth, ...updateReferenceValidator],
  referencesController.updateReference
);

router.delete('/:referenceId', isAuth, referencesController.deleteReference);

export default router;