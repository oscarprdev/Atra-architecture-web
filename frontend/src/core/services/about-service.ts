import { AboutInfo } from '../types/data.types';
import { DefaultHttpBase } from './http-base';

interface AboutService {
  getAboutScreenInfo(): Promise<AboutInfo>;
}

export class DefaultAboutService
  extends DefaultHttpBase
  implements AboutService
{
  async getAboutScreenInfo(): Promise<AboutInfo> {
    const aboutInfo = await this.get<AboutInfo>('about');

    return aboutInfo.data satisfies AboutInfo;
  }
}
