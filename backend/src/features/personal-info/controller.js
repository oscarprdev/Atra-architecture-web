import { MainController } from '../shared/main-controller.js';
import { PersonalInfoModel } from './model.js';

export class PersonalInfoController extends MainController {
  static async provideData(req, res) {
    try {
      const info = await PersonalInfoModel.provideData();

      super.generateResponse({ res, status: 201, data: info });
    } catch (e) {
      super.generateResponse({ res, status: e.status ?? 500, data: e.message });
    }
  }

  static async updateData(req, res) {
    try {
      const input = req.body;
      const updatedPersonalInfo = await PersonalInfoModel.updateData(input);

      super.generateResponse({ res, status: 201, data: updatedPersonalInfo });
    } catch (e) {
      super.generateResponse({ res, status: e.status ?? 500, data: e.message });
    }
  }
}
