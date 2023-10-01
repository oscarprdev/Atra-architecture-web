import { Router } from 'express';
import { PersonalInfoController } from './controller.js';

export const personalInfoRouter = Router();

personalInfoRouter.get('/', PersonalInfoController.provideData);
personalInfoRouter.patch('/', PersonalInfoController.updateData);
