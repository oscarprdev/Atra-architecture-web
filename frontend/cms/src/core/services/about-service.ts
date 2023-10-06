import { AboutInfo } from '../types/data.types';
import { DefaultHttpBase } from './http-base';

interface AboutService {
  getAboutScreenInfo(): Promise<AboutInfo | null>;
}

export class DefaultAboutService
  extends DefaultHttpBase
  implements AboutService
{
  async getAboutScreenInfo(): Promise<AboutInfo | null> {
    const aboutInfo = await this.get<AboutInfo>('about');

    if (aboutInfo.data) {
      return aboutInfo.data satisfies AboutInfo;
    } else {
      return null;
    }
  }
}
