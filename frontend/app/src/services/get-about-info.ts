import { apiUrl } from '../constants/api-url';
import { AboutInfo } from '../types/about.type';

export const getAboutInfo = async (): Promise<AboutInfo> => {
    const response = await fetch(`${apiUrl}/about`);

    const { data } = await response.json();

    return {
        text: data.text,
        image: data.image
    };
};
