import { Router } from 'express';
import { ContactController } from './controller.js';
import { upload, useCloudinary } from '../../core/middlewares/cloudinary.js';

export const contactRouter = Router();

contactRouter.get('/', ContactController.provideData);
contactRouter.patch(
  '/',
  [upload.single('image'), useCloudinary],
  ContactController.updateContactImage
);
