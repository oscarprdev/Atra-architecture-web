import { Router } from 'express';
import { GithubActionsController } from './controller';

export const githubActionsRouter = Router();

githubActionsRouter.post('/redeploy', GithubActionsController.redeploy);
