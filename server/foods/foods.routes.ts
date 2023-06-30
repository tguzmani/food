import { Router } from 'express';
import isAuth from '../middleware/is-auth';
import foodsController from './foods.controller';

const router = Router();

router.post('/', isAuth, foodsController.createFood);
router.get('/', isAuth, foodsController.readFoodsByUserId);
router.put('/:foodId', isAuth, foodsController.updateFood);
router.delete('/all', isAuth, foodsController.deleteAllFoodsFromDay);
router.delete('/:foodId', isAuth, foodsController.deleteFood);

export default router;