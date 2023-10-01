import { Router } from 'express';
import { HomeController } from './controller.js';

export const homeRouter = Router();

homeRouter.get('/', HomeController.provideData);
homeRouter.patch('/', HomeController.updateData);
