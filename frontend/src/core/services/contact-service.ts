import { PersonalInfo } from '../types/data.types';
import { DefaultHttpBase } from './http-base';

export interface ContactService {
  getPersonalInfo(): Promise<PersonalInfo>;
  getContactImage(): Promise<string>;
}

export class DefaultContactService
  extends DefaultHttpBase
  implements ContactService
{
  async getPersonalInfo(): Promise<PersonalInfo> {
    const personalInfoResponse = await this.get<PersonalInfo>('personal-info');

    return personalInfoResponse.data;
  }

  async getContactImage(): Promise<string> {
    const imageResponse = await this.get<string>('contact');

    return imageResponse.data;
  }
}
