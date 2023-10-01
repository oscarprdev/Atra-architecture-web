import express, { json } from 'express';
import { corsMiddleware } from './core/middlewares/cors.js';
import { aboutRouter } from './features/about/routes.js';
import { personalInfoRouter } from './features/personal-info/routes.js';
import { projectsRouter } from './features/projects/routes.js';
import { defaultRouter } from './features/default/routes.js';

export const initializeServer = (PORT = 1234) => {
  const app = express();

  app.use(json());
  app.use(corsMiddleware());
  app.disable('x-powered-by');

  app.use('/', defaultRouter);
  app.use('/about', aboutRouter);
  app.use('/projects', projectsRouter);
  app.use('/personal-info', personalInfoRouter);

  app.listen(PORT || 5000, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
};
