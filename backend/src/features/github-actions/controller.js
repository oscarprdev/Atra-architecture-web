import { GithubActionsModel } from './model';

export class GithubActionsController {
  static async redeploy() {
    const response = await GithubActionsModel.redeploy();

    console.log(response);
  }
}
