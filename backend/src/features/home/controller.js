import { MainController } from '../shared/main-controller.js';
import { HomeModel } from './model.js';

export class HomeController extends MainController {
  static async provideData(req, res) {
    try {
      const homeData = await HomeModel.provideData();

      super.generateResponse({ res, status: 201, data: homeData });
    } catch (e) {
      super.generateErrorResponse({
        res,
        status: e.status ?? 500,
        data: e.message,
      });
    }
  }

  static async updateData(req, res) {
    try {
      const input = req.body;
      const updatedHomeData = await HomeModel.updateData(input);

      super.generateResponse({ res, status: 201, data: updatedHomeData });
    } catch (e) {
      super.generateErrorResponse({
        res,
        status: e.status ?? 500,
        data: e.message,
      });
    }
  }
}
