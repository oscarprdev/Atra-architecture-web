import { Router } from 'express';
import { AboutController } from './controller.js';
import { upload, useCloudinary } from '../../core/middlewares/cloudinary.js';

export const aboutRouter = Router();

aboutRouter.get('/', AboutController.getAllData);
aboutRouter.patch(
  '/',
  [upload.single('newImage'), useCloudinary],
  AboutController.updateData
);
