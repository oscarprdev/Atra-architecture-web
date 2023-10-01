import { Home, PersonalInfo } from '../types/data.types';
import { DefaultHttpBase } from './http-base';

interface HomeService {
  getHeroText(): Promise<Home | { status: number }>;
}

export class DefaultHomeService extends DefaultHttpBase implements HomeService {
  // private isResponseDataValid(data: any) {
  //   return data.every((item: any) => item);
  // }

  async getHeroText(): Promise<Home | { status: number }> {
    const personalInfo = await this.get<PersonalInfo>('personal-info');

    console.log(personalInfo);

    if (personalInfo.status !== 400) {
      console.log('je;;p');
      return {
        data: personalInfo.data ? personalInfo.data : {},
      } as Home;
    } else {
      return {
        status: 400,
      };
    }
  }
}
