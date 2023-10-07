import { apiUrl } from '../constants/api-url';
import { PersonalInfo } from '../types/personal-info.type';

export const getPersonalInfo = async (): Promise<PersonalInfo> => {
    const response = await fetch(`${apiUrl}/personal-info`);
    const { data } = await response.json();

    return {
        name: data.name,
        direction: data.direction,
        phone: data.phone,
        email: data.email
    };
};
