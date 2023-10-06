import { PersonalInfo } from '../types/data.types';
import { DefaultHttpBase } from './http-base';

export interface ContactService {
  getPersonalInfo(): Promise<PersonalInfo | null>;
  getContactImage(): Promise<string | null>;
}

export class DefaultContactService
  extends DefaultHttpBase
  implements ContactService
{
  async getPersonalInfo(): Promise<PersonalInfo | null> {
    const personalInfoResponse = await this.get<PersonalInfo>('personal-info');

    return personalInfoResponse.data || null;
  }

  async getContactImage(): Promise<string | null> {
    const imageResponse = await this.get<string>('contact');

    return imageResponse.data || null;
  }
}
