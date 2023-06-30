import { Router } from 'express';
import isAuth from '../middleware/is-auth';
import measurementsController from './measurements.controller';
import {
  createMeasurementValidator,
  readMeasurementsByDateValidator,
} from './measurements.validators';

const router = Router();

router.post(
  '/',
  [isAuth, ...createMeasurementValidator],
  measurementsController.createMeasurement
);

router.get('/', isAuth, measurementsController.readMeasurementsByUserId);

router.get(
  '/by-date',
  [isAuth, ...readMeasurementsByDateValidator],
  measurementsController.readMeasurementsByDate
);

router.put('/:measurementId', isAuth, measurementsController.updateMeasurement);

router.delete('/:measurementId', isAuth, measurementsController.deleteMeasurement);

export default router;