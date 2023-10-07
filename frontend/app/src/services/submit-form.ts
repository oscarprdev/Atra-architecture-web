import { AdminForm } from '../types/admin-form.type';

export const submitForm = async (form: AdminForm): Promise<boolean> => {
    const validInput: Record<string, string> = {
        email: 'prueba@gmail.com',
        password: '1234'
    };

    return form.email === validInput.email && form.password === validInput.password;
};
