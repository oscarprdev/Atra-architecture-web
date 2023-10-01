import { MainController } from '../shared/main-controller.js';
import { ContactModel } from './model.js';

export class ContactController extends MainController {
  static async provideData(req, res) {
    try {
      const contactImage = await ContactModel.provideContactImage();

      super.generateResponse({ res, status: 201, data: contactImage });
    } catch (e) {
      super.generateErrorResponse({
        res,
        status: e.status ?? 500,
        error: e.message,
      });
    }
  }

  static async updateContactImage(req, res) {
    try {
      const { image } = req.file_url;
      const contactImage = await ContactModel.updateContactImage(image);

      super.generateResponse({ res, status: 201, data: contactImage });
    } catch (e) {
      super.generateErrorResponse({
        res,
        status: e.status ?? 500,
        error: e.message,
      });
    }
  }
}
