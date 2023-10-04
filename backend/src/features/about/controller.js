import { MainController } from '../shared/main-controller.js';
import { AboutModel } from './model.js';

export class AboutController extends MainController {
  static async getAllData(req, res) {
    try {
      const aboutData = await AboutModel.provideData();

      super.generateResponse({ res, status: 201, data: aboutData });
    } catch (e) {
      super.generateErrorResponse({
        res,
        status: e.status ?? 500,
        error: e.message
      });
    }
  }

  static async updateData(req, res) {
    try {
      const newImage = req.file_url;

      const input = {
        title: req.body.title,
        text: JSON.parse(req.body.text),
        image: newImage || req.body.image
      };

      const updatedAboutData = await AboutModel.updateData(input);

      super.generateResponse({ res, status: 201, data: updatedAboutData });
    } catch (e) {
      super.generateErrorResponse({
        res,
        status: e.status ?? 500,
        error: e.message
      });
    }
  }
}
