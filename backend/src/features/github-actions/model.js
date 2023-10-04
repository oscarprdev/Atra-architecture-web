import dotenv from 'dotenv';

dotenv.config();
const GITHUB_AUTH = process.env.GIHUTB_API_TOKEN;
export class GithubActionsModel {
  static async redeploy() {
    const config = {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: 'Bearer ' + GITHUB_AUTH
      }
    };

    console.log(config);
  }
}
