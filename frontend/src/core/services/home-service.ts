import { Home, PersonalInfo } from '../types/data.types';
import { DefaultHttpBase } from './http-base';

interface HomeService {
  getHeroText(): Promise<Home | { status: number }>;
}

export class DefaultHomeService extends DefaultHttpBase implements HomeService {
  private isResponseDataValid(data: any) {
    return data.every((item: any) => item);
  }

  async getHeroText(): Promise<Home | { status: number }> {
    const [heroInfo, personalInfo] = await Promise.all([
      await this.get<Home>('home'),
      await this.get<PersonalInfo>('personal-info'),
    ]);

    if (
      this.isResponseDataValid(heroInfo.data) &&
      this.isResponseDataValid(personalInfo.data)
    ) {
      return {
        ...heroInfo.data,
        data: personalInfo.data ? personalInfo.data : {},
      } as Home;
    } else {
      return {
        status: 400,
      };
    }
  }
}
