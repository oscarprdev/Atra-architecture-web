import { Home, PersonalInfo } from '../types/data.types';
import { DefaultHttpBase } from './http-base';

interface HomeService {
  getHeroText(): Promise<Home>;
}

export class DefaultHomeService extends DefaultHttpBase implements HomeService {
  async getHeroText(): Promise<Home> {
    const [heroInfo, personalInfo] = await Promise.all([
      await this.get<Home>('home'),
      await this.get<PersonalInfo>('personal-info'),
    ]);

    return {
      ...heroInfo.data,
      data: { ...personalInfo.data },
    } satisfies Home;
  }
}
