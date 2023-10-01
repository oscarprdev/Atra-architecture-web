import { Router } from 'express';
import { ProjectsController } from './controller.js';
import { upload, useCloudinary } from '../../core/middlewares/cloudinary.js';
export const projectsRouter = Router();

projectsRouter.get('/', ProjectsController.provideData);
projectsRouter.post(
  '/',
  [upload.array('newImages'), useCloudinary],
  ProjectsController.createNewProject
);

projectsRouter.get('/:id', ProjectsController.provideProjectById);
projectsRouter.patch(
  '/:id',
  [upload.array('newImages'), useCloudinary],
  ProjectsController.updateProject
);
projectsRouter.patch(
  '/main-image/:id',
  [upload.single('mainImage'), useCloudinary],
  ProjectsController.updateMainImageProject
);
projectsRouter.delete('/:id', ProjectsController.deleteProject);
