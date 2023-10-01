import { Router } from 'express';
import { DefaultController } from './controller.js';

export const defaultRouter = Router();

defaultRouter.get('/', DefaultController.provideDocumentation);
