import { MainController } from '../shared/main-controller.js';
import { DefaultModel } from './model.js';

export class DefaultController extends MainController {
  static provideDocumentation(req, res) {
    const defaultScreen = DefaultModel.provideDocumentation();

    res.send(defaultScreen);
  }
}
